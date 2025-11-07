# PageSpeed Insights Analyzer

A clean, powerful, zero-build web application to analyze any website's speed and Core Web Vitals using the official Google PageSpeed Insights API. This tool provides an immediate performance report for both mobile and desktop strategies, helping developers and SEOs optimize for a better user experience.

![PageSpeed Insights Analyzer Screenshot](https://place-hold.it/1200x600?text=App+Screenshot+Here&fontsize=48)

## ✨ Features

- **Performance Score:** Visualize your site's overall performance with a color-coded gauge (0-100).
- **Core Web Vitals:** Get an instant pass/fail assessment for LCP, CLS, and INP (with FID as a fallback).
- **Key Lab Metrics:** View crucial lab data points like First Contentful Paint (FCP), Time to Interactive (TTI), and more.
- **Strategy Toggle:** Easily switch between **Mobile** and **Desktop** analysis.
- **Responsive Design:** A clean, friendly, and fully responsive interface that works on any device.
- **Zero-Build:** No `npm install` or build steps required. Just open `index.html` in your browser.
- **SEO Ready:** Comes with `robots.txt` and `sitemap.xml` to ensure proper indexing.

## 🚀 Getting Started

This project is designed to run without any build process.

### Prerequisites

You need a Google API key with the PageSpeed Insights API enabled.
1.  Go to the [Google Cloud Console](https://console.cloud.google.com/apis/credentials).
2.  Create a new project or select an existing one.
3.  Create a new API key.
4.  Make sure the [PageSpeed Insights API](https://console.cloud.google.com/apis/library/pagespeedonline.googleapis.com) is enabled for your project.

### Installation

1.  Clone the repository:
    ```sh
    git clone https://github.com/your-username/pagespeed-analyzer.git
    ```
2.  Navigate to the project directory:
    ```sh
    cd pagespeed-analyzer
    ```
3.  Update the API Key:
    - Open the `constants.ts` file.
    - Replace the placeholder value of `API_KEY` with your actual Google API key.

    ```typescript
    // constants.ts
    export const API_KEY = "YOUR_REAL_GOOGLE_API_KEY_HERE";
    ```

4.  Run the application:
    - Simply open the `index.html` file in your favorite web browser.
    - For best results, you can serve the directory using a simple local server (like the Live Server extension in VS Code).

## 💻 Technology Stack

- **Frontend:** React, TypeScript
- **Styling:** Tailwind CSS (via CDN)
- **Icons:** Lucide React
- **API:** Google PageSpeed Insights API (v5)

## 📁 Project Structure

```
.
├── components/         # Reusable React components
│   ├── MetricCard.tsx
│   ├── ScoreGauge.tsx
│   └── InfoModal.tsx
├── public/             # SEO and static assets
│   ├── favicon.svg
│   ├── robots.txt
│   └── sitemap.xml
├── App.tsx             # Main application component
├── constants.ts        # API constants (including API_KEY)
├── index.html          # The single HTML entry point
├── index.tsx           # React root renderer
├── types.ts            # TypeScript type definitions
├── metadata.json       # Application metadata
└── README.md           # You are here!
```

## LICENSE

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

Built with ❤️ by [HSINI MOHAMED](https://github.com/hsinidev).
