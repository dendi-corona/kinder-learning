import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kindergarten Learning Quest",
  description: "Fun learning adventure for kids ages 4-6",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Kinder Quest",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" href="/icon-192.svg" />
        <meta name="theme-color" content="#4FC3F7" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
