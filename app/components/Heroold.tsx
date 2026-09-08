// "use client";

// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import { useRef } from "react";

// export default function Hero() {
//   const [glitch, setGlitch] = useState(false);
//   const [showPopup, setShowPopup] = useState(true);

//   const router = useRouter();

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setGlitch(true);
//       setTimeout(() => setGlitch(false), 200);
//     }, 3000);

//     return () => clearInterval(interval);
//   }, []);

//   // const handleRegisterClick = () => {
//   //   // Registration is closed - do nothing
//   //   return;
//   // };

//   return (
//     <section className="relative min-h-screen max-h-screenflex items-center justify-center overflow-hidden">
//       {/* Background */}
//       <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-purple-800/10"></div>

//       {/* Waves */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 via-transparent to-purple-900/10 animate-pulse"></div>
//         <div className="absolute top-0 left-0 w-full h-full">
//           <div className="absolute top-1/4 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float-slow"></div>
//           <div className="absolute top-3/4 right-0 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-float-medium"></div>
//           <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-purple-400/10 rounded-full blur-3xl animate-float-fast"></div>
//         </div>
//       </div>

//       {/* Hero content */}
//       <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
//         <div className="mb-8">
//           <Image
//             src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ACS%20Hackathon%20Posts-lXWxN2bhldAVvw21IGEXgDyZjQXiI3.png"
//             alt="Anonymous Hacker"
//             width={400}
//             height={400}
//             className="mx-auto mb-8 rounded-full"
//             priority
//           />
//         </div>

//         <h1
//           className={`text-6xl md:text-8xl lg:text-9xl font-bold mb-6 ${
//             glitch ? "glitch" : ""
//           }`}
//         >
//           <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
//             CODEFUSE 3.0
//           </span>
//         </h1>

//         <p className="text-xl md:text-2xl lg:text-3xl mb-12 text-gray-300 font-light">
//           Unleash the Power of Code
//         </p>

//         {/* <button
//           onClick={handleRegisterClick}
//           className="bg-gray-600 px-8 py-4 rounded-lg text-lg font-semibold cursor-not-allowed opacity-60"
//           disabled
//         >
//           Registration Closed
//         </button> */}
//       </div>

//       {/* Toast-style popup in top-right */}
//       {showPopup && (
//         <div className="fixed top-6 font-semibold right-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl shadow-xl  border-purple-300 z-50 animate-fade-in-out">
//           🎉 <strong>Registration</strong> opens soon!
//         </div>
//       )}

//       {/* Scroll indicator */}
//       <br /><br />
//       <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
//         <div className="w-6 h-10 border-2 border-purple-400 rounded-full flex justify-center">
//           <div className="w-1 h-3 bg-purple-400 rounded-full mt-2 animate-pulse"></div>
//         </div>
//       </div>
//     </section>
//   );
// }
