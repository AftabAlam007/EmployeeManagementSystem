// src/components/landing/SocialProof.jsx
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

const SocialProof = () => {
  return (
    // ✨ Apply motion to the section
    <motion.section
      id="customers"
      className="py-20 px-4 bg-slate-50"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="bg-white p-8 md:p-12 rounded-xl shadow-lg text-center">
          <img
            src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
            alt="Liza Sayre, Chief People Officer"
            className="w-24 h-24 rounded-full mx-auto mb-6"
          />
          <blockquote className="text-xl md:text-2xl text-slate-700 italic leading-relaxed">
            "Empower offers not only the features we need but support from the very beginning. That personal touch and seamless integration made all the difference for our team."
          </blockquote>
          <div className="mt-6">
            <p className="font-bold text-slate-900 text-lg">Liza Sayre</p>
            <p className="text-slate-500">Chief People Officer, Neuros Lab</p>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default SocialProof;