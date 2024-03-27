import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export const BackendLoading = () => {
  return (
    <div className="relative flex justify-center items-center h-screen bg-black">
      <div className="absolute inset-0 bg-black/10 backdrop-blur-2xl"></div>
      <div className="relative z-10 text-center">
        <h3 className="text-xs px-10 font-medium text-white/50  md:text-sm  mb-1">
          You have two free credits available. Spend them wisely with each
          search.
        </h3>
        <h3 className=" font-medium text-white/70 sm:text-lg md:text-xl lg:text-2xl mb-3 animate-pulse">
          Please wait while we spin up our servers...
        </h3>

        <h3 className="text-lg font-medium text-white/80 md:text-4xl lg:text-4xl lg:mb-3">
          The fastest AI assistant ever
        </h3>
        <AnimatedText
          phrases={[
            "Get instant answers from Quickie",
            "Unlock Quickie's knowledge",
            "Discover insights with Quickie",
            "Chat with Quickie for information",
            "Quickie has the answers you need",
            "Tap into Quickie's expertise",
            "Explore topics with Quickie",
            "Interact with Quickie for quick solutions",
            "Ask Quickie anything",
            "Let Quickie assist you",
          ]}
        />
      </div>
    </div>
  );
};

const ONE_SECOND = 1000;
const WAIT_TIME = ONE_SECOND * 3;
const STAGGER = 0.025;

const AnimatedText = ({ phrases }) => {
  const countRef = useRef(0);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const intervalRef = setInterval(() => {
      setActive((pv) => (pv + 1) % phrases.length);
    }, WAIT_TIME);

    return () => clearInterval(intervalRef);
  }, [phrases]);

  return (
    <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 md:gap-2.5 lg:gap-4">
      <AnimatePresence mode="popLayout">
        {phrases[active].split(" ").map((word, wordIndex) => {
          if (wordIndex === 0) {
            countRef.current = 0;
          }

          return (
            <motion.div
              key={word}
              className="whitespace-nowrap text-lg font-medium text-white  md:text-4xl lg:text-4xl"
            >
              {word.split("").map((letter, letterIndex) => {
                const content = (
                  <motion.span
                    initial={{
                      opacity: 0,
                      scale: 0,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0,
                    }}
                    transition={{
                      delay: countRef.current * STAGGER,
                      ease: "easeInOut",
                      duration: 0.25,
                    }}
                    className="inline-block"
                    key={letterIndex}
                  >
                    {letter}
                  </motion.span>
                );

                countRef.current++;
                return content;
              })}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
