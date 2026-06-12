"use client";

import { PremierConstructorDesktop } from "@/components/views/PremierConstructorDesktop";
import { PremierConstructorMobile } from "@/components/views/PremierConstructorMobile";

export function ConstructorView() {
  return (
    <>
      <div className="hidden min-h-0 flex-1 flex-col lg:flex">
        <PremierConstructorDesktop />
      </div>
      <div className="flex min-h-0 flex-1 flex-col lg:hidden">
        <PremierConstructorMobile />
      </div>
    </>
  );
}
