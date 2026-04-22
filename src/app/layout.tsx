import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Kinder Quest - Fun Learning Adventure",
  description: "An engaging, modern learning app for kids ages 4-6 with interactive games, stories, and activities",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Kinder Quest",
  },
  themeColor: "#6366f1",
  keywords: ["kids", "learning", "education", "children", "games", "ABC", "numbers", "shapes"],
  authors: [{ name: "Kinder Quest Team" }],
  openGraph: {
    title: "Kinder Quest - Fun Learning Adventure",
    description: "An engaging learning app for kids",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#6366f1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="cursor-fun">
      <head>
        <link rel="apple-touch-icon" href="/icon-192.svg" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body className="antialiased font-primary">
        {/* Skip link for accessibility */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        
        {/* Main content */}
        <div id="main-content" className="min-h-screen">
          {children}
        </div>
        
        {/* Navigation */}
        <Navigation />
        
        {/* Eye protection mode overlay (hidden by default, can be enabled via settings) */}
        <div id="eye-protection-overlay" className="fixed inset-0 pointer-events-none z-[100] hidden" style={{ background: 'rgba(255, 183, 77, 0.1)' }} />
      </body>
      
      {/* Register Service Worker */}
      <Script
        id="sw-register"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                  .then((registration) => {
                    console.log('SW registered:', registration.scope);
                  })
                  .catch((error) => {
                    console.log('SW registration failed:', error);
                  });
              });
            }
          `,
        }}
      />
      
      {/* Check for dark mode preference */}
      <Script
        id="dark-mode-check"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              const darkMode = localStorage.getItem('dark-mode');
              const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
              
              if (darkMode === 'true' || (!darkMode && prefersDark)) {
                document.documentElement.classList.add('dark');
              }
            })();
          `,
        }}
      />
    </html>
  );
}
