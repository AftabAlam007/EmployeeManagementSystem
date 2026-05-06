// src/components/landing/Hero.jsx
import React from 'react';
import { motion } from 'framer-motion'; // ✨ Import

const Hero = () => {
  return (
    <section className="bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 text-center">
        {/* ✨ Animate the H1 */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, type: 'spring' }}
          className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6"
        >
          The All-in-One Platform to Manage & Grow Your People
        </motion.h1>
        
        {/* ✨ Animate the paragraph, with a delay */}
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, type: 'spring', delay: 0.2 }}
          className="text-lg text-slate-600 mb-10 max-w-3xl mx-auto"
        >
          From HRIS and payroll to performance and engagement, Empower unites
          everything you need to build a thriving workplace and empower your
          teams.
        </motion.p>
        
        {/* ✨ Animate the button container, with a delay */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, type: 'spring', delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <button className="bg-purple-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-purple-700 transition-transform hover:scale-105 shadow-lg">
            Request a Demo
          </button>
          <button className="bg-white text-slate-700 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-slate-100 transition-transform hover:scale-105 border border-slate-300 shadow-lg">
            See Features
          </button>
        </motion.div>

        {/* ✨ Animate the image, with a delay */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="relative max-w-5xl mx-auto mt-16"
        >
          <img
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
            alt="A diverse team collaborating on a project board"
            className="rounded-xl shadow-2xl mx-auto"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;