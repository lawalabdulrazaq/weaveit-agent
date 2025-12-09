import Image from "next/image";
import React from "react";

export const ThunderIcon: React.FC<React.SVGProps<SVGSVGElement>> = () => {
  return (
    <Image
      src="/icons/thund.svg"
      alt="Thunder Icon"
      width={30}
      height={30}
    />
  );
};
