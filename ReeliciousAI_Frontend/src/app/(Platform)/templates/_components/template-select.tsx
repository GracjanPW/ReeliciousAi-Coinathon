"use client";

import { cn } from "@/lib/utils";
import { BackgroundVideo } from "@/types/responses";
import React, { useRef } from "react";
import { BarLoader } from "react-spinners";

interface ITemplateSelect {
  templates?: BackgroundVideo[];
  loading: boolean;
  selected: number | null;
  onSelect: (id: number) => void;
}

const TemplateSelect = ({
  templates,
  loading,
  selected,
  onSelect,
}: ITemplateSelect) => {
  const videoRefs = useRef<HTMLVideoElement[]>([]);

  const handleMouseEnter = (index: number) => {
    const video = videoRefs.current[index];
    if (video) {
      video.play();
    }
  };

  const handleMouseLeave = (index: number) => {
    const video = videoRefs.current[index];
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };

  return (
    <div className="border-[3px] border-[#300B36] rounded-md p-4 space-y-6">
      <div className="flex overflow-x-auto space-x-4">
        {loading && <BarLoader />}
        {templates?.map((video, index) => (
          <div
            key={video.id}
            className={cn(
              "flex-none w-20 aspect-[3/5] rounded-[7px] border-[3px] border-[#300B36] overflow-hidden shadow-md cursor-pointer",
              selected === video.id && "ring-2 ring-[#300B36]"
            )}
            onClick={() => onSelect(video.id)}
          >
            <video
              ref={(el) => {
                if (el) videoRefs.current[index] = el;
              }}
              className="w-full h-full object-cover"
              poster={video.posterUrl}
              muted
              loop
              preload="none"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
            >
              <source src={video.previewUrl} type="video/mp4" />
            </video>
          </div>
        ))}
      </div>

      {/* upload file */}
      <div className="flex items-center justify-center w-full hover:bg-[#1c0f24] transition-colors duration-200">
        <label
          htmlFor="video-upload"
          className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-background/50 hover:bg-background/80"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-muted-foreground"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-muted-foreground">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-muted-foreground">
              MP4 only (MAX. 10MB)
            </p>
          </div>
        </label>
        <input
          id="video-upload"
          type="file"
          className="hidden"
          accept=".mp4"
          onChange={() => {}}
        />
      </div>
    </div>
  );
};

export default TemplateSelect;
