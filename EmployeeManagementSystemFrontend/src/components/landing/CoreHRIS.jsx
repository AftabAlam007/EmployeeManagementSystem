// src/components/landing/CoreHRIS.jsx
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

const CoreHRIS = () => {
  return (
    // ✨ Apply motion to the section
    <motion.section
      className="py-20 px-4 bg-slate-50"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }} // ✨ Animate once when 30% in view
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row-reverse gap-12 items-center">
        <div className="flex-1 space-y-6">
          <span className="text-purple-600 font-semibold">CORE HRIS</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">Your Single Source of Truth for People Data</h2>
          <p className="text-lg text-slate-600">
            Empower's secure HRIS automates workflows, ensures compliance, and keeps all your employee data organized in one place — no more spreadsheets, no more hassle.
          </p>
          <button className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
            Explore Core HR
          </button>
        </div>
        <div className="flex-1">
          <img
            src="https://images.unsplash.com/photo-1611095965923-b99azzi40293?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
            alt="Dashboard UI showing employee profiles and data"
            className="rounded-xl shadow-2xl"
          />
        </div>
      </div>
    </motion.section>
  );
};

export default CoreHRIS;