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
    <div className="relative w-full max-w-[280px] md:max-w-md p-1 bg-yellow bg-opacity-30 z-10 rounded-xl mx-auto">
      {/* Main card container */}
      <div className="relative flex flex-col md:flex-row gap-3 md:gap-6 p-3 md:p-4 rounded-xl">
        {/* Image container */}
        <div className="w-full md:w-36 h-40 md:h-48 overflow-hidden rounded-lg">
          <img
            src={imageUrl || "/api/placeholder/192/256"}
            alt="Gaming character"
            className="w-full h-full object-fill"
          />
        </div>

        <div className="flex-1 space-y-2 md:space-y-4">
          <div className="relative">
            <div className="absolute inset-0 bg-black rounded-xl translate-y-1.5 translate-x-1.5" />

            <div className="relative bg-[#F9E92B] text-black px-4 md:px-6 py-1.5 md:py-2 rounded-xl border-[3px] border-black w-full">
              <h2 className="font-saira font-semibold text-base md:text-xl">
                {title}
              </h2>
            </div>
          </div>

          <p className="font-saira text-yellow text-sm md:text-lg ml-1 md:ml-2">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GamingCard;
