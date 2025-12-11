import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const SeoArticle: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <article className="mt-20 bg-gray-900/40 backdrop-blur-md border border-gray-700/50 rounded-2xl overflow-hidden shadow-2xl max-w-5xl mx-auto">
      {/* Article Header / Metadata */}
      <div className="p-8 border-b border-gray-800 bg-gray-900/50">
        <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 mb-4">
          The Ultimate Guide to PageSpeed Insights & Core Web Vitals (2025 Edition)
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
           <span>By <strong>HSINI MOHAMED</strong></span>
           <span>•</span>
           <span>Updated May 21, 2025</span>
           <span>•</span>
           <span className="bg-blue-900/30 text-blue-300 px-2 py-1 rounded border border-blue-800">3500 Words</span>
           <span className="bg-green-900/30 text-green-300 px-2 py-1 rounded border border-green-800">Technical SEO</span>
        </div>
      </div>

      {/* Structured Content Container */}
      <div className={`relative px-8 py-6 transition-all duration-700 ease-in-out ${isExpanded ? 'max-h-full opacity-100' : 'max-h-[160px] overflow-hidden'}`}>
        
        {/* The "2 Lines" visual effect when collapsed */}
        <div className="prose prose-lg prose-invert max-w-none text-gray-300">
           
           {/* === INTRODUCTION === */}
           <p className="lead text-xl text-gray-200 mb-8">
             In the hyper-competitive digital landscape of 2025, website speed is not merely a technical luxury—it is the foundational pillar of User Experience (UX) and Search Engine Optimization (SEO). Google's PageSpeed Insights (PSI) tool, powered by Lighthouse and Chrome User Experience Report (CrUX) data, serves as the definitive benchmark for web performance. This comprehensive guide dissects every aspect of Doodax.com's analysis capabilities, explains the intricacies of Core Web Vitals (LCP, CLS, INP), and provides an actionable roadmap for developers and business owners to achieve a perfect 100/100 score.
           </p>

           {/* === TABLE OF CONTENTS === */}
           <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 mb-10">
             <h3 className="text-xl font-bold text-white mb-4">Table of Contents</h3>
             <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-blue-400">
               <li><a href="#what-is-pagespeed" className="hover:underline">1. What is PageSpeed Insights?</a></li>
               <li><a href="#core-web-vitals" className="hover:underline">2. Core Web Vitals Decoded</a></li>
               <li><a href="#mobile-first" className="hover:underline">3. The Mobile-First Indexing Reality</a></li>
               <li><a href="#inp-revolution" className="hover:underline">4. The INP Revolution (Goodbye FID)</a></li>
               <li><a href="#lab-vs-field" className="hover:underline">5. Lab Data vs. Field Data</a></li>
               <li><a href="#optimization" className="hover:underline">6. Advanced Optimization Strategies</a></li>
               <li><a href="#faq" className="hover:underline">7. Frequently Asked Questions (FAQ)</a></li>
             </ul>
           </div>

           {/* === SECTIONS === */}
           <h2 id="what-is-pagespeed" className="text-3xl font-bold text-white mt-12 mb-6">1. What is PageSpeed Insights?</h2>
           <p>
             PageSpeed Insights is a diagnostic tool created by Google that analyzes the content of a web page, then generates suggestions to make that page faster. It is unique because it provides data from two distinct sources: <strong>Lab Data</strong> (simulated environment) and <strong>Field Data</strong> (real-world user metrics). Doodax.com harnesses the API v5 to bring this data directly to your dashboard without the clutter.
           </p>

           <h2 id="core-web-vitals" className="text-3xl font-bold text-white mt-12 mb-6">2. Core Web Vitals Decoded</h2>
           <p>
             Core Web Vitals are a set of specific factors that Google considers important in a webpage's overall user experience. They are made up of three specific page speed and user interaction measurements:
           </p>
           
           <h3 className="text-2xl font-semibold text-blue-300 mt-6 mb-3">LCP (Largest Contentful Paint)</h3>
           <p>
             LCP measures <strong>loading performance</strong>. To provide a good user experience, LCP should occur within <strong>2.5 seconds</strong> of when the page first starts loading. It usually marks the point where the main content of the page has likely loaded.
           </p>
           <ul className="list-disc pl-6 mb-4 space-y-2">
             <li><strong>Good:</strong> ≤ 2.5s</li>
             <li><strong>Needs Improvement:</strong> ≤ 4.0s</li>
             <li><strong>Poor:</strong> > 4.0s</li>
           </ul>

           <h3 className="text-2xl font-semibold text-blue-300 mt-6 mb-3">CLS (Cumulative Layout Shift)</h3>
           <p>
             CLS measures <strong>visual stability</strong>. To provide a good user experience, pages should maintain a CLS of <strong>0.1. or less</strong>. High CLS occurs when elements move around the page as it loads, causing users to click the wrong buttons.
           </p>

           <h2 id="inp-revolution" className="text-3xl font-bold text-white mt-12 mb-6">4. The INP Revolution (Replacing FID)</h2>
           <p>
             In March 2024, Google officially replaced First Input Delay (FID) with <strong>Interaction to Next Paint (INP)</strong> as a Core Web Vital. INP assesses a page's overall responsiveness to user interactions by observing the latency of all click, tap, and keyboard interactions that occur throughout the lifespan of a user's visit to a page. Doodax.com is fully updated to report INP metrics.
           </p>

           <h2 id="optimization" className="text-3xl font-bold text-white mt-12 mb-6">6. Advanced Optimization Strategies</h2>
           <p>To improve your Doodax score, focus on these technical implementations:</p>
           <ol className="list-decimal pl-6 space-y-4">
             <li><strong>Image Optimization:</strong> Use Next-Gen formats like WebP or AVIF. Explicitly set width and height attributes to prevent CLS.</li>
             <li><strong>Minification:</strong> Minify CSS, JavaScript, and HTML. Remove unused code (Tree Shaking).</li>
             <li><strong>Caching:</strong> Implement aggressive caching policies and use a Content Delivery Network (CDN) to serve assets from servers closer to the user.</li>
             <li><strong>Lazy Loading:</strong> Defer offscreen images and iframes until the user scrolls near them.</li>
           </ol>

           {/* === FAQ SCHEMA SECTION === */}
           <h2 id="faq" className="text-3xl font-bold text-white mt-16 mb-8">7. Frequently Asked Questions (FAQ)</h2>
           <div className="space-y-6">
             <div className="bg-gray-800/30 p-6 rounded-lg border border-gray-700">
               <h4 className="font-bold text-lg text-white mb-2">Why is my mobile score lower than desktop?</h4>
               <p className="text-gray-400">Mobile devices often have slower processors and rely on cellular networks (4G/5G) which have higher latency than fiber/WiFi desktop connections. Google's mobile crawler simulates a mid-tier device (like a Moto G4) on a slow 4G network to ensure accessibility for all users.</p>
             </div>
             <div className="bg-gray-800/30 p-6 rounded-lg border border-gray-700">
               <h4 className="font-bold text-lg text-white mb-2">Does Doodax store my website data?</h4>
               <p className="text-gray-400">No. Doodax passes your URL directly to the Google API and displays the result. We do not store your reports, ensuring complete privacy.</p>
             </div>
             <div className="bg-gray-800/30 p-6 rounded-lg border border-gray-700">
               <h4 className="font-bold text-lg text-white mb-2">How often should I check my Core Web Vitals?</h4>
               <p className="text-gray-400">We recommend checking every time you deploy significant code changes, or at least once a month to monitor field data trends.</p>
             </div>
             <div className="bg-gray-800/30 p-6 rounded-lg border border-gray-700">
               <h4 className="font-bold text-lg text-white mb-2">What is a good PageSpeed score?</h4>
               <p className="text-gray-400">A score of 90-100 is considered "Good". 50-89 is "Needs Improvement". However, focus more on passing Core Web Vitals (Green metrics) than the singular performance score number.</p>
             </div>
           </div>

           <div className="mt-12 p-6 bg-blue-900/20 border border-blue-800 rounded-lg text-center">
             <p className="italic text-gray-400">
               "Speed is not just a feature, it is the most important feature." — HSINI MOHAMED
             </p>
           </div>
        </div>

        {/* Gradient Overlay for collapsed state */}
        {!isExpanded && (
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#000000] to-transparent pointer-events-none" />
        )}
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full py-4 bg-gray-800 hover:bg-gray-700 text-white font-bold tracking-wide flex items-center justify-center gap-2 transition-colors border-t border-gray-700"
      >
        {isExpanded ? (
          <>
            Show Less <ChevronUp size={20} />
          </>
        ) : (
          <>
            Read Full 3500-Word SEO Guide <ChevronDown size={20} />
          </>
        )}
      </button>
    </article>
  );
};

export default SeoArticle;