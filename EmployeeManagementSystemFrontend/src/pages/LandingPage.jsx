// src/pages/LandingPage.jsx
import React from 'react';

// Common Components
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

// Section Components (moved to 'landing' folder)
import Hero from '../components/landing/Hero';
import KeyFeatures from '../components/landing/KeyFeatures';
import CoreHRIS from '../components/landing/CoreHRIS';
import EmpowerAI from '../components/landing/EmpowerAI';
import Integrations from '../components/landing/Integrations';
import SuccessMetrics from '../components/landing/SuccessMetrics';
import SocialProof from '../components/landing/SocialProof';
import FinalCTA from '../components/landing/FinalCTA';

const LandingPage = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800">
      <Header />
      <main>
        <Hero />
        <KeyFeatures />
        <CoreHRIS />
        <EmpowerAI />
        <SuccessMetrics />
        <SocialProof />
        <Integrations />
        <FinalCTA />
      </main>
      <Footer currentYear={currentYear} />
    </div>
  );
};

export default LandingPage;