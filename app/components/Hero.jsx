"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

import "../Hero.css";
//import CyberBackground from "./CyberBackground";
// Register GSAP plugins
gsap.registerPlugin(
SplitText
);

function Hero() {

const router = useRouter();

// Hero section reference
const heroRef = useRef(null);

// Video reference
const videoRef = useRef(null);

useGSAP(() => {

const video = videoRef.current;

if (!video) return;

// ==========================================
// VIDEO AUTOPLAY
// ==========================================

const createVideoAnimation = () => {

const duration = video.duration;

// Make sure video duration is valid
if (!duration || !isFinite(duration)) {
return;
}

// Start video from beginning
video.currentTime = 0;

video.muted = true;
video.loop = true;
video.play().catch(() => {});

};


// Wait until video metadata is loaded
if (video.readyState >= 1) {

createVideoAnimation();

} else {

video.addEventListener(
"loadedmetadata",
createVideoAnimation
);

}


// ==========================================
// HERO TEXT
// ==========================================

const title =
heroRef.current.querySelector(".hero-title");

const subtitle =
heroRef.current.querySelector(".hero-subtitle");

const button =
heroRef.current.querySelector(".hero-button");


// ==========================================
// SPLIT TITLE
// ==========================================

const splitTitle = new SplitText(
title,
{
type: "words"
}
);


// Initial title position
gsap.set(
splitTitle.words,
{
y: 100,
opacity: 0
}
);


// Initial subtitle and button
gsap.set(
[
subtitle,
button
],
{
y: 30,
opacity: 0
}
);


// ==========================================
// TEXT TIMELINE
// ==========================================

const timeline = gsap.timeline();


// Title animation
timeline.to(
splitTitle.words,
{
y: 0,

opacity: 1,

duration: 1.2,

stagger: 0.08,

ease: "power4.out"
}
);


// Subtitle animation
timeline.to(
subtitle,
{
y: 0,

opacity: 1,

duration: 0.8,

ease: "power3.out"
},
"-=0.6"
);


// Button animation
timeline.to(
button,
{
y: 0,

opacity: 1,

duration: 0.8,

ease: "power3.out"
},
"-=0.5"
);


// ==========================================
// CLEANUP
// ==========================================

return () => {

video.removeEventListener(
"loadedmetadata",
createVideoAnimation
);

splitTitle.revert();

video.pause();
video.loop = false;

};

}, {
scope: heroRef
});


return (

<section
ref={heroRef}
className="hero"
>


{/* =====================================
BACKGROUND VIDEO
===================================== */}

<video
ref={videoRef}

className="hero-video"

src="/robo.mp4"

muted
autoPlay
playsInline
preload="metadata"
/>


{/* =====================================
DARK OVERLAY
===================================== */}

<div className="hero-overlay"></div>


{/* =====================================
HERO CONTENT
===================================== */}

<div className="hero-content"> 
 <br/>
 <h1 className="hero-title"><span className="dec">CODEFUSE 3.0</span></h1>



<p className="hero-subtitle">
<b>THE JOURNEY BEGINS HERE</b>
</p>


<button
className="hero-button"
type="button"
onClick={() => router.push("/register")}
>
  <br/>
<span className="decbtn">
REGISTRATION OPPENING SOON 
</span>
</button>
</div>
 


{/* =====================================
SCROLL INDICATOR
===================================== */}

<div className="scroll-indicator">


<br /><br />
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-purple-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-red-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
      

{/* <div className="scroll-line"></div> */}

</div>


</section>

);
}

export default Hero;



// import { useRef } from "react";
// import { gsap } from "gsap";
// import { SplitText } from "gsap/SplitText";
// import { useGSAP } from "@gsap/react";

// gsap.registerPlugin(SplitText,ScrollTrigger);

// function Hero() {
//     const heroRef = useRef(null);
//     const videoRef =useRef(null);
//     useGSAP(()=>{
//         const video=videoRef.current;
//         if(!video)return;
//         video.pause();
//         const handleScroll=()=>{
//             const
//         }
//     })
//     useGSAP(() => {
//         const split = SplitText.create(heroRef.current, {
//             type: "chars, words, lines",
//         });

//         gsap.from(split.chars, {
//             y: 100,
//             opacity: 0,
//             duration: 1,
//             ease: "power1.out",
//             stagger: 0,
//         });

//         return () => split.revert();
//     }, { scope: heroRef });

//     return <h1 ref={heroRef} className="heri"> CODE FUSE 3.0</h1>;
// }

// export default Hero;