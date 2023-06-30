import React from "react";
import { motion } from "framer-motion";

function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delay: 0.5, duration: 1.5 },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { delay: 1, duration: 1 },
    },
  };

  const buttonVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: { delay: 2, duration: 0.5 },
    },
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <motion.div
        className="flex flex-col items-center justify-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          variants={textVariants}
          className="text-5xl font-bold text-gray-800 mb-8"
        >
          Welcome to Our App
        </motion.h1>

        <motion.p
          variants={textVariants}
          className="text-lg text-gray-600 mb-16"
        >
          Download our app now to get started
        </motion.p>

        <motion.button
          variants={buttonVariants}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full shadow-lg"
        >
          Download App
        </motion.button>
      </motion.div>
    </div>
  );
}

export default Home;
