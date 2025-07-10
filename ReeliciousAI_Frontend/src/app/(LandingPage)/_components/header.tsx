"use client"

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import Image from "next/image";

export default function Header() {
  return (
    <header className="flex justify-between items-center py-8 px-12 max-w-7xl m-auto">
      <div className="flex align-middle items-center">
        <Image src="/logo.svg" alt="logo" width={64} height={64} />
        <span className="text-2xl font-bold">ReeliciousAi</span>
      </div>
      <div>
        <Button variant={"outlineGradient"} size={"lg"} className="mr-4" onClick={()=>signIn()}>
          Login
        </Button>
        <Button variant={"gradient"} size={"lg"}>
          Get Started
        </Button>
      </div>
    </header>
  );
}
