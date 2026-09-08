"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const winners = [
  {
    name: "Heshani Maddage",
    project: "Team Xterminators",
    image: "/1team01.jpg?height=200&width=200",
  },
  {
    name: "Vidusahan Perera",
    project: "Team Xterminators",
    image: "/1team02.jpg?height=200&width=200",
  },
  {
    name: "Methuli Mewanya",
    project: "Team Xterminators",
    image: "/1team03.jpg?height=200&width=200",
  },
];

export default function PastWinners() {
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
                if (index === 0) el.classList.add("animate-fadeInUp");
                else if (index === 1) el.classList.add("animate-fadeInLeft");
                else el.classList.add("animate-fadeInRight");
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
    <section ref={sectionRef} className="py-20 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-on-scroll">
          <div className="inline-block px-4 py-2 bg-purple-900/30 rounded-full text-sm font-medium mb-6">
            PAST WINNERS
          </div>
          <h2 className="text-4xl md:text-5xl font-bold">
            HALL OF{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              FAME
            </span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-on-scroll">
            {/* 1st Place Team Heading */}
            <div className="text-center">
              <h3 className="text-xl font-semibold text-purple-300 mb-4">
                🥇 1st Place - Team Xterminators
              </h3>
            </div>

            {/* First row: two winner cards */}
            <div className="grid grid-cols-2 gap-6">
              {winners.slice(0, 2).map((winner, index) => (
                <div
                  key={index}
                  className="text-center group border border-purple-500/40 rounded-lg p-4 bg-gray-800"
                >
                  <div className="relative w-full h-48 mb-4 overflow-hidden rounded-lg">
                    <Image
                      src={winner.image}
                      alt={winner.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <h3 className="font-bold text-lg mb-1">{winner.name}</h3>
                  <p className="text-purple-300 text-sm">{winner.project}</p>
                </div>
              ))}
            </div>

            {/* Second row: single centered winner card */}
            <div className="flex justify-center">
              {winners[2] && (
                <div className="text-center group border border-purple-500/40 rounded-lg p-4 bg-gray-800 w-full max-w-xs">
                  <div className="relative w-full h-48 mb-4 overflow-hidden rounded-lg">
                    <Image
                      src={winners[2].image}
                      alt={winners[2].name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <h3 className="font-bold text-lg mb-1">{winners[2].name}</h3>
                  <p className="text-purple-300 text-sm">
                    {winners[2].project}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Event Poster Section */}
          <div className="relative animate-on-scroll">
            <div className="bg-gray-900/50 backdrop-blur-sm border border-purple-500/20 rounded-lg p-8">
              <Image
                src="/winners.png?height=260&width=400"
                alt="CODEFUSE 1.0 Event Poster"
                width={400}
                height={260}
                className="w-full rounded-lg mb-2"
              />
              <h3 className="text-2xl font-bold mb-4 text-center">
                CODEFUSE 1.0
              </h3>
              <p className="text-gray-300 text-center">
                Our inaugural edition brought together 40+ participants,
                including both solo coders and teams. It marked the beginning of
                a vibrant culture of coding, creativity, and friendly
                competition. Join us as CODEFUSE 2.0 continues the journey of
                innovation and excellence!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
