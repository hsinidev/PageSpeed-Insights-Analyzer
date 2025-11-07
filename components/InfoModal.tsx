import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const infoContent = {
  'About': {
    title: 'About This Tool',
    content: (
      <div className="space-y-4 text-gray-700">
        <p>This PageSpeed Insights Analyzer is a tool developed by HSINI MOHAMED to provide instant, easy-to-understand analysis of any website's performance based on Google's Core Web Vitals.</p>
        <p>Our goal is to empower developers, marketers, and website owners to identify performance bottlenecks and improve their site's user experience and search engine ranking. The tool is built using modern web technologies and leverages the official Google PageSpeed Insights API to deliver accurate, real-time data.</p>
      </div>
    ),
  },
  'Contact': {
    title: 'Contact Us',
    content: (
      <div className="space-y-4 text-gray-700">
        <p>For any inquiries, support requests, or collaboration opportunities, please feel free to reach out. We're happy to help!</p>
        <p>
          <strong>Email:</strong> <a href="mailto:hsini.web@gmail.com" className="text-blue-600 hover:underline">hsini.web@gmail.com</a>
        </p>
        <p>
          <strong>Website:</strong> <a href="https://doodax.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">doodax.com</a>
        </p>
      </div>
    ),
  },
  'Guide': {
    title: 'How to Use',
    content: (
      <div className="space-y-4 text-gray-700">
        <ol className="list-decimal list-inside space-y-2">
          <li><strong>Enter URL:</strong> Type or paste the full URL of the website you wish to analyze into the input field (e.g., doodax.com).</li>
          <li><strong>Select Strategy:</strong> Choose between 'Mobile' and 'Desktop' to see performance data for that specific platform. Mobile is often the most critical for modern SEO.</li>
          <li><strong>Analyze:</strong> Click the "Analyze" button to start the test. The process may take a few moments as we fetch and process data from Google's servers.</li>
          <li><strong>Review Results:</strong> Your report will show an overall Performance Score, a Core Web Vitals assessment (LCP, CLS, INP/FID), and other important lab metrics like FCP and TTI.</li>
        </ol>
      </div>
    ),
  },
  'Privacy Policy': {
    title: 'Privacy Policy',
    content: (
      <div className="space-y-4 text-gray-700">
        <p>Our application, available at doodax.com, prioritizes your privacy. We do not collect, store, or share any personal user data.</p>
        <p>The URLs you enter for analysis are sent directly and securely to the Google PageSpeed Insights API. We do not log these URLs. We are not responsible for Google's data handling policies, which you can review on their official site.</p>
      </div>
    ),
  },
  'Terms of Service': {
    title: 'Terms of Service',
    content: (
      <div className="space-y-4 text-gray-700">
        <p>By using the PageSpeed Insights Analyzer on doodax.com, you agree to use the service responsibly. You agree not to use this tool for any malicious purposes, such as overloading servers with excessive requests.</p>
        <p>The service is provided "as-is" without any warranties, express or implied. We are not liable for any decisions made based on the data provided by this tool.</p>
      </div>
    ),
  },
  'DMCA': {
    title: 'DMCA Notice',
    content: (
      <div className="space-y-4 text-gray-700">
        <p>doodax.com respects the intellectual property of others. This tool only analyzes publicly accessible websites and does not host any content.</p>
        <p>If you believe your copyrighted work has been infringed upon in any way connected to our service, please contact our designated agent at <a href="mailto:hsini.web@gmail.com" className="text-blue-600 hover:underline">hsini.web@gmail.com</a> with all required information as stipulated by the Digital Millennium Copyright Act (DMCA).</p>
      </div>
    ),
  },
};

const TABS = Object.keys(infoContent);

const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState(TABS[0]);

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
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 transition-opacity duration-300"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="info-modal-title"
    >
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 id="info-modal-title" className="text-xl font-bold text-gray-800">Application Information</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800" aria-label="Close modal">
            <X size={24} />
          </button>
        </div>
        <div className="flex flex-col md:flex-row flex-grow overflow-hidden">
          <aside className="w-full md:w-1/4 border-b md:border-b-0 md:border-r p-2 md:p-4 overflow-y-auto">
            <nav>
              <ul>
                {TABS.map((tab) => (
                  <li key={tab}>
                    <button
                      onClick={() => setActiveTab(tab)}
                      className={`w-full text-left p-2 rounded-md font-medium text-sm ${
                        activeTab === tab
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {tab}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
          <section className="w-full md:w-3/4 p-6 overflow-y-auto">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">{infoContent[activeTab as keyof typeof infoContent].title}</h3>
            {infoContent[activeTab as keyof typeof infoContent].content}
          </section>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
