"use client";

import { Play } from "lucide-react";
import React from "react";

interface Tone {
  id: number;
  name: string;
  description: string;
}

interface ToneSelectorProps {
  toneOptions: Tone[];
  selectedTone: number | null;
  handleToneSelect: (id: number) => void;
}

const ToneSelector = ({
  toneOptions,
  selectedTone,
  handleToneSelect,
}: ToneSelectorProps) => {
  return (
    <div className="space-y-2">
      {toneOptions.map((tone) => (
        <div
          key={tone.id}
          className={`flex justify-between items-center border rounded-md px-4 py-3 cursor-pointer transition-colors duration-200 ${
            selectedTone === tone.id
              ? "border-[#9732BC] bg-[#9732BC]/20 ring-2 ring-[#9732BC]"
              : "border-[#9732BC] hover:bg-[#1c0f24]"
          }`}
          onClick={() => handleToneSelect(tone.id)}
        >
          <div className="flex flex-col">
            <span className="text-white font-semibold text-sm">
              {tone.name}
            </span>
            <span className="text-muted-foreground text-xs max-w-sm">
              {tone.description}
            </span>
          </div>
          <button
            className="p-1 cursor-pointer hover:opacity-60 transition-opacity"
            onClick={(e) => {
              e.stopPropagation();
              console.log("Play clicked");
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="#9732BC"
              stroke="#9732BC"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-play-icon"
            >
              <polygon points="6 3 20 12 6 21 6 3" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
};

export default ToneSelector;
