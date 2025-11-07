// Fix: Replaced placeholder content with a functional React component for the application.
import React, { useState } from 'react';
import { Loader2, Info, BarChart3, HeartPulse, Wrench, Smartphone, CheckCircle } from 'lucide-react';

import { API_KEY, API_BASE_URL } from './constants';
import { Strategy, PageSpeedResponse } from './types';
import ScoreGauge from './components/ScoreGauge';
import MetricCard from './components/MetricCard';
import InfoModal from './components/InfoModal';
import Starfield from './components/Starfield';

// A dedicated component for feature cards to keep the main component clean.
const FeatureCard = ({ icon, title, children }: { icon: React.ReactNode, title: string, children: React.ReactNode }) => (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 text-center h-full">
        <div className="flex justify-center items-center mb-4">
            <div className="bg-blue-900/50 text-blue-300 rounded-full p-3">
                {icon}
            </div>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-400 text-sm">{children}</p>
    </div>
);


function App() {
  const [url, setUrl] = useState('');
  const [strategy, setStrategy] = useState<Strategy>('mobile');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<PageSpeedResponse | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!url) {
      setError('Please enter a URL.');
      return;
    }
    setLoading(true);
    setError(null);
    setData(null);

    // Basic URL validation
    let fullUrl = url;
    if (!/^https?:\/\//i.test(url)) {
      fullUrl = `https://${url}`;
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}?url=${encodeURIComponent(fullUrl)}&strategy=${strategy}&key=${API_KEY}`
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error.message || `An error occurred: ${response.statusText}`);
      }
      const result: PageSpeedResponse = await response.json();
      setData(result);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  const performanceScore = data ? Math.round(data.lighthouseResult.categories.performance.score * 100) : 0;
  
  const coreWebVitals = data?.loadingExperience.metrics;
  const labMetrics = data?.lighthouseResult.audits;

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="bg-black text-white min-h-screen font-sans">
      <Starfield />
      <div className="relative z-10 container mx-auto p-4 md:p-8">
        <header className="flex justify-between items-center mb-8">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tighter">
                PageSpeed <span className="text-blue-400">Insights</span> Analyzer
            </h1>
            <button
                onClick={() => setIsModalOpen(true)}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="More information"
            >
                <Info size={28} />
            </button>
        </header>

        <main>
          <div id="analyzer" className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 mb-8">
            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter a web page URL (e.g., doodax.com)"
                className="flex-grow bg-gray-800 border border-gray-600 rounded-md px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Website URL"
              />
              <div className="flex items-center gap-2">
                <div className="flex bg-gray-800 border border-gray-600 rounded-md" role="radiogroup" aria-label="Analysis Strategy">
                  {(['mobile', 'desktop'] as Strategy[]).map((s) => (
                    <button
                      key={s}
                      type="button"
                      role="radio"
                      aria-checked={strategy === s}
                      onClick={() => setStrategy(s)}
                      className={`px-4 py-3 capitalize rounded-md text-sm font-medium transition-colors ${
                        strategy === s
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 text-white font-bold py-3 px-6 rounded-md hover:bg-blue-700 disabled:bg-gray-500 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                >
                  {loading ? <Loader2 className="animate-spin" /> : 'Analyze'}
                </button>
              </div>
            </form>
          </div>

          {/* === NEW: Homepage content - Shown only on initial load === */}
          {!loading && !data && !error && (
            <div className="mt-16 md:mt-24 space-y-16 md:space-y-24 animate-fade-in">
              {/* Feature Highlights Section */}
              <section id="features" aria-labelledby="features-heading">
                <div className="text-center mb-12">
                  <h2 id="features-heading" className="text-3xl md:text-4xl font-bold tracking-tighter">
                    A Powerful, Modern Web Performance Toolkit
                  </h2>
                  <p className="mt-2 text-lg text-gray-400 max-w-3xl mx-auto">
                    Go beyond a simple score. Get the detailed insights you need to build a faster, more successful website.
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <FeatureCard icon={<BarChart3 size={28} />} title="Comprehensive Analysis">
                    Get a full breakdown of your site's performance with Lighthouse metrics, diagnostics, and optimization opportunities.
                  </FeatureCard>
                  <FeatureCard icon={<HeartPulse size={28} />} title="Core Web Vitals">
                    Measure real-world user experience with LCP, INP, and CLS to improve user satisfaction and SEO rankings.
                  </FeatureCard>
                  <FeatureCard icon={<Wrench size={28} />} title="Actionable Insights">
                    We don't just show you problems; we provide clear, actionable guidance on how to fix them for immediate impact.
                  </FeatureCard>
                  <FeatureCard icon={<Smartphone size={28} />} title="Mobile & Desktop">
                    Easily switch between mobile and desktop analysis to ensure your site is optimized for every user, on any device.
                  </FeatureCard>
                </div>
              </section>

              {/* Why Speed Matters Section */}
              <section id="why-it-matters" className="grid md:grid-cols-2 gap-12 items-center" aria-labelledby="why-it-matters-heading">
                <div className="order-2 md:order-1">
                  <h2 id="why-it-matters-heading" className="text-3xl md:text-4xl font-bold tracking-tighter">
                    Speed is More Than a Metric. It's Your Bottom Line.
                  </h2>
                  <p className="mt-4 text-lg text-gray-300">
                    A slow website costs you visitors, conversions, and search engine rankings. In today's digital landscape, performance is not a feature—it's a necessity.
                  </p>
                  <ul className="mt-6 space-y-4 text-gray-300">
                    <li className="flex items-start">
                      <CheckCircle className="text-green-400 mr-3 mt-1 flex-shrink-0" aria-hidden="true" />
                      <span><strong>Boost SEO Rankings:</strong> Google prioritizes fast, user-friendly websites. Core Web Vitals are a direct ranking factor.</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="text-green-400 mr-3 mt-1 flex-shrink-0" aria-hidden="true" />
                      <span><strong>Increase Conversions:</strong> Every millisecond counts. Faster load times are proven to increase user engagement and conversion rates.</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="text-green-400 mr-3 mt-1 flex-shrink-0" aria-hidden="true" />
                      <span><strong>Improve User Experience:</strong> Delight your visitors with a seamless, responsive experience that keeps them coming back.</span>
                    </li>
                  </ul>
                </div>
                <div className="order-1 md:order-2 flex justify-center items-center p-4">
                  <div className="w-full max-w-md aspect-video bg-gray-900/50 border border-gray-700 rounded-lg p-4 relative overflow-hidden">
                      <div className="flex items-end h-full gap-2">
                          <div className="w-1/6 h-1/4 bg-green-500 rounded-t-sm animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-1/6 h-2/4 bg-green-500 rounded-t-sm animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                          <div className="w-1/6 h-1/3 bg-orange-500 rounded-t-sm animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                          <div className="w-1/6 h-3/4 bg-green-500 rounded-t-sm animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                          <div className="w-1/6 h-2/3 bg-red-500 rounded-t-sm animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                          <div className="w-1/6 h-1/2 bg-green-500 rounded-t-sm animate-pulse" style={{ animationDelay: '0.6s' }}></div>
                      </div>
                      <p className="absolute bottom-2 right-3 text-xs text-gray-500 font-mono" aria-hidden="true">Loading Performance</p>
                  </div>
                </div>
              </section>

              {/* CTA Section */}
              <section id="cta" className="text-center bg-gray-900/70 backdrop-blur-sm border border-gray-700 rounded-lg py-12 px-6" aria-labelledby="cta-heading">
                <h2 id="cta-heading" className="text-3xl md:text-4xl font-bold tracking-tighter">Ready to Speed Up Your Site?</h2>
                <p className="mt-3 text-lg text-gray-400 max-w-xl mx-auto">
                  Get your free, instant performance report now and start building a better web.
                </p>
                <button
                  onClick={scrollToTop}
                  className="mt-8 bg-blue-600 text-white font-bold py-3 px-8 rounded-md hover:bg-blue-700 disabled:bg-gray-500 transition-all transform hover:scale-105"
                >
                  Analyze for FREE
                </button>
              </section>
            </div>
          )}

          {loading && (
            <div className="text-center py-8" role="status">
              <Loader2 className="animate-spin inline-block w-8 h-8" />
              <p className="mt-2 text-lg">Analyzing... this might take a moment.</p>
            </div>
          )}

          {error && (
            <div className="bg-red-900/50 border border-red-700 text-red-300 p-4 rounded-lg text-center" role="alert">
              <p><strong>Error:</strong> {error}</p>
            </div>
          )}

          {data && (
            <div className="space-y-8 animate-fade-in">
              <section className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6" aria-labelledby="performance-score-heading">
                <h2 id="performance-score-heading" className="text-2xl font-bold mb-4">Performance Score</h2>
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="flex-shrink-0">
                    <ScoreGauge score={performanceScore} />
                  </div>
                  <p className="text-gray-300">
                    This score is a summary of your site's performance based on lab data collected by Lighthouse.
                    Scores are categorized as Good (90-100), Needs Improvement (50-89), or Poor (0-49).
                  </p>
                </div>
              </section>

              <section aria-labelledby="core-web-vitals-heading">
                <h2 id="core-web-vitals-heading" className="text-2xl font-bold mb-4">Core Web Vitals Assessment</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <MetricCard 
                        title="Largest Contentful Paint (LCP)" 
                        value={coreWebVitals?.LARGEST_CONTENTFUL_PAINT_MS?.percentile ? `${(coreWebVitals.LARGEST_CONTENTFUL_PAINT_MS.percentile / 1000).toFixed(2)}s` : 'N/A'}
                        category={coreWebVitals?.LARGEST_CONTENTFUL_PAINT_MS?.category}
                        description="Measures loading performance."
                    />
                    <MetricCard 
                        title="Cumulative Layout Shift (CLS)" 
                        value={coreWebVitals?.CUMULATIVE_LAYOUT_SHIFT_SCORE?.percentile ? `${(coreWebVitals.CUMULATIVE_LAYOUT_SHIFT_SCORE.percentile / 100).toFixed(2)}` : 'N/A'}
                        category={coreWebVitals?.CUMULATIVE_LAYOUT_SHIFT_SCORE?.category}
                        description="Measures visual stability."
                    />
                    <MetricCard 
                        title="First Input Delay (FID)" 
                        value={coreWebVitals?.FIRST_INPUT_DELAY_MS?.percentile ? `${coreWebVitals.FIRST_INPUT_DELAY_MS.percentile}ms` : 'N/A'}
                        category={coreWebVitals?.FIRST_INPUT_DELAY_MS?.category}
                        description="Measures interactivity (legacy)."
                    />
                     <MetricCard 
                        title="Interaction to Next Paint (INP)" 
                        value={coreWebVitals?.INTERACTION_TO_NEXT_PAINT?.percentile ? `${coreWebVitals.INTERACTION_TO_NEXT_PAINT.percentile}ms` : 'N/A'}
                        category={coreWebVitals?.INTERACTION_TO_NEXT_PAINT?.category}
                        description="Measures overall responsiveness."
                    />
                </div>
              </section>

              <section aria-labelledby="lab-data-heading">
                <h2 id="lab-data-heading" className="text-2xl font-bold mb-4">Lab Data (Metrics)</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <MetricCard 
                        title="First Contentful Paint (FCP)" 
                        value={labMetrics?.['first-contentful-paint']?.displayValue || 'N/A'}
                        score={labMetrics?.['first-contentful-paint']?.score}
                    />
                    <MetricCard 
                        title="Time to Interactive (TTI)" 
                        value={labMetrics?.['interactive']?.displayValue || 'N/A'}
                        score={labMetrics?.['interactive']?.score}
                    />
                    <MetricCard 
                        title="Speed Index" 
                        value={labMetrics?.['speed-index']?.displayValue || 'N/A'}
                        score={labMetrics?.['speed-index']?.score}
                    />
                    <MetricCard 
                        title="Total Blocking Time (TBT)" 
                        value={labMetrics?.['total-blocking-time']?.displayValue || 'N/A'}
                        score={labMetrics?.['total-blocking-time']?.score}
                    />
                </div>
              </section>

            </div>
          )}
        </main>
        
        <footer className="mt-16 md:mt-24 border-t border-gray-800 pt-10 pb-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-gray-400">
                <div>
                    <h3 className="font-semibold text-white mb-4">Product</h3>
                    <ul className="space-y-3 text-sm">
                        <li><button onClick={scrollToTop} className="hover:text-white transition-colors">Analyzer</button></li>
                        <li><button onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">Features</button></li>
                        <li><button onClick={() => setIsModalOpen(true)} className="hover:text-white transition-colors">About</button></li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-semibold text-white mb-4">Core Vitals</h3>
                    <ul className="space-y-3 text-sm">
                        <li><a href="https://web.dev/lcp/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Largest Contentful Paint</a></li>
                        <li><a href="https://web.dev/inp/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Interaction to Next Paint</a></li>
                        <li><a href="https://web.dev/cls/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Cumulative Layout Shift</a></li>
                    </ul>
                </div>
                 <div>
                    <h3 className="font-semibold text-white mb-4">Resources</h3>
                    <ul className="space-y-3 text-sm">
                        <li><a href="https://web.dev/vitals/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">web.dev by Google</a></li>
                        <li><button onClick={() => setIsModalOpen(true)} className="hover:text-white transition-colors">Guide</button></li>
                        <li><button onClick={() => setIsModalOpen(true)} className="hover:text-white transition-colors">Contact</button></li>
                    </ul>
                </div>
                 <div>
                    <h3 className="font-semibold text-white mb-4">Legal</h3>
                    <ul className="space-y-3 text-sm">
                        <li><button onClick={() => setIsModalOpen(true)} className="hover:text-white transition-colors">Privacy Policy</button></li>
                        <li><button onClick={() => setIsModalOpen(true)} className="hover:text-white transition-colors">Terms of Service</button></li>
                         <li><button onClick={() => setIsModalOpen(true)} className="hover:text-white transition-colors">DMCA</button></li>
                    </ul>
                </div>
            </div>
            <div className="mt-10 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
                <p>&copy; {new Date().getFullYear()} PageSpeed Insights Analyzer. All rights reserved.</p>
                <p className="mt-2">
                    Created by <a href="https://github.com/hsinidev" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors">HSINI MOHAMED</a>
                </p>
            </div>
        </footer>

      </div>
      <InfoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

export default App;
