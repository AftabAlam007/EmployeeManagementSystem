// src/components/landing/Integrations.jsx
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

const Integrations = () => {
  return (
    // ✨ Apply motion to the section
    <motion.section
      id="integrations"
      className="py-20 px-4 bg-white"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
          Seamlessly Connected to Your Favorite Tools
        </h2>
        <p className="text-lg text-slate-600 mb-12 max-w-3xl mx-auto">
          Integrate with Google Workspace, Slack, Jira, Outlook, and more. Make HR processes part of the daily workflow, not extra work.
        </p>
        {/* ✨ Apply logo variants to the container */}
        <motion.div
          className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8"
          variants={logoContainerVariants}
        >
          {/* ✨ Apply item variants to each logo */}
          <motion.img variants={logoItemVariants} src="https://logo.clearbit.com/google.com" alt="Google Logo" className="h-10 opacity-60" />
          <motion.img variants={logoItemVariants} src="https://logo.clearbit.com/slack.com" alt="Slack Logo" className="h-10 opacity-60" />
          <motion.img variants={logoItemVariants} src="https://logo.clearbit.com/atlassian.com" alt="Jira (Atlassian) Logo" className="h-10 opacity-60" />
          <motion.img variants={logoItemVariants} src="https://logo.clearbit.com/microsoft.com" alt="Microsoft Logo" className="h-10 opacity-60" />
          <motion.img variants={logoItemVariants} src="https://logo.clearbit.com/greenhouse.io" alt="Greenhouse Logo" className="h-10 opacity-60" />
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Integrations;