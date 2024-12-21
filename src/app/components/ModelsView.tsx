import React from "react";
import SearchInput from "./SearchInput";
import GamingCard from "./ModelCard";

import Link from "next/link";
import { games } from "@/constants";

function ModelsView() {
  return (
    <div>
      <SearchInput />
      <div className="flex flex-row flex-wrap max-w-5xl mx-auto gap-8 mt-12">
        {games.map((game) => (
          <Link key={game.id} href={`/modals/${game.id}`}>
            <GamingCard
              title={game.name}
              description={game.shortDescription}
              imageUrl={game.imageUrl}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ModelsView;
