import { useState } from 'react';
import { Menu, X, ShoppingBag } from 'lucide-react';

interface NavbarProps {
  onOrderClick: () => void;
}

export default function Navbar({ onOrderClick }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Fitur', href: '#fitur' },
    { label: 'Tangkapan Layar', href: '#screenshots' },
    { label: 'Cara Beli & Bayar', href: '#pesan' },
    { label: 'Panduan', href: '#panduan' },
    { label: 'FAQ', href: '#faq' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text wordmark with subtle brand icon */}
          <a
            href="/"
            className="flex items-center gap-3 text-slate-900 font-bold tracking-tight text-lg whitespace-nowrap shrink-0 hover:opacity-90 transition-opacity"
            aria-label="KASIR DUNIA Beranda"
          >
            <img
              src="/assets/favicon.png"
              alt=""
              width={32}
              height={32}
              className="w-8 h-8 rounded-lg shadow-xs"
              onError={(e) => {
                // Graceful fallback if image is missing
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <span className="text-slate-900 font-extrabold tracking-tight">KASIR DUNIA</span>
          </a>

          {/* Zone 2: 4-5 concise single-line nav links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="whitespace-nowrap shrink-0 hover:text-amber-600 transition-colors py-1"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onOrderClick}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-amber-600 hover:bg-amber-700 active:bg-amber-800 rounded-lg shadow-xs transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-amber-600"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Beli Rp28.500</span>
            </button>

            {/* Mobile menu trigger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-amber-600"
              aria-label={mobileMenuOpen ? 'Tutup navigasi' : 'Buka navigasi'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="block px-3 py-2 text-base font-medium text-slate-700 hover:text-amber-600 hover:bg-slate-50 rounded-md transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOrderClick();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-lg shadow-xs"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Beli Akses Rp28.500</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
