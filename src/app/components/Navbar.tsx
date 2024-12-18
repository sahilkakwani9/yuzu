import Image from "next/image";
import React from "react";

function Navbar() {
  return (
    <div className="flex flex-row justify-between p-5">
      <Image
        src={"/logo.webp"}
        alt="yuzu-logo"
        className="h-[78px] w-[75px]"
        height={78}
        width={75}
      />
      <div className="flex flex-row gap-5">
        <div className="bg-[#F9E92B] h-[30px] w-[30px] flex flex-row justify-center items-center rounded-md">
          <Image
            src={"/assets/tiktok.svg"}
            alt="yuzu-logo"
            className="h-[24px] w-[24px] bg-transparent"
            height={30}
            width={30}
          />
        </div>
        <a>
          <Image
            src={"/assets/instagram.svg"}
            alt="yuzu-logo"
            className="h-[30px] w-[30px] rounded-md"
            height={30}
            width={30}
          />
        </a>
        <a>
          <Image
            src={"/assets/X.svg"}
            alt="yuzu-logo"
            className="h-[30px] w-[30px] rounded-md"
            height={30}
            width={30}
          />
        </a>
      </div>
    </div>
  );
}

export default Navbar;
