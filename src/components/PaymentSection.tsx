import { useState } from 'react';
import { Copy, Check, MessageSquare, AlertTriangle, ShieldAlert, Smartphone } from 'lucide-react';
import {
  PRICE_AMOUNT,
  PRICE_FORMATTED,
  ADMIN_WA_RAW,
  generatePaymentProofWhatsAppUrl,
} from '../utils/order.ts';
import { SiteConfig } from '../types/site.ts';

interface PaymentSectionProps {
  siteConfig: SiteConfig;
}

export default function PaymentSection({ siteConfig }: PaymentSectionProps) {
  const [copied, setCopied] = useState(false);
  const [copyFallbackVisible, setCopyFallbackVisible] = useState(false);

  const handleCopyNominal = async () => {
    const textToCopy = PRICE_AMOUNT.toString(); // 28500
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(textToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      } else {
        // Fallback for non-https or older browsers
        const textArea = document.createElement('textarea');
        textArea.value = textToCopy;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      }
    } catch {
      setCopyFallbackVisible(true);
    }
  };

  const handleSendProof = () => {
    const waUrl = generatePaymentProofWhatsAppUrl();
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="pembayaran" className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-semibold text-amber-700 tracking-wider uppercase mb-1">
            Panduan Pembayaran
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Pembayaran Melalui QRIS
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            Satu kali pembayaran senilai {PRICE_FORMATTED} menggunakan semua aplikasi perbankan atau dompet digital (e-wallet) di Indonesia.
          </p>
        </div>

        {/* Notice if QRIS is still placeholder */}
        {!siteConfig.qrisReady && (
          <div className="max-w-3xl mx-auto mb-8 bg-amber-50 border border-amber-300 rounded-2xl p-5 text-amber-900 shadow-2xs">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
              <div className="text-sm">
                <h3 className="font-bold text-amber-950 text-base">
                  Pemberitahuan: Gambar QRIS Masih Berstatus Placeholder
                </h3>
                <p className="mt-1 leading-relaxed">
                  Gambar di bawah ini adalah file percontohan (placeholder) dan <strong>bukan QR pembayaran aktif</strong>. Pemilik website wajib mengganti file <code>public/assets/qris.png</code> dengan QRIS resmi miliknya dan mengatur <code>&quot;qrisReady&quot;: true</code> di <code>site-config.json</code> sebelum menerima transaksi riil.
                </p>
                <p className="mt-2 font-medium text-amber-900">
                  Untuk melakukan pemesanan saat ini, silakan hubungi langsung WhatsApp Admin: <strong>{ADMIN_WA_RAW}</strong>.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* QRIS Image Card */}
          <div className="md:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col items-center text-center">
            <div className="w-full text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Pindai QRIS Resmi
            </div>

            {/* QRIS Frame */}
            <div className="relative w-full max-w-[280px] aspect-square rounded-xl overflow-hidden border-2 border-slate-200 bg-slate-50 p-2 flex items-center justify-center">
              <img
                src="/assets/qris.png"
                alt="Gambar QRIS Pembayaran KASIR DUNIA"
                width={280}
                height={280}
                className="w-full h-full object-contain rounded-lg"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>

            {/* Price Badge */}
            <div className="mt-4 w-full bg-slate-50 rounded-xl p-3 border border-slate-100">
              <div className="text-xs text-slate-500">Nominal Transfer Pembayaran:</div>
              <div className="text-2xl font-extrabold text-amber-600 tabular-nums">
                {PRICE_FORMATTED}
              </div>
            </div>

            {/* Copy Nominal Button */}
            <div className="mt-3 w-full">
              <button
                type="button"
                onClick={handleCopyNominal}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-xl border border-slate-300 bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-800 transition-colors focus-visible:outline-2 focus-visible:outline-amber-600"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-700 font-bold">Nominal 28500 Berhasil Disalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-slate-600" />
                    <span>Salin nominal 28500</span>
                  </>
                )}
              </button>

              {copyFallbackVisible && (
                <p className="mt-1 text-xs text-slate-500">
                  Nominal: <strong className="font-mono">28500</strong> (silakan ketik manual di aplikasi Anda)
                </p>
              )}
            </div>

            <p className="mt-3 text-[11px] text-slate-400 leading-tight">
              *Tombol salin nominal tidak mengubah isi gambar QRIS. Silakan sesuaikan angka pembayaran di aplikasi perbankan/e-wallet Anda.
            </p>
          </div>

          {/* Payment Steps & Confirmation Card */}
          <div className="md:col-span-7 space-y-6">
            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                Langkah-Langkah Pembayaran & Konfirmasi
              </h3>

              <ol className="space-y-3.5 text-sm text-slate-600">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </span>
                  <span>
                    Buka aplikasi m-banking atau e-wallet Anda yang mendukung QRIS (BCA, Mandiri, BRI, BNI, GoPay, OVO, Dana, ShopeePay, dll).
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </span>
                  <span>
                    Pilih menu <strong>Scan / Bayar QRIS</strong> dan arahkan kamera ke kode QRIS asli milik penjual.
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </span>
                  <span>
                    Pastikan nama merchant tujuan sesuai ({siteConfig.merchantName || 'KASIR DUNIA'}), masukkan nominal <strong>{PRICE_FORMATTED}</strong> jika belum terisi otomatis, lalu selesaikan transaksi.
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    4
                  </span>
                  <span>
                    <strong>WAJIB:</strong> Ambil tangkapan layar (screenshot) bukti transaksi sukses di ponsel Anda.
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    5
                  </span>
                  <span>
                    Tekan tombol di bawah untuk membuka WhatsApp Admin ({ADMIN_WA_RAW}) dan <strong>lampirkan foto bukti pembayaran tersebut secara manual</strong>.
                  </span>
                </li>
              </ol>

              {/* Action Button: Send Proof via WhatsApp */}
              <div className="pt-3">
                <button
                  type="button"
                  onClick={handleSendProof}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-xl shadow-xs transition-colors focus-visible:outline-2 focus-visible:outline-emerald-600"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Kirim Bukti Pembayaran via WhatsApp</span>
                </button>
              </div>

              {/* Transparent Manual Verification Notice */}
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-xs text-slate-600 space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-slate-900">
                  <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Kebijakan Verifikasi Transaksi:</span>
                </div>
                <p>
                  Sistem website ini <strong>tidak menggunakan webhook otomatis</strong> dan <strong>tidak memverifikasi pembayaran secara otomatis</strong>. Pembeli harus melampirkan screenshot bukti transfer sendiri di chat WhatsApp.
                </p>
                <p className="text-slate-500">
                  Pesanan akan segera diproses setelah Admin memvalidasi dana yang masuk ke rekening merchant resmi KASIR DUNIA.
                </p>
              </div>
            </div>

            {/* Security checklist reminder for buyer */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 text-xs text-slate-500 flex items-start gap-3">
              <Smartphone className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-800">Tips Keamanan Bertransaksi:</span>{' '}
                Jangan pernah melakukan transfer atau mengirim bukti pembayaran ke nomor selain WhatsApp resmi KASIR DUNIA: <strong className="text-slate-900 font-mono">{ADMIN_WA_RAW}</strong>.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
