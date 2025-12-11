import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: string;
}

const infoContent = {
  'About': {
    title: 'About PageSpeed Analyzer',
    content: (
      <div className="space-y-4 text-gray-300 leading-relaxed">
        <p>Welcome to <strong>Doodax PageSpeed Analyzer</strong>, a premier web performance utility designed and maintained by <strong>HSINI MOHAMED</strong>.</p>
        <p>In the modern digital landscape, speed is currency. Our tool leverages the official Google PageSpeed Insights API v5 to provide you with granular, actionable data regarding your website's performance. Whether you are a developer debugging a rendering issue or a business owner looking to improve SEO rankings, our analyzer demystifies Core Web Vitals (LCP, CLS, INP) and helps you build a faster web.</p>
        <p>Version 2.0 brings an immersive, user-friendly interface that simplifies complex metrics into understandable insights.</p>
      </div>
    ),
  },
  'Contact': {
    title: 'Contact Information',
    content: (
      <div className="space-y-4 text-gray-300 leading-relaxed">
        <p>We value your feedback and are here to assist with any technical issues or inquiries regarding the Doodax platform.</p>
        <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 mt-4">
          <ul className="space-y-3">
            <li><strong>Administrator:</strong> HSINI MOHAMED</li>
            <li><strong>Official Website:</strong> <a href="https://doodax.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">doodax.com</a></li>
            <li><strong>Support Email:</strong> <a href="mailto:hsini.web@gmail.com" className="text-blue-400 hover:text-blue-300">hsini.web@gmail.com</a></li>
            <li><strong>GitHub:</strong> <a href="https://github.com/hsinidev" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">github.com/hsinidev</a></li>
          </ul>
        </div>
        <p className="text-sm text-gray-500 mt-4">Response time is typically within 24-48 hours.</p>
      </div>
    ),
  },
  'Guide': {
    title: 'User Guide & Documentation',
    content: (
      <div className="space-y-4 text-gray-300 leading-relaxed">
        <h4 className="font-bold text-white text-lg">Getting Started</h4>
        <ol className="list-decimal list-inside space-y-2 pl-2">
          <li><strong>Input URL:</strong> Enter the full website address (e.g., <code>https://doodax.com</code>).</li>
          <li><strong>Choose Strategy:</strong> Select <strong>Mobile</strong> (recommended for SEO) or <strong>Desktop</strong>.</li>
          <li><strong>Analyze:</strong> Click the button and wait for the Google API to return real-time data.</li>
        </ol>
        
        <h4 className="font-bold text-white text-lg mt-6">Understanding Metrics</h4>
        <ul className="list-disc list-inside space-y-2 pl-2">
          <li><strong>Performance Score:</strong> A weighted average (0-100). Aim for 90+.</li>
          <li><strong>LCP (Largest Contentful Paint):</strong> Should be under 2.5 seconds.</li>
          <li><strong>INP (Interaction to Next Paint):</strong> Should be under 200 milliseconds.</li>
          <li><strong>CLS (Cumulative Layout Shift):</strong> Should be less than 0.1.</li>
        </ul>
      </div>
    ),
  },
  'Privacy Policy': {
    title: 'Privacy Policy',
    content: (
      <div className="space-y-4 text-gray-300 text-sm leading-relaxed">
        <p><strong>Effective Date:</strong> May 21, 2024</p>
        <p>At <strong>doodax.com</strong> ("we", "us", "our"), we respect your privacy. This Privacy Policy explains how we handle information when you use our PageSpeed Analyzer.</p>
        
        <h5 className="font-bold text-white mt-2">1. Data Collection</h5>
        <p>We do not require account registration. When you use our tool, the URL you enter is transmitted to the Google PageSpeed Insights API to generate the report. We do not permanently store these URLs or link them to your personal identity.</p>

        <h5 className="font-bold text-white mt-2">2. Cookies and Local Storage</h5>
        <p>We may use local storage to remember your preferred analysis settings (e.g., Mobile vs. Desktop). We do not use invasive tracking cookies.</p>

        <h5 className="font-bold text-white mt-2">3. Third-Party Services</h5>
        <p>Our application relies on Google's API services. Please refer to <a href="https://policies.google.com/privacy" target="_blank" className="text-blue-400">Google's Privacy Policy</a> for information on how they handle data processed via their APIs.</p>
        
        <h5 className="font-bold text-white mt-2">4. Contact</h5>
        <p>For privacy concerns, contact: <a href="mailto:hsini.web@gmail.com" className="text-blue-400">hsini.web@gmail.com</a>.</p>
      </div>
    ),
  },
  'Terms of Service': {
    title: 'Terms of Service',
    content: (
      <div className="space-y-4 text-gray-300 text-sm leading-relaxed">
        <p><strong>Last Updated:</strong> May 21, 2024</p>
        
        <h5 className="font-bold text-white mt-2">1. Acceptance of Terms</h5>
        <p>By accessing doodax.com, you agree to these Terms of Service. If you disagree, do not use the website.</p>

        <h5 className="font-bold text-white mt-2">2. Usage Restrictions</h5>
        <p>You agree not to misuse our services. This includes attempting to disrupt our service via DDoS attacks, automated scraping without permission, or using the tool for illegal activities.</p>

        <h5 className="font-bold text-white mt-2">3. Disclaimer of Warranties</h5>
        <p>The service is provided "AS IS". We make no warranties regarding the accuracy of the Google PageSpeed API data. We are not liable for any SEO decisions or website changes you make based on these reports.</p>

        <h5 className="font-bold text-white mt-2">4. Governing Law</h5>
        <p>These terms are governed by the laws applicable to the jurisdiction of the website owner (HSINI MOHAMED).</p>
      </div>
    ),
  },
  'DMCA': {
    title: 'DMCA Copyright Policy',
    content: (
      <div className="space-y-4 text-gray-300 text-sm leading-relaxed">
        <p>Doodax.com respects the intellectual property rights of others. Our tool analyzes publicly available web pages and does not host infringing content.</p>
        <p>If you believe that material located on or linked to by doodax.com violates your copyright, you are encouraged to notify us in accordance with the Digital Millennium Copyright Act (DMCA).</p>
        
        <h5 className="font-bold text-white mt-2">Filing a Notice</h5>
        <p>Please send a written notice to our designated agent at <strong>hsini.web@gmail.com</strong> containing:</p>
        <ul className="list-disc list-inside pl-2">
          <li>Physical or electronic signature of the copyright owner.</li>
          <li>Description of the copyrighted work.</li>
          <li>Description of the infringing material and its location (URL).</li>
          <li>Your contact information (Address, Phone, Email).</li>
          <li>A statement of good faith belief that the use is not authorized.</li>
        </ul>
      </div>
    ),
  },
};

const TABS = Object.keys(infoContent);

const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose, defaultTab }) => {
  const [activeTab, setActiveTab] = useState(TABS[0]);

  useEffect(() => {
    if (defaultTab && TABS.includes(defaultTab)) {
        setActiveTab(defaultTab);
    }
  }, [defaultTab, isOpen]);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEsc);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4 transition-all duration-300"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="info-modal-title"
    >
      <div
        className="bg-[#0f172a] border border-gray-700 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[85vh] flex flex-col overflow-hidden animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-gray-700 bg-gray-900/50">
          <div className="flex items-center gap-3">
             <div className="h-3 w-3 rounded-full bg-red-500"></div>
             <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
             <div className="h-3 w-3 rounded-full bg-green-500"></div>
             <span className="ml-2 text-gray-400 text-sm">doodax-info-system</span>
          </div>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-white hover:bg-white/10 p-2 rounded-full transition-colors" 
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex flex-col md:flex-row flex-grow overflow-hidden">
          {/* Sidebar */}
          <aside className="w-full md:w-64 bg-gray-900/30 border-b md:border-b-0 md:border-r border-gray-700 flex-shrink-0">
            <nav className="p-4">
              <ul className="space-y-1">
                {TABS.map((tab) => (
                  <li key={tab}>
                    <button
                      onClick={() => setActiveTab(tab)}
                      className={`w-full text-left px-4 py-3 rounded-lg font-medium text-sm transition-all duration-200 ${
                        activeTab === tab
                          ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                          : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
                      }`}
                    >
                      {tab}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Main Content */}
          <section className="flex-grow p-6 md:p-8 overflow-y-auto bg-gray-900/20 scroll-smooth">
            <h2 id="info-modal-title" className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                {infoContent[activeTab as keyof typeof infoContent].title}
            </h2>
            <div className="prose prose-invert prose-blue max-w-none">
                {infoContent[activeTab as keyof typeof infoContent].content}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;