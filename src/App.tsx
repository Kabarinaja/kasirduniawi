/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Navbar from './components/Navbar.tsx';
import Hero from './components/Hero.tsx';
import ScreenshotGallery from './components/ScreenshotGallery.tsx';
import Features from './components/Features.tsx';
import HowItWorks from './components/HowItWorks.tsx';
import OrderSection from './components/OrderSection.tsx';
import PaymentSection from './components/PaymentSection.tsx';
import UserGuide from './components/UserGuide.tsx';
import FaqSection from './components/FaqSection.tsx';
import AboutCreator from './components/AboutCreator.tsx';
import Footer from './components/Footer.tsx';
import NotFound from './components/NotFound.tsx';
import { SiteConfig } from './types/site.ts';

const DEFAULT_CONFIG: SiteConfig = {
  appName: 'KASIR DUNIA',
  domain: 'https://kasirdunia.asia',
  price: 28500,
  priceFormatted: 'Rp28.500',
  accessPeriod: 'Akses Selamanya',
  whatsappNumber: '082379474173',
  whatsappInternational: '6282379474173',
  email: 'kasirdunia.asia@gmail.com',
  creator: {
    name: 'Logis Denis Prabowo',
    role: 'CEO & Founder',
    badge: '[ Prompt Developer ]',
    bio: 'Pengembang dan penggagas KASIR DUNIA yang bertujuan membantu usaha mengelola penjualan secara lebih praktis.',
  },
  qrisReady: false,
  apkReady: false,
  apkFilename: 'KASIR-DUNIA.apk',
  apkPath: '/downloads/KASIR-DUNIA.apk',
  merchantName: 'KASIR DUNIA',
};

export default function App() {
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(DEFAULT_CONFIG);
  const [is404, setIs404] = useState(false);

  useEffect(() => {
    // Check if path is 404
    const pathname = window.location.pathname;
    if (pathname && pathname !== '/' && pathname !== '/index.html') {
      // In SPA environment, check if user navigated to a 404 path
      if (!pathname.startsWith('/downloads') && !pathname.startsWith('/assets')) {
        setIs404(true);
      }
    }

    // Load dynamic site-config.json from local public folder
    fetch('/assets/site-config.json')
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error('Config file not found');
      })
      .then((data: Partial<SiteConfig>) => {
        setSiteConfig((prev) => ({
          ...prev,
          ...data,
          creator: {
            ...prev.creator,
            ...(data.creator || {}),
          },
        }));
      })
      .catch(() => {
        // Fallback safely to default constants
      });
  }, []);

  const handleScrollToOrder = () => {
    setIs404(false);
    const orderElement = document.getElementById('pesan');
    if (orderElement) {
      orderElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (is404) {
    return (
      <div className="min-h-screen flex flex-col justify-between bg-slate-50 text-slate-800">
        <Navbar onOrderClick={handleScrollToOrder} />
        <NotFound
          onBackToHome={() => {
            window.history.pushState({}, '', '/');
            setIs404(false);
          }}
        />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 text-slate-800 font-sans selection:bg-amber-100 selection:text-amber-900">
      <Navbar onOrderClick={handleScrollToOrder} />

      <main>
        {/* Hero Section */}
        <Hero onOrderClick={handleScrollToOrder} />

        {/* 7 Screenshots Gallery */}
        <ScreenshotGallery />

        {/* Realistic Features */}
        <Features />

        {/* How purchase & setup works */}
        <HowItWorks />

        {/* Order Section with WhatsApp Form */}
        <OrderSection />

        {/* QRIS Payment & Proof Instructions */}
        <PaymentSection siteConfig={siteConfig} />

        {/* Interactive 11-topic User Documentation */}
        <UserGuide />

        {/* Transparent FAQ / Q&A */}
        <FaqSection />

        {/* About Creator Profile */}
        <AboutCreator />
      </main>

      <Footer />
    </div>
  );
}
