import { HEADLINE, SUBHEADLINE } from "@/constants";
import Image from "next/image";
import ModelsView from "./components/ModelsView";
import ComingSoon from "./components/ComingSoon";

export default function Home() {
  return (
    <div className="min-h-screen z-10 max-h-fit overflow-hidden pb-20">
      <div>
        <Image
          src={"/assets/hallmark.svg"}
          alt="yuzu-logo"
          className="h-24 w-56 md:h-32 md:w-72 text-center mx-auto mt-10 md:mt-0"
          height={456}
          width={136}
        />
        <p className="text-xl md:text-3xl text-center mx-auto w-[85%] md:w-[38%] font-semibold mt-8 md:mt-16 text-yellow font-saira">
          {HEADLINE}
        </p>
        <p className="text-base md:text-[1.2rem] text-center mx-auto w-[90%] font-light mt-4 md:mt-8 text-yellow font-saira">
          {SUBHEADLINE}
        </p>
      </div>
      <div>
        <div className="flex flex-row justify-center gap-4 mt-16 md:mt-40 items-center">
          <button className="bg-black py-2 px-4 rounded-md border-2 border-yellow font-saira font-semibold text-lg md:text-2xl text-yellow w-[80%] md:w-auto">
            CREATE NEW AI GAMING MODEL
          </button>
          <Image
            src={"/assets/shapes.svg"}
            alt="yuzu-shapes"
            className="h-[32px] w-[32px] md:h-[44px] md:w-[44px] text-center"
            height={44}
            width={44}
          />
        </div>
        <ModelsView />
      </div>
      {/* <ComingSoon /> */}
    </div>
  );
}
