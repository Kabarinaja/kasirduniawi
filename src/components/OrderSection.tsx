import { useState } from 'react';
import { MessageSquare, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';
import {
  OrderData,
  validateOrderInput,
  generateWhatsAppOrderUrl,
  ADMIN_WA_RAW,
  PRICE_FORMATTED,
} from '../utils/order.ts';

export default function OrderSection() {
  const [formData, setFormData] = useState<OrderData>({
    nama: '',
    nomorWhatsapp: '',
    email: '',
    kota: '',
  });

  const [errors, setErrors] = useState<Record<keyof OrderData, string>>({
    nama: '',
    nomorWhatsapp: '',
    email: '',
    kota: '',
  });

  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

  const handleChange = (field: keyof OrderData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (hasAttemptedSubmit) {
      const validation = validateOrderInput({ ...formData, [field]: value });
      setErrors(validation.errors);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHasAttemptedSubmit(true);

    const validation = validateOrderInput(formData);
    setErrors(validation.errors);

    if (!validation.isValid) {
      return;
    }

    const waUrl = generateWhatsAppOrderUrl(formData);
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="pesan" className="py-16 md:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-semibold text-amber-700 tracking-wider uppercase mb-1">
            Formulir Pemesanan
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Pesan Akses KASIR DUNIA
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            Isi formulir singkat berikut untuk memesan akses seharga {PRICE_FORMATTED}. Pesan akan diteruskan langsung ke WhatsApp resmi Admin KASIR DUNIA.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Order Form */}
          <div className="lg:col-span-7 bg-slate-50/70 p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {/* Nama Lengkap */}
              <div>
                <label htmlFor="order-nama" className="block text-xs font-bold text-slate-800 uppercase tracking-wide mb-1.5">
                  Nama Lengkap <span className="text-rose-600">*</span>
                </label>
                <input
                  id="order-nama"
                  type="text"
                  required
                  value={formData.nama}
                  onChange={(e) => handleChange('nama', e.target.value)}
                  placeholder="Contoh: Budi Santoso"
                  className={`w-full px-4 py-2.5 text-sm bg-white rounded-xl border ${
                    errors.nama ? 'border-rose-500 focus:border-rose-600' : 'border-slate-300 focus:border-amber-600'
                  } focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 text-slate-900 transition-colors`}
                />
                {errors.nama && (
                  <p className="mt-1 text-xs text-rose-600 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.nama}
                  </p>
                )}
              </div>

              {/* Nomor WhatsApp */}
              <div>
                <label htmlFor="order-wa" className="block text-xs font-bold text-slate-800 uppercase tracking-wide mb-1.5">
                  Nomor WhatsApp Anda <span className="text-rose-600">*</span>
                </label>
                <input
                  id="order-wa"
                  type="tel"
                  required
                  value={formData.nomorWhatsapp}
                  onChange={(e) => handleChange('nomorWhatsapp', e.target.value)}
                  placeholder="Contoh: 081234567890"
                  className={`w-full px-4 py-2.5 text-sm bg-white rounded-xl border ${
                    errors.nomorWhatsapp ? 'border-rose-500 focus:border-rose-600' : 'border-slate-300 focus:border-amber-600'
                  } focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 text-slate-900 transition-colors`}
                />
                {errors.nomorWhatsapp && (
                  <p className="mt-1 text-xs text-rose-600 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.nomorWhatsapp}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="order-email" className="block text-xs font-bold text-slate-800 uppercase tracking-wide mb-1.5">
                  Alamat Email <span className="text-rose-600">*</span>
                </label>
                <input
                  id="order-email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="Contoh: budi@warunganda.com"
                  className={`w-full px-4 py-2.5 text-sm bg-white rounded-xl border ${
                    errors.email ? 'border-rose-500 focus:border-rose-600' : 'border-slate-300 focus:border-amber-600'
                  } focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 text-slate-900 transition-colors`}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-rose-600 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Kabupaten / Kota */}
              <div>
                <label htmlFor="order-kota" className="block text-xs font-bold text-slate-800 uppercase tracking-wide mb-1.5">
                  Kabupaten / Kota Domisili Usaha <span className="text-rose-600">*</span>
                </label>
                <input
                  id="order-kota"
                  type="text"
                  required
                  value={formData.kota}
                  onChange={(e) => handleChange('kota', e.target.value)}
                  placeholder="Contoh: Kota Bandung / Kab. Sleman"
                  className={`w-full px-4 py-2.5 text-sm bg-white rounded-xl border ${
                    errors.kota ? 'border-rose-500 focus:border-rose-600' : 'border-slate-300 focus:border-amber-600'
                  } focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 text-slate-900 transition-colors`}
                />
                {errors.kota && (
                  <p className="mt-1 text-xs text-rose-600 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.kota}
                  </p>
                )}
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-white bg-amber-600 hover:bg-amber-700 active:bg-amber-800 rounded-xl shadow-xs transition-colors focus-visible:outline-2 focus-visible:outline-amber-600"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Pesan Sekarang melalui WhatsApp</span>
                </button>
              </div>

              {/* Explicit User Action & Privacy Note */}
              <div className="bg-amber-50/80 rounded-xl p-3.5 border border-amber-200/80 text-xs text-amber-900 leading-relaxed space-y-1">
                <p className="font-semibold flex items-center gap-1.5 text-amber-950">
                  <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
                  Catatan Penting Pengiriman Pesan:
                </p>
                <p>
                  Tombol ini akan membuka aplikasi WhatsApp resmi ke Admin (<strong>{ADMIN_WA_RAW}</strong>) dengan format pesan otomatis. <strong>Anda perlu menekan tombol kirim sendiri di aplikasi WhatsApp Anda</strong> untuk mengirimkan data pemesanan.
                </p>
                <p className="text-[11px] text-amber-800/80">
                  Data yang Anda masukkan tidak disimpan ke server mana pun; hanya digunakan untuk menyusun draf pesan WhatsApp Anda.
                </p>
              </div>
            </form>
          </div>

          {/* Order Summary Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-xs">
              <h3 className="text-base font-bold text-slate-900 tracking-tight pb-3 border-b border-slate-100 flex items-center justify-between">
                <span>Ringkasan Pesanan</span>
                <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">
                  Akses Selamanya
                </span>
              </h3>

              <div className="py-4 space-y-3 text-sm">
                <div className="flex justify-between items-center text-slate-600">
                  <span>Produk:</span>
                  <span className="font-semibold text-slate-900">KASIR DUNIA (Android)</span>
                </div>
                <div className="flex justify-between items-center text-slate-600">
                  <span>Masa Berlaku:</span>
                  <span className="font-semibold text-slate-900">Akses Selamanya</span>
                </div>
                <div className="flex justify-between items-center text-slate-600">
                  <span>Mode Penggunaan:</span>
                  <span className="font-semibold text-slate-900">100% Offline Lokal</span>
                </div>
                <div className="flex justify-between items-center text-slate-600">
                  <span>Pengiriman:</span>
                  <span className="font-semibold text-slate-900">APK & Petunjuk Panduan</span>
                </div>

                <div className="pt-3 border-t border-slate-100 flex justify-between items-baseline">
                  <span className="font-bold text-slate-900">Total Pembayaran:</span>
                  <span className="text-2xl font-extrabold text-amber-600 tabular-nums">
                    {PRICE_FORMATTED}
                  </span>
                </div>
              </div>

              <div className="mt-2 pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-500">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Satu kali bayar, tanpa biaya langganan bulanan.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Petunjuk instalasi dan cara penggunaan disertakan.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Dukungan tanya jawab melalui WhatsApp admin resmi.</span>
                </div>
              </div>
            </div>

            {/* Quick WhatsApp Contact Block */}
            <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xs">
              <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">
                WhatsApp Admin Resmi
              </div>
              <div className="text-lg font-extrabold tracking-tight text-white font-mono">
                {ADMIN_WA_RAW}
              </div>
              <p className="mt-1 text-xs text-slate-300">
                Punya pertanyaan sebelum memesan? Silakan hubungi admin langsung untuk konsultasi kebutuhan kasir toko Anda.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
