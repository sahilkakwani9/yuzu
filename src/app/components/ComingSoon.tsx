import Image from "next/image";
import React from "react";

function ComingSoon() {
  return (
    <div className="z-10 py-48 flex flex-col justify-center items-center gap-12 ">
      <p className="text-6xl text-yellow font-saira font-bold text-center">
        Coming soon
      </p>
      <Image
        src={"/logo.webp"}
        alt="yuzu-logo"
        className="h-[151px] w-[145px]"
        height={151}
        width={145}
      />
    </div>
  );
}

export default ComingSoon;
