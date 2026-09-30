import React from "react";
import Link from "next/link";

const About = () => {
  return (
    <section
      id="about-section"
      className="relative w-full bg-[#0C0D0C] bg-[radial-gradient(ellipse_at_55%_48%,#1C1E1C_0%,#0E100E_55%,#080908_100%)]
        py-32 md:py-40 xl:py-48 flex items-center justify-center overflow-x-clip select-none"
    >
      <div className="relative z-10 max-w-360 mx-auto w-full px-8 xl:px-14 flex flex-col items-start">
        {/* Left Column Content - Aligned exactly with Hero Left Column */}
        <div className="max-w-135 z-20 flex flex-col items-start">
          {/* Eyebrow */}
          <div className="flex items-center gap-3">
            <span className="font-heading text-xs font-semibold text-secondary uppercase">
              THE FUTURE OF URBAN MOBILITY
            </span>
          </div>

          {/* Main Statement */}
          <h2 className="font-heading font-bold text-4xl lg:text-5xl xl:text-6xl text-white tracking-tight leading-[1.08] mt-3">
            BUILT TO MOVE YOU FORWARD.
          </h2>

          {/* Supporting Text */}
          <p className="text-gray-500 text-xs sm:text-sm font-sans font-normal max-w-90 mt-5 leading-relaxed">
            Electric scooters, mopeds, and bikes designed for the way modern cities move cleaner,
            smarter, and effortlessly connected.
          </p>

          {/* CTA Link */}
          <div className="mt-8">
            <Link
              href="/order"
              className="inline-flex items-center justify-center w-50 px-6 py-3 rounded-full bg-white/[0.07] border border-white/20 text-white font-heading text-sm font-medium cursor-pointer"
            >
              <span>EXPLORE COLLECTION</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;