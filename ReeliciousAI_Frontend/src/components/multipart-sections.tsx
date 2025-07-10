"use client";
import clsx from "clsx";
import {
  useState,
  Children,
  ReactElement,
  isValidElement,
  ReactNode,
} from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

type SectionProps = {
  title: string;
  children: ReactNode;
};

const Section = ({ children }: SectionProps) => {
  return <div>{children}</div>;
};
Section.displayName = "MultipartSection";

export function MultipartSections({ children }: { children: ReactNode }) {
  const [index, setIndex] = useState(0);

  const sections = Children.toArray(children).filter(
    isMultipartSection
  ) as ReactElement<SectionProps>[];

  const nextSection = () => {
    if (index + 1 > sections.length - 1) {
      return;
    }
    setIndex((prev) => prev + 1);
  };
  const prevSection = () => {
    if (index - 1 < 0) {
      return;
    }
    setIndex((prev) => prev - 1);
  };

  return (
    <div className="space-y-4 p-4">
      <div className="flex justify-center gap-2 bg-[#0B0714] border-[#300B36] border rounded-xs">
        {sections.map((c, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={clsx(
              `px-4 py-2 rounded flex flex-row 
              space-x-2 shrink-0 font-semibold`,
              i !== index
                ? `cursor-pointer hover:opacity-60 transition-opacity`
                : ""
            )}
          >
            <div
              className={clsx(
                "rounded-full size-6 border-[#300b36] border aspect-square",
                i === index ? "rai-gradient" : ""
              )}
            >
              {i + 1}
            </div>
            <p>{c?.props?.title}</p>
          </button>
        ))}
      </div>
      <div className=" rounded p-4">{sections[index]}</div>
      <div className="flex w-full justify-between mt-6">
        {index !== 0 ? (
          <button
            onClick={prevSection}
            className="flex font-semibold cursor-pointer items-center gap-2 px-4 py-2 text-white border border-[#300B36] rounded-[7px] hover:bg-[#300B36]/20 transition"
          >
            <ArrowLeft size={18} />
            Prev
          </button>
        ) : (
          <div />
        )}

        {index !== sections.length && (
          <button
            onClick={nextSection}
            className="flex font-semibold cursor-pointer items-center gap-2 px-4 py-2 text-white border border-[#300B36] rounded-[7px] hover:bg-[#300B36]/20 transition ml-auto"
          >
            Next
            <ArrowRight size={18} />
          </button>
        )}
      </div>
    </div>
  );
}

MultipartSections.Section = Section;

function isMultipartSection(child: any): child is ReactElement {
  return (
    isValidElement(child) &&
    typeof child.type === "function" &&
    (child.type as any).displayName === "MultipartSection"
  );
}
