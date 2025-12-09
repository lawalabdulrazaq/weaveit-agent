import Image from "next/image";
import React from "react";

export const PeepIcon: React.FC<React.SVGProps<SVGSVGElement>> = () => {
  return (
    <Image
      src="/icons/peep.svg"
      alt="Peep Icon"
      width={30}
      height={30}
    />
  );
};