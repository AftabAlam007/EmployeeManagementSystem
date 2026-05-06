// src/components/landing/SuccessMetrics.jsx
import React from 'react';
import { motion } from 'framer-motion'; // ✨ Import

// ✨ Re-using the stagger container from KeyFeatures
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // ✨ Each child animates 0.2s after
    },
  },
};

// ✨ Re-using the item variants from KeyFeatures
const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100 },
  },
};

const Metric = ({ value, description, detail }) => (
  // ✨ Apply item variants to each Metric
  <motion.div variants={itemVariants} className="text-center">
    <h3 className="text-4xl font-extrabold text-purple-600 mb-2">{value}</h3>
    <p className="text-lg font-semibold text-slate-800">{description}</p>
    <p className="text-slate-500">{detail}</p>
  </motion.div>
);

const SuccessMetrics = () => {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">What Success Looks Like with Empower</h2>
          <p className="text-lg text-slate-600 mt-4 max-w-2xl mx-auto">
            Our customers save time, boost engagement, and build better workplaces.
          </p>
        </div>
        {/* ✨ Apply container variants to the grid */}
        <motion.div
          className="grid md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <Metric value="45%" description="Less Admin Time" detail="spent on manual HR tasks." />
          <Metric value="2x" description="Faster Review Cycles" detail="with automated performance management." />
          <Metric value="+23pts" description="Increase in Engagement" detail="in the first year of implementation." />
        </motion.div>
      </div>
    </section>
  );
};

export default SuccessMetrics;