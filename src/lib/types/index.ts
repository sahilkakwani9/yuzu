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
  codes: CodeItem[];
  discussions: Discussion[];
  competitions: Competition[];
};

export interface CodeItem {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
}

export interface Discussion {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
}

export interface Competition {
  id: string;
  title: string;
  status: string;
  prize: string;
  endDate: string;
}
