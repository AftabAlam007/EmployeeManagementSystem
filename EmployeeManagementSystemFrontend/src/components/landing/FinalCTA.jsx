// src/components/landing/FinalCTA.jsx
import React from 'react';
import { motion } from 'framer-motion'; // ✨ Import

// ✨ Section fade-up variant
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, type: 'spring', stiffness: 100 },
  },
};

// ✨ Variants for the logo container (for staggering)
const logoContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1, // ✨ Each logo animates 0.1s after
      delayChildren: 0.3, // ✨ Wait 0.3s after section animates
    },
  },
};

// ✨ Variants for each logo item
const logoItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const FinalCTA = () => {
  return (
    // ✨ Apply motion to the section
    <motion.section
      className="py-20 px-4 bg-slate-50"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
          Empowering Teams at 1,500+ Leading Organizations
        </h2>
        <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
          Ready to free your team from admin overload and focus on what truly matters? See how Empower can transform your workplace.
        </p>
        <button className="bg-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-purple-700 transition-transform hover:scale-105 shadow-lg">
          Book Your Demo Today
        </button>
        {/* ✨ Apply logo variants to the container */}
        <motion.div
          className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 mt-16"
          variants={logoContainerVariants}
        >
          {/* ✨ Apply item variants to each logo */}
          <motion.img variants={logoItemVariants} src="https://logo.clearbit.com/spotify.com" alt="Spotify" className="h-10 opacity-60" />
          <motion.img variants={logoItemVariants} src="https://logo.clearbit.com/segment.com" alt="Segment" className="h-10 opacity-60" />
          <motion.img variants={logoItemVariants} src="https://logo.clearbit.com/zapier.com" alt="Zapier" className="h-10 opacity-60" />
          <motion.img variants={logoItemVariants} src="https://logo.clearbit.com/notion.so" alt="Notion" className="h-10 opacity-60" />
          <motion.img variants={logoItemVariants} src="https://logo.clearbit.com/figma.com" alt="Figma" className="h-10 opacity-60" />
        </motion.div>
      </div>
    </motion.section>
  );
};

export default FinalCTA;