import { Button } from "@/components/ui/button";
import { ArrowRight, VideoIcon, WandSparklesIcon } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="relative w-full max-w-7xl px-12 m-auto pb-20 my-20">
      <div className="flex flex-col h-full justify-center xl:max-w-1/2 lg:max-w-3/5 md:max-w-4/5 max-w-full space-y-20 py-10 z-10">
        <div>
          <div className="flex items-center text-gray-200">
            <WandSparklesIcon className="size-4 mr-2" />
            AI-Powered Content Creation
          </div>
          <h1 className="text-6xl font-semibold leading-[4.3rem] text-transparent capitalize bg-clip-text bg-gradient-to-l from-[#9732BC] to-[#E54E2A]">
            Create viral brain rot videos with ai
          </h1>
        </div>
        <p className="text-xl text-gray-300 tracking-wide leading-7">
          Generate engaging video scripts, automate content creation, and
          publish directly to social platforms and Zora with our all-in-one AI
          solution.
        </p>
        <div className="space-x-4">
          <Button variant={"gradient"} size={"xl"}>
            Get started for free <ArrowRight className="size-4 ml-2" />
          </Button>
          <Button variant={"outlineGradient"} size={"xl"}>
            Watch Demo <VideoIcon className="size-4 ml-2" />
          </Button>
        </div>
      </div>
      <div className="absolute py-20 h-full opacity-50 md:opacity-100 md:max-w-1/2 w-full top-0 right-0 items-end -z-10">
        <Image src="/hero_spiral.svg" alt="spiral" fill className="relative" />
      </div>
    </div>
  );
}
