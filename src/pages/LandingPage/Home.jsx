import React from "react";
import { motion } from "framer-motion";

function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1.5 }}
        className="text-5xl font-bold text-gray-800 mb-8"
      >
        Welcome to Our App
      </motion.h1>

      <motion.p
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ delay: 1, duration: 1 }}
        className="text-lg text-gray-600 mb-16"
      >
        Download our app now to get started
      </motion.p>

      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full shadow-lg"
      >
        Download App
      </motion.button>
    </div>
  );
}

export default Home;
