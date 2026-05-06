// src/components/landing/EmpowerAI.jsx
import React from 'react';
import { motion } from 'framer-motion'; // ✨ Import

// ✨ Define a reusable "fade-up-on-scroll" variant
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, type: 'spring', stiffness: 100 },
  },
};

const EmpowerAI = () => {
  return (
    // ✨ Apply motion to the section
    <motion.section
      className="py-20 px-4 bg-purple-600 text-white"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-center">
        <div className="flex-1 space-y-6 text-center lg:text-left">
          <span className="bg-white/10 text-white px-3 py-1 rounded-full text-sm font-semibold">EMPOWER AI</span>
          <h2 className="text-3xl md:text-4xl font-extrabold">Let AI Handle the Heavy Lifting</h2>
          <p className="text-lg text-purple-200">
            Our built-in AI drafts policies, summarizes survey feedback, and suggests action plans, giving you more time to focus on the human side of HR.
          </p>
          <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-100 transition-colors">
            See Empower AI in Action
          </button>
        </div>
        <div className="flex-1">
          <img
            src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
            alt="A person interacting with an AI-powered data visualization"
            className="rounded-xl shadow-2xl"
          />
        </div>
      </div>
    </motion.section>
  );
};

export default EmpowerAI;