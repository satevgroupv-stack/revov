import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import lakipaySummary from "./api/lakipay-summary";

function lakipayApiPlugin(): Plugin {
  return {
    name: "lakipay-api",
    configureServer(server) {
      server.middlewares.use(
        "/api/lakipay-summary",
        (request, response, next) => {
          if (request.method !== "GET") {
            next();
            return;
          }
          void lakipaySummary(request, response);
        },
      );
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  Object.assign(process.env, env);

  return {
    plugins: [react(), lakipayApiPlugin()],
  };
});
