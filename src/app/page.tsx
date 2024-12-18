import { HEADLINE, SUBHEADLINE } from "@/constants";
import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      <Image
        src={"/assets/hallmark.svg"}
        alt="yuzu-logo"
        className="h-32 w-72 text-center mx-auto"
        height={456}
        width={136}
      />
      <p className="text-3xl text-center mx-auto w-[38%] font-semibold mt-16 text-yellow font-saira">
        {HEADLINE}
      </p>
      <p className="text-[1.3rem] text-center mx-auto font-light mt-8 text-yellow font-saira">
        {SUBHEADLINE}
      </p>
    </div>
  );
}
