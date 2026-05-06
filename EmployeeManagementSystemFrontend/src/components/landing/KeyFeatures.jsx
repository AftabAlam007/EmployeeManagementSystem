// src/components/landing/KeyFeatures.jsx
import React from 'react';
import { motion } from 'framer-motion';

// Define animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Each child will animate 0.2s after the previous
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 }, // Start invisible and 50px down
  visible: {
    opacity: 1,
    y: 0, // Animate to full opacity and original position
    transition: { type: 'spring', stiffness: 100 },
  },
};

const FeatureCard = ({ icon, title, children }) => (
  // Wrap the card in motion.div and apply the item variants
  <motion.div variants={itemVariants} className="bg-white p-8 rounded-lg shadow-sm border border-slate-200 text-center">
    <div className="w-16 h-16 bg-purple-100 rounded-full mx-auto flex items-center justify-center mb-6">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
    <p className="text-slate-600">{children}</p>
  </motion.div>
);

const KeyFeatures = () => {
  return (
    <section id="features" className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">Everything Your HR Team Needs</h2>
          <p className="text-lg text-slate-600 mt-4 max-w-2xl mx-auto">
            One connected platform to automate workflows, support employees, and make better decisions.
          </p>
        </div>
        {/* Wrap the grid in motion.div and apply variants */}
        <motion.div
          className="grid md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible" // Animate when it scrolls into view
          viewport={{ once: true, amount: 0.3 }} // Trigger animation once
        >
          <FeatureCard
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" /></svg>}
            title="Automated HRIS & Payroll"
          >
            Streamline onboarding, time-off, and benefits with our secure HRIS. Run payroll in minutes, not days.
          </FeatureCard>
          <FeatureCard
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>}
            title="Performance & Growth"
          >
            Run effective reviews, set goals, and provide continuous feedback to develop and retain top talent.
          </FeatureCard>
          <FeatureCard
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.085a2 2 0 00-1.736.99l-1.7 3.4M14 10L9 15m0 0l-2-2m2 2v-6a2 2 0 012-2h2.5" /></svg>}
            title="Employee Engagement"
          >
            Launch surveys, analyze feedback with AI, and take action to build a positive and inclusive company culture.
          </FeatureCard>
        </motion.div>
      </div>
    </section>
  );
};

export default KeyFeatures;