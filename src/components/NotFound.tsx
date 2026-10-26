import { Home, ArrowLeft } from 'lucide-react';

interface NotFoundProps {
  onBackToHome: () => void;
}

export default function NotFound({ onBackToHome }: NotFoundProps) {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 bg-slate-50">
      <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 p-8 text-center shadow-xs">
        <div className="text-5xl font-extrabold text-amber-600 font-mono mb-3">404</div>
        <h1 className="text-xl font-bold text-slate-900 mb-2">Halaman Tidak Ditemukan</h1>
        <p className="text-sm text-slate-600 mb-6">
          Maaf, halaman yang Anda cari tidak tersedia atau tautan telah berpindah.
        </p>

        <button
          type="button"
          onClick={onBackToHome}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-xl transition-colors shadow-xs"
        >
          <Home className="w-4 h-4" />
          <span>Kembali ke Beranda KASIR DUNIA</span>
        </button>

        <div className="mt-6 pt-4 border-t border-slate-100">
          <a
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-amber-600"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Muat ulang situs resmi kasirdunia.asia</span>
          </a>
        </div>
      </div>
    </div>
  );
}
