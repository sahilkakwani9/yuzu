export type Game = {
  id: string;
  imageUrl: string;
  name: string;
  description: string;
  shortDescription: string;
  ticker: string;
  category: string;
  contractAddress: string;
  downloads: {
    total: number;
    weekly: number;
  };
  longDescription: string;
  geckoTerminalUrl: string;
};
