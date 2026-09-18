type ApiRequest = {
  method?: string;
};

type ApiResponse = {
  statusCode: number;
  setHeader(name: string, value: string): void;
  end(body: string): void;
};

function asRecord(value: unknown): Record<string, unknown> | null {
  return typeof value === "object" && value !== null
    ? (value as Record<string, unknown>)
    : null;
}

function numberFrom(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
}

function findNumber(value: unknown, keys: string[]): number | null {
  if (Array.isArray(value)) {
    for (const item of value) {
      const result = findNumber(item, keys);
      if (result !== null) return result;
    }
    return null;
  }

  const record = asRecord(value);
  if (!record) return null;

  for (const key of keys) {
    const result = numberFrom(record[key]);
    if (result !== null) return result;
  }

  for (const child of Object.values(record)) {
    const result = findNumber(child, keys);
    if (result !== null) return result;
  }

  return null;
}

function sumBalances(value: unknown): number | null {
  const record = asRecord(value);
  const balances = Array.isArray(value) ? value : record?.balances;
  if (!Array.isArray(balances) || balances.length === 0) return null;

  const amounts = balances.map((balance) => {
    const item = asRecord(balance);
    return numberFrom(
      item?.available ?? item?.balance ?? item?.amount ?? item?.total,
    );
  });

  return amounts.every((amount) => amount !== null)
    ? amounts.reduce((total, amount) => total + (amount ?? 0), 0)
    : null;
}

async function fetchLakiPay(
  baseUrl: string,
  path: string,
  apiKey: string,
): Promise<unknown> {
  const response = await fetch(`${baseUrl}${path}`, {
    method: "GET",
    headers: {
      "X-API-Key": apiKey,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  const responseText = await response.text();
  let body: unknown = responseText;
  try {
    body = JSON.parse(responseText) as unknown;
  } catch {
    // Some LakiPay errors are plain text rather than JSON.
  }
  if (!response.ok) {
    const message =
      findMessage(body) ??
      `LakiPay returned ${response.status} for ${baseUrl}${path}`;
    throw new Error(message);
  }
  return body;
}

function findMessage(value: unknown): string | null {
  const record = asRecord(value);
  if (!record) return null;
  return typeof record.message === "string"
    ? record.message
    : typeof asRecord(record.error)?.message === "string"
      ? (asRecord(record.error)?.message as string)
      : null;
}

export default async function handler(
  request: ApiRequest,
  response: ApiResponse,
) {
  response.setHeader("Cache-Control", "no-store");

  if (request.method !== "GET") {
    response.statusCode = 405;
    response.end(JSON.stringify({ error: "Method not allowed" }));
    return;
  }

  const apiKey = process.env.LAKIPAY_API_KEY;
  if (!apiKey) {
    response.statusCode = 500;
    response.end(
      JSON.stringify({ error: "LAKIPAY_API_KEY is not configured" }),
    );
    return;
  }

  try {
    const baseUrl = (
      process.env.LAKIPAY_BASE_URL ?? "https://lakipay.co"
    ).replace(/\/$/, "");
    const balancePath =
      process.env.LAKIPAY_BALANCES_PATH ?? "/api/v2/lakiconnect/balances";
    const transactionsPath =
      process.env.LAKIPAY_TRANSACTIONS_PATH ??
      "/api/v2/lakiconnect/reconciliation";
    const [balanceBody, transactionsBody] = await Promise.all([
      fetchLakiPay(baseUrl, balancePath, apiKey),
      fetchLakiPay(baseUrl, transactionsPath, apiKey),
    ]);

    const depositSettlement =
      findNumber(balanceBody, [
        "depositSettlement",
        "deposit_settlement",
        "settlement",
        "total_balance",
        "balance",
      ]) ?? sumBalances(balanceBody);
    const transactionRecord = asRecord(transactionsBody);
    const transactions =
      numberFrom(transactionRecord?.total_count) ??
      (Array.isArray(transactionRecord?.data)
        ? transactionRecord.data.length
        : null) ??
      findNumber(transactionsBody, [
        "total_transactions",
        "transactions_count",
        "count",
        "total",
      ]) ??
      (Array.isArray(transactionsBody) ? transactionsBody.length : null);

    if (depositSettlement === null || transactions === null) {
      throw new Error(
        "LakiPay response does not include the configured balance or transaction total.",
      );
    }

    response.statusCode = 200;
    response.end(JSON.stringify({ depositSettlement, transactions }));
  } catch (error) {
    response.statusCode = 502;
    response.end(
      JSON.stringify({
        error:
          error instanceof Error
            ? error.message
            : "Unable to load LakiPay account totals",
      }),
    );
  }
}
