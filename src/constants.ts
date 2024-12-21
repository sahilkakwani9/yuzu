import { Game } from "./lib/types";

export const HEADLINE =
  "An open marketplace and launchpad for AI Gaming Models & Agents";
export const SUBHEADLINE =
  "Create, train and launch AI Gaming Agents for Web3 games.";
export const games: Game[] = [
  {
    id: "street-fighter",
    imageUrl: "/modals/streetfighter.webp",
    name: "STREET FIGHTER",
    ticker: "$SF6",
    category: "Fighting",
    description:
      "A legendary fighting game series where world warriors compete in hand-to-hand combat using unique martial arts.",
    shortDescription:
      "Legendary fighting game series with unique martial arts combat.",
    contractAddress: "0x1C4c...F463a3",
    downloads: {
      total: 1799,
      weekly: 248,
    },
    longDescription:
      "Street Fighter has been the cornerstone of fighting game culture for over three decades. Each character brings their own distinct martial arts style, creating a diverse and dynamic combat system that has evolved with each iteration. The game emphasizes technical skill, strategy, and split-second decision making.",
    geckoTerminalUrl: "https://www.geckterminal.com/sf6",
  },
  {
    id: "genopets",
    imageUrl: "/modals/genopots.webp",
    name: "GENOPETS",
    ticker: "$GENE",
    category: "Move-to-Earn",
    description: "The world's first Move-to-Earn NFT Game.",
    shortDescription: "Pioneer in move-to-earn gaming.",
    contractAddress: "0x2D4c...E563b4",
    downloads: {
      total: 2150,
      weekly: 312,
    },
    longDescription:
      "Genopets revolutionizes the gaming landscape by introducing the first-ever move-to-earn NFT gaming experience. Players can earn rewards by staying active in real life, nurturing their digital pets, and participating in various in-game activities.",
    geckoTerminalUrl: "https://www.geckterminal.com/genopets",
  },
  {
    id: "aurory",
    imageUrl: "/modals/aurory.webp",
    name: "AURORY",
    ticker: "$AURY",
    category: "RPG",
    description:
      "A Web3 game studio anchored in innovative, F2P, interoperable gaming experiences.",
    shortDescription: "Innovative F2P gaming experiences.",
    contractAddress: "0x3E5d...G663c5",
    downloads: {
      total: 1560,
      weekly: 195,
    },
    longDescription:
      "Aurory represents the future of gaming with its innovative approach to F2P experiences. The game combines stunning visuals with deep gameplay mechanics, creating an immersive world where players can truly own their in-game assets.",
    geckoTerminalUrl: "https://www.geckterminal.com/aurory",
  },
  {
    id: "astrospace",
    imageUrl: "/modals/astrospace.webp",
    name: "ASTROSPACE",
    ticker: "$ASTRO",
    category: "Strategy",
    description:
      "AstroSpace is the first Farm-To-Steal mobile gaming app on Solana",
    shortDescription: "Revolutionary farm-to-steal gaming.",
    contractAddress: "0x4F6e...H763d6",
    downloads: {
      total: 1890,
      weekly: 276,
    },
    longDescription:
      "AstroSpace introduces a unique farm-to-steal mechanic on the Solana blockchain. Players must balance resource management with strategic raids, creating an engaging gameplay loop that rewards both patience and cunning.",
    geckoTerminalUrl: "https://www.geckterminal.com/astrospace",
  },
  {
    id: "star-atlas",
    imageUrl: "/modals/staratlas.webp",
    name: "STARATLAS",
    ticker: "$ATLAS",
    category: "Metaverse",
    description:
      "Virtual gaming metaverse on the Solana blockchain with Unreal Engine 5 real-time graphics.",
    shortDescription: "Next-gen blockchain gaming metaverse.",
    contractAddress: "0x5G7f...I863e7",
    downloads: {
      total: 2340,
      weekly: 385,
    },
    longDescription:
      "Star Atlas pushes the boundaries of blockchain gaming with its impressive Unreal Engine 5 powered graphics. This space-themed metaverse offers players unprecedented freedom to explore, trade, and compete in a vast virtual universe.",
    geckoTerminalUrl: "https://www.geckterminal.com/staratlas",
  },
];
