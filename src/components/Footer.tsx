import { MessageCircle, Mail, Globe, ArrowUp } from 'lucide-react';
import { ADMIN_WA_RAW, ADMIN_WA_INTL } from '../utils/order.ts';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-400 py-12 md:py-16 text-sm border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-slate-800">
          {/* Brand & Purpose */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/assets/favicon.png"
                alt=""
                width={32}
                height={32}
                className="w-8 h-8 rounded-lg"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <span className="text-xl font-extrabold text-white tracking-tight">
                KASIR DUNIA
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              Website resmi aplikasi Android KASIR DUNIA. Solusi kasir offline mandiri tanpa ketergantungan koneksi internet dan tanpa biaya langganan bulanan.
            </p>

            <div className="text-xs text-slate-400 space-y-1">
              <p>Pembuat: <strong className="text-slate-300">Logis Denis Prabowo</strong></p>
              <p className="font-mono text-amber-400">[ Prompt Developer ]</p>
              <p>CEO & Founder KASIR DUNIA</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              Navigasi Halaman
            </div>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a href="#fitur" className="hover:text-amber-400 transition-colors">
                  Fitur Utama
                </a>
              </li>
              <li>
                <a href="#screenshots" className="hover:text-amber-400 transition-colors">
                  Tangkapan Layar (9:16)
                </a>
              </li>
              <li>
                <a href="#pesan" className="hover:text-amber-400 transition-colors">
                  Formulir Pemesanan
                </a>
              </li>
              <li>
                <a href="#pembayaran" className="hover:text-amber-400 transition-colors">
                  Petunjuk QRIS & Bukti
                </a>
              </li>
              <li>
                <a href="#panduan" className="hover:text-amber-400 transition-colors">
                  Panduan Penggunaan
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-amber-400 transition-colors">
                  Pertanyaan Umum (FAQ)
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              Kontak Resmi
            </div>

            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <a
                  href={`https://wa.me/${ADMIN_WA_INTL}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-emerald-400 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>WhatsApp: {ADMIN_WA_RAW}</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:kasirdunia.asia@gmail.com"
                  className="inline-flex items-center gap-2 hover:text-amber-400 transition-colors"
                >
                  <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>kasirdunia.asia@gmail.com</span>
                </a>
              </li>
              <li className="inline-flex items-center gap-2 text-slate-400">
                <Globe className="w-4 h-4 text-sky-500 shrink-0" />
                <span>Domain: https://kasirdunia.asia</span>
              </li>
            </ul>

            <div className="pt-2">
              <button
                type="button"
                onClick={scrollToTop}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 text-xs transition-colors"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span>Kembali ke Atas</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Legal Notice */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            &copy; {currentYear} KASIR DUNIA. Hak cipta dilindungi.
          </div>
          <div className="text-center sm:text-right text-[11px] text-slate-400">
            Aplikasi Android didistribusikan secara mandiri untuk kemandirian kasir toko & UMKM.
          </div>
        </div>
      </div>
    </footer>
  );
}
