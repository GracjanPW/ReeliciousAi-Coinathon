import {
  BrainCircuit,
  Pencil,
  Wand,
  Share2,
  Database,
  ChartLine,
} from "lucide-react";
import Image from "next/image";

export default function AllInOne() {
  return (
    <section className="relative w-full overflow-hidden py-28 px-4">
      <Image
        src="/all_in_one_section_bg.svg"
        alt="bg"
        fill
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
      />
      <div className="relative max-w-7xl m-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-[0.25em]">ALL–IN–ONE</h2>
          <h3 className="text-lg tracking-wide text-white-300 mt-2">
            CONTENT CREATION PLATFORM
          </h3>
          <div className="w-1/2 h-[1px] bg-white/50 mx-auto mt-4 mb-3" />
          <p className="text-white-400 max-w-xl mx-auto font-bold">
            Everything you need to create, edit and publish viral short-form
            content, powered by advanced AI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="backdrop-blur-xs bg-[#2c2233]/30 border border-[#FF4C4F] rounded-lg p-5 flex flex-col gap-4">
            <div className="flex items-center justify-between text-[#FF4C4F] font-semibold tracking-wide text-[15px]">
              AI Script Generation
              <BrainCircuit className="size-4" />
            </div>
            <p className="text-sm text-white leading-5 tracking-wide">
              Generate engaging video scripts tailored for short-form content
              that captures audience attention.
            </p>
          </div>

          <div className="backdrop-blur-xs bg-[#2c2233]/30 border border-[#FF4C4F] rounded-lg p-5 flex flex-col gap-4">
            <div className="flex items-center justify-between text-[#FF4C4F] font-semibold tracking-wide text-[15px]">
              Brain Rot Clip Library
              <Pencil className="size-4" />
            </div>
            <p className="text-sm text-white leading-5 tracking-wide">
              Access thousands of trending clips to pair with your scripts for
              maximum engagement.
            </p>
          </div>

          <div className="backdrop-blur-xs bg-[#2c2233]/30 border border-[#FF4C4F] rounded-lg p-5 flex flex-col gap-4">
            <div className="flex items-center justify-between text-[#FF4C4F] font-semibold tracking-wide text-[15px]">
              Automated Editing
              <Wand className="size-4" />
            </div>
            <p className="text-sm text-white leading-5 tracking-wide">
              Automatically combine scripts with relevant video clips for
              seamless content creation.
            </p>
          </div>

          <div className="backdrop-blur-xs bg-[#2c2233]/30 border border-[#FF4C4F] rounded-lg p-5 flex flex-col gap-4">
            <div className="flex items-center justify-between text-[#FF4C4F] font-semibold tracking-wide text-[15px]">
              Multi-platform Publishing
              <Share2 className="size-4" />
            </div>
            <p className="text-sm text-white leading-5 tracking-wide">
              Publish directly to TikTok, Instagram, YouTube Shorts, and other
              social platforms.
            </p>
          </div>

          <div className="backdrop-blur-xs bg-[#2c2233]/30 border border-[#FF4C4F] rounded-lg p-5 flex flex-col gap-4">
            <div className="flex items-center justify-between text-[#FF4C4F] font-semibold tracking-wide text-[15px]">
              Zora Integration
              <Database className="size-4" />
            </div>
            <p className="text-sm text-white leading-5 tracking-wide">
              Mint your content as NFTs directly to Zora for additional
              monetization opportunities.
            </p>
          </div>

          <div className="backdrop-blur-xs bg-[#2c2233]/30 border border-[#FF4C4F] rounded-lg p-5 flex flex-col gap-4">
            <div className="flex items-center justify-between text-[#FF4C4F] font-semibold tracking-wide text-[15px]">
              Performance Analytics
              <ChartLine className="size-4" />
            </div>
            <p className="text-sm text-white leading-5 tracking-wide">
              Track engagement, views, and growth metrics across all your
              published content.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
