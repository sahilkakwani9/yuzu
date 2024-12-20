import React from "react";
import SearchInput from "./SearchInput";
import GamingCard from "./ModelCard";

function ModelsView() {
  const assets = [
    {
      imageUrl: "/modals/streetfighter.webp",
      name: "STREET FIGHTER",
      description:
        "A legendary fighting game series where world warriors compete in hand-to-hand combat using unique martial arts.",
    },
    {
      imageUrl: "/modals/genopots.webp",
      name: "GENOPETS",
      description: "The world's first Move-to-Earn NFT Game.",
    },
    {
      imageUrl: "/modals/aurory.webp",
      name: "AURORY",
      description:
        "A Web3 game studio anchored in innovative, F2P, interoperable gaming experiences. Play now on our website!",
    },
    {
      imageUrl: "/modals/astrospace.webp",
      name: "ASTROSPACE",
      description:
        "AstroSpace is the first Farm-To-Steal mobile gaming app on Solana",
    },
    {
      imageUrl: "/modals/staratlas.webp",
      name: "STARATLAS",
      description:
        "Virtual gaming metaverse on the Solana blockchain with Unreal Engine 5 real-time graphics, multiplayer game",
    },
  ];
  return (
    <div>
      <SearchInput />
      <div className="flex flex-row flex-wrap max-w-5xl mx-auto gap-8 mt-12">
        {assets.map((item) => {
          return (
            <GamingCard
              title={item.name}
              description={item.description}
              imageUrl={item.imageUrl}
            />
          );
        })}
      </div>
    </div>
  );
}

export default ModelsView;
