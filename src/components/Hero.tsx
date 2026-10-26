import { ShoppingBag, MessageCircle, ShieldCheck, WifiOff, Smartphone, Link, Lock } from 'lucide-react';
import { ADMIN_WA_INTL, ADMIN_WA_RAW, PRICE_FORMATTED } from '../utils/order.ts';

interface HeroProps {
  onOrderClick: () => void;
}

export default function Hero({ onOrderClick }: HeroProps) {
  return (
    <section className="relative overflow-hidden pt-8 pb-14 md:pt-14 md:pb-20 border-b border-slate-200 bg-linear-to-b from-amber-50/40 via-white to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Play-store styled App Detail Card */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 sm:p-8 md:p-10">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8">
            {/* App Icon */}
            <div className="relative shrink-0">
              <img
                src="/assets/logo-aplikasi.png"
                alt="Logo Aplikasi KASIR DUNIA"
                width={160}
                height={160}
                className="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-3xl border border-slate-200 shadow-sm object-cover bg-slate-900"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>

            {/* App Header Info */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500 mb-2">
                <span className="flex items-center gap-1 text-amber-700 font-semibold">
                  <Smartphone className="w-3.5 h-3.5" />
                  Android APK
                </span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                  <WifiOff className="w-3.5 h-3.5" />
                  100% Offline First
                </span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1 text-rose-700 font-semibold">
                  <Lock className="w-3.5 h-3.5" />
                  Aplikasi Berbayar
                </span>
                <span aria-hidden="true">·</span>
                <span>Usaha Mikro & Toko</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight text-balance">
                KASIR DUNIA
              </h1>

              <p className="mt-2 text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed">
                Aplikasi kasir Android premium untuk operasional toko mandiri tanpa internet dan bebas langganan bulanan. KASIR DUNIA adalah <strong>aplikasi berbayar (bukan gratis)</strong>. Setelah pemesanan dan pembayaran terkonfirmasi, Admin resmi akan mengirimkan <strong>link download khusus</strong> langsung ke nomor WhatsApp Anda.
              </p>

              {/* Price & Access Terms Highlight */}
              <div className="mt-4 flex flex-wrap items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-extrabold text-amber-600 tabular-nums">
                  {PRICE_FORMATTED}
                </span>
                <span className="text-sm text-slate-700 font-bold">
                  / Sekali Bayar Akses Selamanya
                </span>
                <span className="text-xs text-slate-400">
                  (sesuai ketentuan lisensi penjual)
                </span>
              </div>
            </div>
          </div>

          {/* Action CTAs Strip */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={onOrderClick}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold text-white bg-amber-600 hover:bg-amber-700 active:bg-amber-800 rounded-xl shadow-xs transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-amber-600"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Beli Akses Rp28.500</span>
            </button>

            <a
              href={`https://wa.me/${ADMIN_WA_INTL}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-xl border border-emerald-200 transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-emerald-600"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>WhatsApp Admin: {ADMIN_WA_RAW}</span>
            </a>
          </div>

          {/* Transparent Trust Notices */}
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-500">
            <div className="flex items-center gap-1.5">
              <Link className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Link download khusus dikirimkan oleh Admin via WhatsApp resmi setelah verifikasi</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Aplikasi berbayar terpercaya dengan panduan instalasi lengkap</span>
            </div>
            <div className="flex items-center gap-1.5">
              <WifiOff className="w-4 h-4 text-slate-600 shrink-0" />
              <span>Operasional harian 100% offline tanpa perlu koneksi internet</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
