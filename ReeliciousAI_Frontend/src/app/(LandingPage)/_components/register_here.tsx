"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

export default function RegisterInterest() {
  const [email, setEmail] = useState("");
  const bgRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!bgRef.current) return;

      const container = bgRef.current.parentElement;
      if (!container) return;

      const containerRect = container.getBoundingClientRect();
      const containerWidth = container.offsetWidth;

      const triggerY = containerWidth / 2;
      const endTriggerY = (containerWidth / 3) * -1;
      const translatePercentagesOffset = 20;
      const slowerFactor = 2;

      const bottomMaximumValue = endTriggerY * -1 + triggerY;

      if (containerRect.top > triggerY) {
        bgRef.current.style.transform = `translateY(-20%)`;
      } else if (containerRect.top < endTriggerY) {
        bgRef.current.style.transform = `translateY(${
          100 / slowerFactor - translatePercentagesOffset
        }%)`;
      } else {
        const diference = (
          (containerRect.top * -1 + triggerY) /
            (bottomMaximumValue / (100 / slowerFactor)) -
          translatePercentagesOffset
        ).toFixed(2);
        bgRef.current.style.transform = `translateY(${diference}%)`;
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative w-full h-[500px] md:h-[450px] overflow-hidden">
      <div
        ref={bgRef}
        className="absolute top-[-10%] left-0 w-full min-h-[120%] bg-cover bg-center will-change-transform scale-125"
        style={{ backgroundImage: "url('/nature_parallax.png')" }}
      />

      <div className="absolute inset-0 bg-black/65 backdrop-blur-xs z-10" />

      <div className="relative z-20 flex flex-col items-center justify-center text-center h-full px-4 space-y-6">
        <h2 className="text-white text-3xl md:text-5xl font-semibold">
          🎉 Register Interest 🎉
        </h2>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="drop your email here"
          className="px-4 py-2 rounded-md border border-white/40 bg-transparent text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white"
        />

        <Button
          variant="gradient"
          size="lg"
          className={`transition-opacity duration-500 ${
            email
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          Register
        </Button>
      </div>
    </section>
  );
}
