import React from "react";
import Image from "next/image";

export const Structure: React.FC = () => {
  return (
    <section
      id="structure-section"
      className="relative w-full h-screen min-h-[640px] lg:min-h-[720px] max-h-[1080px] flex flex-col justify-between p-8 sm:p-12 lg:p-16 select-none overflow-hidden bg-[#0C0D0C]"
    >
      {/* Full-Screen Background Image */}
      <div className="absolute inset-0 w-full h-full z-10 overflow-hidden">
        <Image
          src="/image/structure.jpg"
          alt="Sunra Engineering Structure and Chassis Architecture"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Bottom Editorial Narrative */}
      <div className="relative z-10 max-w-360 w-full flex flex-col items-end">
        <div className="max-w-160 flex flex-col items-start">
          <h2 className="font-heading font-bold text-5xl sm:text-5xl lg:text-7xl text-secondary tracking-tight leading-[1.06]">
            ENGINEERED FROM
            <br />
            <span className="text-black">THE INSIDE OUT.</span>
          </h2>
        </div>
      </div>
    </section>
  );
};

export default Structure;
