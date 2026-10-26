import { User, MessageCircle, Mail, ExternalLink } from 'lucide-react';
import { ADMIN_WA_RAW, ADMIN_WA_INTL } from '../utils/order.ts';

export default function AboutCreator() {
  return (
    <section className="py-16 md:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-slate-50/70 border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-xs">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
            {/* Avatar / Portrait Frame */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-amber-100/80 border border-amber-200 text-amber-800 flex items-center justify-center shrink-0 shadow-2xs">
              <User className="w-12 h-12 text-amber-700" />
            </div>

            {/* Profile Information */}
            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold text-amber-700 uppercase tracking-wider mb-1">
                Tentang Pembuat
              </div>

              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Logis Denis Prabowo
              </h2>

              <div className="mt-0.5 text-xs font-mono font-bold text-amber-800">
                [ Prompt Developer ]
              </div>

              <div className="text-sm font-semibold text-slate-700 mt-1">
                CEO & Founder / Pembuat KASIR DUNIA
              </div>

              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                Pengembang dan penggagas KASIR DUNIA yang bertujuan membantu usaha mengelola penjualan secara lebih praktis.
              </p>

              {/* Verified Contact Badges */}
              <div className="mt-5 pt-4 border-t border-slate-200/80 flex flex-wrap items-center justify-center sm:justify-start gap-3">
                <a
                  href={`https://wa.me/${ADMIN_WA_INTL}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200 text-xs font-semibold transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>WA: {ADMIN_WA_RAW}</span>
                  <ExternalLink className="w-3 h-3 text-emerald-500" />
                </a>

                <a
                  href="mailto:kasirdunia.asia@gmail.com"
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-200 text-xs font-semibold transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-slate-600" />
                  <span>kasirdunia.asia@gmail.com</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
