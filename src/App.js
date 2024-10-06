import React, { useEffect, useRef, useState } from "react";
import { motion , useScroll , useTransform , useMotionTemplate} from "framer-motion"
import windmil from './asswt/windmil.png'


function App() {


  return (
   
    <div className="w-full overflow-x-hidden bg-zinc-900" >
      <div className="flex items-center justify-center text-[20vw] w-full h-screen font-bold text-teal-50" >
          Scroll
      </div>
      <Hero />
      <div className="flex items-center justify-center text-[20vw] w-full h-screen font-bold text-teal-50 bg-zinc-900" >
          The End
      </div>
    </div>
  );
}
const SECTION_HEIGHT = 1000;
const Hero = () => {
  
  return (
    <div  className="relative w-full overflow-x-hidden" 
    style={{height : `calc(${SECTION_HEIGHT}px )`}}>
      <Image/>

      
    </div>
  )
}

const Image = () => {
  const [scrollSpeed, setScrollSpeed] = useState(0); // State to store scroll speed
  const [rotationAngle, setRotationAngle] = useState(0); // State to store the rotation angle
  const [blurStrength , setBlurStrength] = useState(0)
    
  // Store the previous scroll position and time
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let lastTime = Date.now();


    const updateScrollSpeed = () => {
      const currentScrollY = window.scrollY;
      const currentTime = Date.now() ;

      console.log("CurrScroll " ,currentScrollY , "Last is this " , lastScrollY , "\n" , "CurrTime " , currentTime , "last Time" , lastTime)

      // Calculate distance scrolled and time passed
      const distance = currentScrollY - lastScrollY;
      const timePassed = (currentTime - lastTime) / 1000; // in seconds

      console.log("distance " , distance , "timepaseed wala " , timePassed)
      // Calculate speed (pixels per second)

    if (timePassed > 0) {
      // Calculate speed (pixels per second)
      const speed = (distance / timePassed);

      // Update the speed state
      setScrollSpeed(speed);
       // Calculate and set the new rotation angle based on speed
       setRotationAngle(prevAngle => prevAngle + (speed * 0.01)); // Adjust multiplier for smoothness

       setBlurStrength(Math.min(scrollSpeed * 0.05, 10)) // Adjust 0.05 multiplier and 10 max value as needed

      // Log the actual speed (not the state, because setScrollSpeed is async)
      console.log("Speed: ", speed, "px/s" , "rotationangle " , rotationAngle + "deg");
      console.log("Distance: ", distance, " TimePassed: ", timePassed, "s");
    }

      // Update last values for next calculation
      lastScrollY = currentScrollY;
      lastTime = currentTime;
    };

    window.addEventListener("scroll", updateScrollSpeed);

    return () => window.removeEventListener("scroll", updateScrollSpeed);
  }, []);


  const{scrollY} = useScroll();

  const opacity = 
  useTransform(scrollY, 
  [1000 , SECTION_HEIGHT + 500] 
  , [1,0])

  const rotate = 
  useTransform(scrollY, 
  [0 , SECTION_HEIGHT +500] 
  , [ '0deg' ,'720deg'])

  const left = useTransform(scrollY ,[1000 , SECTION_HEIGHT + 500] , ['2px' , '100%'])
  
  const right = useTransform(scrollY ,[1000 , SECTION_HEIGHT + 500] , ['2px' , '100%'])

  const clip1 = 
  useTransform(scrollY, 
  [0 , SECTION_HEIGHT ] 
  , [25,0])
  
  const clip2 = 
  useTransform(scrollY, 
  [0 , SECTION_HEIGHT] 
  , [75,100])

  const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%  , ${clip2}% ${clip2}% , ${clip1}% ${clip2}%)`

   // Calculate blur strength based on scroll speed (cap it at a max value for smoothness)
   
  
   return (
    <motion.div className="sticky top-0 w-full h-full overflow-x-hidden"
    >
      <motion.img
        src={windmil}
        className="w-40 h-40 sm:top-1/3 top-1/2 sm:w-96 sm:h-96 "
        style={{
          
          // transform : 'translate(0,-50%)',
          left, // Dynamically transform the "left" property
          opacity,
          rotate: `${rotationAngle}deg`, // Use the dynamically calculated rotation angle
          backgroundImage: `url(${windmil})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: 'center',
          backgroundSize: '30%',
          position : 'relative'
        }}
      />
      <motion.img
        src={windmil}
        className="w-40 h-40 sm:top-1/3 top-1/2 sm:w-96 sm:h-96 "
        style={{
          right, // Dynamically transform the "left" property
          opacity,
          rotate: `${rotationAngle}deg`, // Use the dynamically calculated rotation angle
          backgroundImage: `url(${windmil})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: 'center',
          backgroundSize: '30%',
          position: 'absolute', // Ensure the left positioning works
        }}
      />
    </motion.div>
   )

}


export default App;
