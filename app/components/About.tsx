"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const animatedElements =
              entry.target.querySelectorAll(".animate-on-scroll");
            animatedElements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add("animate-fadeInUp");
              }, index * 200);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-16 px-4 sm:px-6 md:px-10 lg:px-16 relative bg-gradient-to-b from-purple-900/10 to-transparent"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Image Container */}
          <div className="relative animate-on-scroll mx-auto lg:mx-0 w-full max-w-md sm:max-w-lg lg:max-w-none">
            <Image
              src="/main_flyer.png?height=400&width=400"
              alt="Futuristic Tech"
              width={400}
              height={400}
              className="rounded-lg relative z-10"
              priority
            />
            {/* Soft gradient overlay but placed behind image */}
            <div className="pointer-events-none absolute inset-0 rounded-lg bg-gradient-to-r from-purple-600/20 to-transparent z-0"></div>
          </div>

          {/* Text Content */}
          <div className="animate-on-scroll text-center lg:text-left px-4 sm:px-0">
            <div className="inline-block px-4 py-2 bg-purple-900/30 rounded-full text-sm font-medium mb-6">
              ABOUT US
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
              THE BATTLE FOR
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                CODING BRILLIANCE
              </span>
            </h2>

            <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-6 max-w-xl mx-auto lg:mx-0" style={{ textAlign: 'justify' }}>
              CODEFUSE 2.0 is a premier online hackathon and intra-faculty
              coding competition, hosted on the HackerRank platform, exclusively
              for students of the Faculty of Computing, University of Sri
              Jayewardenepura. Designed to ignite innovation and empower the
              next generation of developers, CODEFUSE brings together the
              brightest minds within the faculty for an intense coding battle to
              transform ideas into impactful solutions.
            </p>

            <p className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0"  style={{ textAlign: 'justify' }}>
              With each edition, CODEFUSE continues to advance technological
              innovation by bridging the gap between concepts and execution,
              fostering a collaborative ecosystem of creativity, leadership, and
              excellence.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
