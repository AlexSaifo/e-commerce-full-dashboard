import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../app/auth/authSlice";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/products", label: "Products" },
    { path: "/about", label: "About Us" },
    { path: "/contact", label: "Contact" },
  ];

  const navVariants = {
    hidden: { opacity: 0, y: "-100%" },
    visible: { opacity: 1, y: "0%" },
    exit: { opacity: 0, y: "-100%" },
  };

  const buttonVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.1 },
    tap: { scale: 0.9 },
  };

  return (
    <nav className="bg-gray-900 text-white py-4">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link to="/" className="font-bold text-xl">
          Ecommerce App
        </Link>

        <div className="hidden md:block">
          {navItems.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className="hover:bg-gray-800 rounded px-3 py-2 mr-2"
              onClick={() => setIsOpen(false)}
            >
              {label}
            </Link>
          ))}
          {user && (
            <Link
              key={"dashboard"}
              to={"/dashboard/ecommerce"}
              className="hover:bg-gray-800 rounded px-3 py-2 mr-2"
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </Link>
          )}
          {!user ? (
            <Link to={"auth"}>
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="hover:bg-gray-800 py-2 px-4 rounded-md bg-blue-600 ml-4"
              >
                Login
              </motion.button>
            </Link>
          ) : (
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="hover:bg-gray-800 py-2 px-4 rounded-md bg-blue-600 ml-4"
              onClick={() => {
                dispatch(logout());
              }}
            >
              Logout
            </motion.button>
          )}
        </div>

        <div className="block md:hidden">
          <button onClick={toggleNav} className="focus:outline-none">
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Responsive Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={navVariants}
            className="md:hidden bg-gray-900"
          >
            {navItems.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className="block hover:bg-gray-800 py-2 px-4"
                onClick={() => setIsOpen(false)}
              >
                {label}
              </Link>
            ))}
            <Link to={"auth"}>
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="block hover:bg-gray-800 py-2 px-4 rounded-md bg-blue-600 ml-4"
              >
                Login
              </motion.button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
