import { HEADLINE, SUBHEADLINE } from "@/constants";
import Image from "next/image";
import ModelsView from "./components/ModelsView";
import ComingSoon from "./components/ComingSoon";

export default function Home() {
  return (
    <div className="min-h-screen z-10 max-h-fit overflow-hidden">
      <img src="/gradient.png" className="absolute -top-24 left-0 -z-10" />
      <div>
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
        <p className="text-[1.2rem] text-center mx-auto font-light mt-8 text-yellow font-saira">
          {SUBHEADLINE}
        </p>
      </div>
      <div>
        <div className="flex flex-row justify-center gap-4 mt-40 items-center">
          <button className="bg-black py-2 px-4 rounded-md border-2 border-yellow font-saira font-semibold text-2xl text-yellow">
            CREATE NEW AI GAMING MODEL
          </button>
          <Image
            src={"/assets/shapes.svg"}
            alt="yuzu-shapes"
            className="h-[44px] w-[44px] text-center"
            height={44}
            width={44}
          />
        </div>
        <ModelsView />
      </div>
      <ComingSoon />
    </div>
  );
}
