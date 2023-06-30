import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function AboutUs() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const listItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } },
  };

  return (
    <motion.div
      className="bg-gradient-to-r from-purple-500 to-pink-500 min-h-screen"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.header className="py-8 text-center">
        <h1 className="text-4xl font-bold text-white">About Our Application</h1>
      </motion.header>

      <motion.section className="bg-white py-12 px-4" variants={sectionVariants}>
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2">
              <motion.h2
                className="text-2xl font-bold text-gray-800 mb-4"
                variants={listItemVariants}
              >
                Our Mission
              </motion.h2>
              <motion.p className="text-gray-700" variants={listItemVariants}>
                At [Your Application Name], our mission is to provide innovative
                solutions that empower businesses to achieve their goals. We
                strive to deliver reliable, secure, and user-friendly software
                that meets the needs of our customers.
              </motion.p>
            </div>
            <div className="md:w-1/2">
              <motion.img
                src={"aboutUsImage1"}
                alt="About Us Image"
                className="rounded-lg"
                variants={listItemVariants}
              />
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section className="bg-gray-200 py-12 px-4" variants={sectionVariants}>
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2">
              <motion.h2
                className="text-2xl font-bold text-gray-800 mb-4"
                variants={listItemVariants}
              >
                Our Values
              </motion.h2>
              <motion.ul
                className="list-disc list-inside text-gray-700"
                variants={listItemVariants}
              >
                <motion.li>Customer satisfaction is our priority.</motion.li>
                <motion.li>
                  We embrace innovation and continuous improvement.
                </motion.li>
                <motion.li>We value integrity and transparency.</motion.li>
                <motion.li>
                  We foster a collaborative and inclusive environment.
                </motion.li>
                <motion.li>
                  We are committed to delivering exceptional quality.
                </motion.li>
              </motion.ul>
            </div>
            <div className="md:w-1/2">
              <motion.img
                src={"aboutUsImage2"}
                alt="About Us Image"
                className="rounded-lg"
                variants={listItemVariants}
              />
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section className="bg-white py-12 px-4" variants={sectionVariants}>
        <div className="max-w-4xl mx-auto">
          <motion.h2
            className="text-2xl font-bold text-gray-800 mb-4"
            variants={listItemVariants}
          >
            Contact Us
          </motion.h2>
          <motion.p className="text-gray-700 mb-4" variants={listItemVariants}>
            We would love to hear from you! If you have any questions or
            inquiries, please don't hesitate to reach out to our team.
          </motion.p>
          <Link to="/contact">
            <motion.button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-lg"
              variants={listItemVariants}
            >
              Contact Us
            </motion.button>
          </Link>
        </div>
      </motion.section>
    </motion.div>
  );
}

export default AboutUs;
