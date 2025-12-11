# PageSpeed Insights Analyzer

<div align="center">

![PageSpeed Insights Analyzer](https://img.shields.io/badge/PageSpeed-Analyzer-blue?style=for-the-badge&logo=google-chrome)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

<br />

### 🚀 **[LIVE DEMO: SitemapGenerator.doodax.com](https://SitemapGenerator.doodax.com)**

<br />

A professional, zero-build web application designed to analyze website performance, Core Web Vitals, and SEO metrics using the official Google PageSpeed Insights API.

</div>

## 📖 About The Project

**PageSpeed Insights Analyzer** is a robust tool built for developers, SEO specialists, and website owners. In an era where milliseconds dictate conversion rates, this application provides an instant, deep-dive analysis of how real-world users experience a website.

It helps you demystify:
- **LCP (Largest Contentful Paint):** Loading performance.
- **INP (Interaction to Next Paint):** Responsiveness.
- **CLS (Cumulative Layout Shift):** Visual stability.

## ✨ Key Features

- **Dual Strategy Analysis:** Seamlessly switch between Mobile and Desktop performance audits.
- **Visual Score Gauge:** Instant visual feedback on overall performance (0-100).
- **Core Web Vitals Assessment:** Pass/Fail metrics based on real-world Chrome User Experience Report (CrUX) data.
- **SEO & Accessibility Checks:** (Planned) foundations for broader audits.
- **Immersive UI:** A modern, glassmorphism-based interface with a dynamic starfield background.
- **SEO Friendly:** Fully optimized with Schema.org JSON-LD, sitemaps, and semantic HTML5.

## 📁 Project Structure

```text
/
├── components/          # Reusable UI Components
│   ├── InfoModal.tsx    # Legal & Informational Pop-ups (Privacy, Terms, etc.)
│   ├── MetricCard.tsx   # Individual Vital Display
│   ├── ScoreGauge.tsx   # Animated SVG Score Circle
│   ├── SeoArticle.tsx   # SEO Content Logic
│   └── Starfield.tsx    # Background Animation Canvas
├── public/              # Static Assets & SEO Files
│   ├── favicon.svg      # Branding Icon
│   ├── robots.txt       # Crawler Instructions
│   └── sitemap.xml      # Site Index
├── App.tsx              # Main Application Controller
├── constants.ts         # Configuration & API Keys
├── index.html           # Entry HTML with Metadata
├── index.tsx            # React Mount Point
├── types.ts             # TypeScript Interfaces
└── metadata.json        # Application Config
```

## 🚀 Getting Started

1.  **Clone the Repo**
    ```bash
    git clone https://github.com/hsinidev/pagespeed-analyzer.git
    ```
2.  **Configure API**
    *   Get your key from [Google Cloud Console](https://console.cloud.google.com/apis/credentials).
    *   Update `constants.ts`.
3.  **Run**
    *   No build step required. Serve `index.html` via any static server.

## 🤝 Contact & Support

**Project Admin:** HSINI MOHAMED
- **Website:** [doodax.com](https://doodax.com)
- **Email:** hsini.web@gmail.com
- **GitHub:** [hsinidev](https://github.com/hsinidev)

---
*Powered by HSINI MOHAMED*