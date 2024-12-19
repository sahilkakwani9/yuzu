import React from "react";

const GamingCard = ({
  title,
  description,
  imageUrl,
}: {
  title: string;
  description: string;
  imageUrl: string;
}) => {
  return (
    <div className="relative w-full max-w-md p-1 bg-yellow bg-opacity-30 z-10 rounded-xl">
      {/* Main card container */}
      <div className="relative flex gap-6 p-4 rounded-xl bg-yellow-500/30 backdrop-blur-sm">
        {/* Image container */}
        <div className="w-36 h-48 overflow-hidden rounded-lg">
          <img
            src={imageUrl || "/api/placeholder/192/256"}
            alt="Gaming character"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 space-y-4">
          <div className="relative">
            <div className="absolute inset-0 bg-black rounded-xl translate-y-1.5 translate-x-1.5" />

            <div className="relative bg-[#F9E92B] text-black px-6 py-2 rounded-xl border-[3px] border-black w-full">
              <h2 className="font-saira font-semibold text-xl">{title}</h2>
            </div>
          </div>

          <p className="font-saira text-yellow text-lg ml-2">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default GamingCard;
