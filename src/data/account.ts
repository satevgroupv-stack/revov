export const machineTotals = {
  depositSettlement: 63006,
  transactions: 4269003
};

export type DescSegment = { text: string; bold?: boolean };
export type DescParagraph = DescSegment[];

export const machineDescription: DescParagraph[] = [
  [{ text: '' }],
  [{ text: 'Smart Retail, Reimagined.' }],
  [
    { text: 'RevoV transforms automated retail ' },
    { text: 'into a connected, intelligent, and adaptable platform', bold: true },
    { text: ' giving people instant access to everyday essentials while giving operators the tools to manage, monitor, and scale their services remotely.' },
  ],
  [
    { text: 'With '},
    { text: '24/7 cashless operation, IoT connectivity, real-time inventory intelligence, energy-efficient systems, integrated power backup, and modular packaging recovery,' ,bold: true},
    { text: 'RevoV brings retail and recovery together in one platform.'},
  ],
  [
    { text: 'Designed to serve. Connected to perform. Built to scale.', bold: true },
  ],
  [
    { text: 'From a single deployment to multiple locations, RevoV is engineered for the places, businesses, and communities of tomorrow.' },
  ],
];

export const machineImage = 'https://i.imgur.com/UYxAo1A.jpg';
export const satevLogo = 'https://i.imgur.com/b605rId.jpg';
export const satevUrl = 'https://satev.vercel.app/';