import React from "react";
import SearchInput from "./SearchInput";
import GamingCard from "./ModelCard";

function ModelsView() {
  return (
    <div>
      <SearchInput />
      <div className="flex flex-row flex-wrap max-w-5xl mx-auto gap-8 mt-12">
        {Array.from({ length: 6 }).map((item) => {
          return (
            <GamingCard
              title="AI Gaming Model 1"
              description="Short Description of the AI gaming model."
              imageUrl="/modals/modal1.webp"
            />
          );
        })}
      </div>
    </div>
  );
}

export default ModelsView;
