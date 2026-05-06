// src/components/common/Footer.jsx
import React from 'react';import Logo from './Logo';

const Footer = ({ currentYear }) => {
  return (
    <footer className="bg-slate-900 text-white py-16 px-4">
      <div className="max-w-7xl mx-auto grid md:grid-cols-5 gap-8">
        <div className="col-span-2 md:col-span-1">
          <Logo className="text-white" />          <p className="text-slate-400 mt-4">The all-in-one platform to manage and grow your people.</p>
        </div>
        <div>
          <h4 className="font-semibold text-slate-200 mb-4">Product</h4>
          <ul className="space-y-3 text-slate-400">
            <li><a href="#" className="hover:text-white transition-colors">Core HRIS</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Performance</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Engagement</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-slate-200 mb-4">Resources</h4>
          <ul className="space-y-3 text-slate-400">
            <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
            <li><a href="#" className="hover:text-white transition-colors">ROI Calculator</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Customer Stories</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-slate-200 mb-4">Company</h4>
          <ul className="space-y-3 text-slate-400">
            <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Partners</a></li>          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-slate-200 mb-4">Legal</h4>
          <ul className="space-y-3 text-slate-400">
            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-500">
        <p>&copy; {currentYear} Empower Technologies Inc. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;