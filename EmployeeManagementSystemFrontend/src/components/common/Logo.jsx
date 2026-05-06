import React from 'react';
import { motion } from 'framer-motion';

const Logo = ({ className, to = "/" }) => {
  const word = "Empower";
  const letters = word.split("");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.04 * i },
    }),
  };

  const childVariants = {
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      x: -20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <a href={to} className={`flex items-center space-x-2 ${className}`}>
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        className="text-purple-600"
      >
        <path
          fillRule="evenodd"
          d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h3.268a.75.75 0 01.53 1.28l-6.75 6.75a.75.75 0 01-1.06 0l-6.75-6.75a.75.75 0 01.53-1.28h3.268L9.026 2.447a.75.75 0 01.359-.852l5.23-1.746z"
          clipRule="evenodd"
        />
      </svg>
      
      <motion.div
        className="text-2xl font-bold text-slate-800"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {letters.map((letter, index) => (
          <motion.span variants={childVariants} key={index}>
            {letter}
          </motion.span>
        ))}
      </motion.div>
    </a>
  );
};

export default Logo;