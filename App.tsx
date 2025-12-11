// Fix: Replaced placeholder content with a functional React component for the application.
import React, { useState } from 'react';
import { Loader2, Info, BarChart3, HeartPulse, Wrench, Smartphone, CheckCircle, Globe, Shield, FileText } from 'lucide-react';

import { API_KEY, API_BASE_URL } from './constants';
import { Strategy, PageSpeedResponse } from './types';
import ScoreGauge from './components/ScoreGauge';
import MetricCard from './components/MetricCard';
import InfoModal from './components/InfoModal';
import Starfield from './components/Starfield';
import SeoArticle from './components/SeoArticle';

// A dedicated component for feature cards to keep the main component clean.
const FeatureCard = ({ icon, title, children }: { icon: React.ReactNode, title: string, children?: React.ReactNode }) => (
    <div className="bg-gray-900/40 backdrop-blur-md border border-gray-700/50 rounded-xl p-6 text-center h-full hover:bg-gray-800/60 transition-all duration-300 hover:transform hover:-translate-y-1 shadow-lg">
        <div className="flex justify-center items-center mb-4">
            <div className="bg-blue-900/30 text-blue-300 rounded-full p-4 ring-1 ring-blue-500/30">
                {icon}
            </div>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed">{children}</p>
    </div>
);


function App() {
  const [url, setUrl] = useState('');
  const [strategy, setStrategy] = useState<Strategy>('mobile');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<PageSpeedResponse | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<string>('About');

  const openModal = (tab: string) => {
      setModalTab(tab);
      setIsModalOpen(true);
  };

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
    <div className="bg-black text-white min-h-screen font-sans flex flex-col items-center overflow-x-hidden">
      <Starfield />
      
      {/* Main Container - Centralized */}
      <div className="relative z-10 w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8 flex flex-col min-h-screen">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-center mb-12 py-4">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
                <div className="bg-blue-600 p-2 rounded-lg">
                    <BarChart3 className="text-white h-6 w-6" />
                </div>
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tighter text-white">
                    PageSpeed <span className="text-blue-500">Analyzer</span>
                </h1>
            </div>
            <nav className="flex items-center gap-6 text-sm font-medium text-gray-400">
                 <button onClick={() => openModal('Guide')} className="hover:text-white transition-colors">Guide</button>
                 <button onClick={() => openModal('About')} className="hover:text-white transition-colors">About</button>
                 <button
                    onClick={() => openModal('About')}
                    className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
                    aria-label="More information"
                >
                    <Info size={24} />
                </button>
            </nav>
        </header>

        <main className="flex-grow w-full">
          {/* Analysis Input Section */}
          <div id="analyzer" className="max-w-4xl mx-auto bg-gray-900/60 backdrop-blur-xl border border-gray-700/60 shadow-2xl rounded-2xl p-6 md:p-8 mb-12 transform transition-all hover:shadow-blue-900/20">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">Check Your Core Web Vitals</h2>
                <p className="text-gray-400">Enter a URL to get a comprehensive performance report instantly.</p>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
              <div className="flex-grow relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Globe className="text-gray-500 h-5 w-5" />
                </div>
                <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="doodax.com"
                    className="w-full bg-gray-800/50 border border-gray-600 rounded-xl pl-10 pr-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    aria-label="Website URL"
                />
              </div>
              <div className="flex items-center gap-3">
                <div className="flex bg-gray-800/50 border border-gray-600 p-1 rounded-xl" role="radiogroup" aria-label="Analysis Strategy">
                  {(['mobile', 'desktop'] as Strategy[]).map((s) => (
                    <button
                      key={s}
                      type="button"
                      role="radio"
                      aria-checked={strategy === s}
                      onClick={() => setStrategy(s)}
                      className={`px-4 py-3 capitalize rounded-lg text-sm font-bold transition-all duration-200 ${
                        strategy === s
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 px-8 rounded-xl hover:from-blue-500 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-all shadow-lg hover:shadow-blue-600/30 min-w-[140px]"
                >
                  {loading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Analyze'}
                </button>
              </div>
            </form>
          </div>

          {/* === NEW: Homepage content - Shown only on initial load === */}
          {!loading && !data && !error && (
            <div className="space-y-24 animate-fade-in">
              
              {/* Feature Highlights Section */}
              <section id="features" aria-labelledby="features-heading" className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                  <h2 id="features-heading" className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                    Why Performance Matters
                  </h2>
                  <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                    Optimize for speed, improve user retention, and boost your SEO rankings with our professional toolkit.
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  <FeatureCard icon={<BarChart3 size={32} />} title="Deep Analysis">
                    Full breakdown of Lighthouse metrics, diagnostics, and optimization opportunities.
                  </FeatureCard>
                  <FeatureCard icon={<HeartPulse size={32} />} title="Core Web Vitals">
                    Measure real-world user experience with LCP, INP, and CLS metrics.
                  </FeatureCard>
                  <FeatureCard icon={<Wrench size={32} />} title="Fix & Optimize">
                    Get actionable guidance on how to fix bottlenecks for immediate impact.
                  </FeatureCard>
                  <FeatureCard icon={<Smartphone size={32} />} title="Multi-Device">
                    Analyze both mobile and desktop strategies to ensure responsiveness.
                  </FeatureCard>
                </div>
              </section>

              {/* Why Speed Matters Section - Glass Layout */}
              <section className="max-w-6xl mx-auto bg-gray-900/30 backdrop-blur-sm border border-gray-800 rounded-3xl p-8 md:p-12 overflow-hidden relative">
                <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl"></div>

                <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                      Speed is Your <span className="text-blue-400">Bottom Line</span>
                    </h2>
                    <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                      A slow website costs you visitors, conversions, and search engine rankings. In today's digital landscape, performance is a necessity, not a feature.
                    </p>
                    <ul className="space-y-4 text-gray-300">
                      {[
                        "Boost SEO Rankings in Google",
                        "Increase Conversion Rates significantly",
                        "Improve User Retention & Experience"
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-center bg-gray-800/50 p-3 rounded-lg border border-gray-700/50">
                            <CheckCircle className="text-green-400 mr-3 h-5 w-5 flex-shrink-0" />
                            <span className="font-medium">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex justify-center">
                    <div className="w-full max-w-sm bg-gray-900 border border-gray-700 rounded-xl p-6 shadow-2xl relative">
                        <div className="flex justify-between items-center mb-6 border-b border-gray-800 pb-4">
                            <span className="text-gray-400 text-sm">Performance Score</span>
                            <span className="text-green-400 font-bold">98/100</span>
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs text-gray-400">
                                    <span>LCP</span>
                                    <span>1.2s</span>
                                </div>
                                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-green-500 w-[85%]"></div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs text-gray-400">
                                    <span>TBT</span>
                                    <span>50ms</span>
                                </div>
                                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-500 w-[92%]"></div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs text-gray-400">
                                    <span>CLS</span>
                                    <span>0.02</span>
                                </div>
                                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-green-500 w-[98%]"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* === SEO ARTICLE (Drop-Down) === */}
              <section className="animate-fade-in pb-12">
                  <SeoArticle />
              </section>

            </div>
          )}

          {loading && (
            <div className="text-center py-20 animate-fade-in" role="status">
              <div className="relative inline-block">
                 <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full"></div>
                 <Loader2 className="animate-spin text-blue-500 w-16 h-16 relative z-10" />
              </div>
              <h3 className="mt-6 text-2xl font-bold text-white">Analyzing Website...</h3>
              <p className="mt-2 text-gray-400">Gathering Lab and Field data from Google servers.</p>
            </div>
          )}

          {error && (
            <div className="max-w-3xl mx-auto mt-8 bg-red-900/20 border border-red-500/50 backdrop-blur-sm text-red-200 p-6 rounded-xl text-center shadow-lg animate-fade-in" role="alert">
              <h3 className="text-xl font-bold mb-2 flex items-center justify-center gap-2"><Shield className="h-5 w-5" /> Analysis Failed</h3>
              <p>{error}</p>
            </div>
          )}

          {data && (
            <div className="space-y-8 animate-fade-in max-w-6xl mx-auto">
              <section className="bg-gray-900/60 backdrop-blur-md border border-gray-700/60 rounded-2xl p-8 shadow-xl" aria-labelledby="performance-score-heading">
                <h2 id="performance-score-heading" className="text-2xl font-bold mb-6 text-white border-b border-gray-800 pb-2">Overall Performance</h2>
                <div className="flex flex-col md:flex-row items-center gap-12">
                  <div className="flex-shrink-0 bg-gray-800/50 p-6 rounded-full border border-gray-700">
                    <ScoreGauge score={performanceScore} />
                  </div>
                  <div className="space-y-4">
                      <h3 className="text-3xl font-bold text-white">
                          {performanceScore >= 90 ? 'Excellent!' : performanceScore >= 50 ? 'Needs Work' : 'Poor'}
                      </h3>
                      <p className="text-gray-300 text-lg leading-relaxed max-w-2xl">
                        This score is a summary of your site's performance based on lab data collected by Lighthouse.
                        Scores are categorized as Good (90-100), Needs Improvement (50-89), or Poor (0-49).
                      </p>
                  </div>
                </div>
              </section>

              <section aria-labelledby="core-web-vitals-heading">
                <div className="flex items-center gap-3 mb-6">
                    <HeartPulse className="text-blue-500" />
                    <h2 id="core-web-vitals-heading" className="text-2xl font-bold text-white">Core Web Vitals Assessment</h2>
                </div>
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
                <div className="flex items-center gap-3 mb-6">
                    <FileText className="text-purple-500" />
                    <h2 id="lab-data-heading" className="text-2xl font-bold text-white">Lab Data (Metrics)</h2>
                </div>
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
              
               <div className="flex justify-center pt-8">
                  <button onClick={() => { setData(null); setUrl(''); scrollToTop(); }} className="text-gray-400 hover:text-white underline">
                      Run another test
                  </button>
              </div>

            </div>
          )}
        </main>
        
        {/* Footer */}
        <footer className="mt-24 border-t border-gray-800/60 bg-gray-900/30 backdrop-blur-sm rounded-t-3xl pt-16 pb-8 px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-gray-400 max-w-6xl mx-auto">
                <div className="col-span-2 md:col-span-1">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <BarChart3 className="text-blue-500" /> Doodax
                    </h3>
                    <p className="text-sm leading-relaxed mb-4">
                        Empowering the web with speed. Analyze, optimize, and dominate search rankings with our professional tools.
                    </p>
                </div>
                <div>
                    <h3 className="font-semibold text-white mb-6 uppercase tracking-wider text-xs">Platform</h3>
                    <ul className="space-y-4 text-sm">
                        <li><button onClick={scrollToTop} className="hover:text-blue-400 transition-colors">Analyzer Tool</button></li>
                        <li><button onClick={() => openModal('About')} className="hover:text-blue-400 transition-colors">About Us</button></li>
                        <li><button onClick={() => openModal('Contact')} className="hover:text-blue-400 transition-colors">Contact Support</button></li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-semibold text-white mb-6 uppercase tracking-wider text-xs">Resources</h3>
                    <ul className="space-y-4 text-sm">
                        <li><a href="https://web.dev/vitals/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">Core Web Vitals</a></li>
                        <li><button onClick={() => openModal('Guide')} className="hover:text-blue-400 transition-colors">User Guide</button></li>
                        <li><a href="/sitemap.xml" target="_blank" className="hover:text-blue-400 transition-colors">Sitemap</a></li>
                    </ul>
                </div>
                 <div>
                    <h3 className="font-semibold text-white mb-6 uppercase tracking-wider text-xs">Legal</h3>
                    <ul className="space-y-4 text-sm">
                        <li><button onClick={() => openModal('Privacy Policy')} className="hover:text-blue-400 transition-colors">Privacy Policy</button></li>
                        <li><button onClick={() => openModal('Terms of Service')} className="hover:text-blue-400 transition-colors">Terms of Service</button></li>
                         <li><button onClick={() => openModal('DMCA')} className="hover:text-blue-400 transition-colors">DMCA</button></li>
                    </ul>
                </div>
            </div>
            
            <div className="mt-16 pt-8 border-t border-gray-800/50 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 max-w-6xl mx-auto">
                <p>&copy; {new Date().getFullYear()} Doodax. All rights reserved.</p>
                <div className="flex items-center gap-1 mt-4 md:mt-0">
                    <span>Powered by</span>
                    <a 
                        href="https://github.com/hsinidev" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-blue-400 hover:text-blue-300 font-medium transition-colors hover:underline"
                    >
                        HSINI MOHAMED
                    </a>
                </div>
            </div>
        </footer>

      </div>
      <InfoModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        defaultTab={modalTab}
      />
    </div>
  );
}

export default App;