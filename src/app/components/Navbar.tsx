import Image from "next/image";
import React from "react";

function Navbar() {
  return (
    <div className="flex flex-row justify-center md:justify-between p-5 z-100">
      <Image
        src={"/logo.webp"}
        alt="yuzu-logo"
        className="h-[78px] w-[75px] hidden md:block"
        height={78}
        width={75}
      />
      <div className="flex flex-row gap-5">
        <a
          className="bg-yellow h-[30px] w-[30px] flex flex-row justify-center items-center rounded-md"
          href="https://www.tiktok.com/@yuzudotgame?_t=ZN-8ssj4VFyA9G&_r=1"
        >
          <Image
            src={"/assets/tiktok.svg"}
            alt="yuzu-logo"
            className="h-[24px] w-[24px] bg-transparent"
            height={30}
            width={30}
          />
        </a>
        <a href="https://www.instagram.com/yuzudotgame/profilecard/?igsh=MW13ZWQyNWU4cWhuNQ==">
          <Image
            src={"/assets/instagram.svg"}
            alt="yuzu-logo"
            className="h-[30px] w-[30px] rounded-md"
            height={30}
            width={30}
          />
        </a>
        <a href="https://x.com/yuzudotai">
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
