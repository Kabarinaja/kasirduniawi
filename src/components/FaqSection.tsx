import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { ADMIN_WA_RAW, PRICE_FORMATTED } from '../utils/order.ts';

interface FaqItem {
  q: string;
  a: string;
}

const FAQS: FaqItem[] = [
  {
    q: 'Apa itu KASIR DUNIA?',
    a: 'KASIR DUNIA adalah aplikasi kasir point-of-sale (POS) untuk smartphone dan tablet Android yang berfokus pada operasional offline. Aplikasi ini membantu pemilik toko, warung, dan UMKM mencatat transaksi penjualan, mengelola stok barang, dan mencetak struk belanja tanpa ketergantungan koneksi internet dan tanpa biaya langganan bulanan.',
  },
  {
    q: 'Apakah aplikasi bisa digunakan tanpa internet?',
    a: 'Ya, seluruh operasional kasir harian—seperti input barang, transaksi kasir, perhitungan total & kembalian, cetak struk thermal, dan rekap laporan penjualan—berjalan 100% offline langsung di perangkat Anda tanpa memerlukan sinyal WiFi maupun kuota internet.',
  },
  {
    q: 'Bagaimana aplikasi bekerja secara offline?',
    a: 'KASIR DUNIA menyimpan seluruh data produk, riwayat nota penjualan, dan pengaturan toko ke dalam database lokal di memori internal perangkat Android Anda. Aplikasi tidak bergantung pada server luar untuk memproses setiap transaksi penjualan.',
  },
  {
    q: 'Apakah saya perlu internet untuk transaksi harian?',
    a: 'Tidak sama sekali. Transaksi kasir harian Anda tidak membutuhkan koneksi internet. Koneksi internet hanya dibutuhkan saat pertama kali mengunduh file APK dari website atau saat Anda menghubungi admin melalui WhatsApp.',
  },
  {
    q: 'Apakah data tersimpan di HP/perangkat?',
    a: 'Ya, semua data usaha Anda (daftar produk, harga, stok, dan riwayat transaksi) tersimpan 100% di penyimpanan internal smartphone Android yang Anda gunakan.',
  },
  {
    q: 'Apakah data otomatis tersinkron ke perangkat lain?',
    a: 'Tidak. Karena KASIR DUNIA mengusung prinsip offline mandiri tanpa server cloud terpusat, tidak ada sinkronisasi otomatis antar-perangkat. Jika Anda ingin memindahkan data ke smartphone Android lain, Anda dapat menggunakan fitur Backup lokal lalu memulihkan (Restore) file tersebut di perangkat yang baru.',
  },
  {
    q: 'Bagaimana cara menginstal file APK KASIR DUNIA?',
    a: 'Setelah mengunduh file KASIR-DUNIA.apk dari website ini, buka file tersebut melalui File Manager di HP Anda. Jika muncul peringatan izin instalasi aplikasi dari sumber tak dikenal (unknown sources), aktifkan tombol izin di menu Setelan Android Anda, kemudian lanjutkan pemasangan.',
  },
  {
    q: 'Bagaimana cara menghubungkan printer struk kasir?',
    a: 'Nyalakan printer thermal mini Anda, aktifkan Bluetooth di HP, pasangkan (pair) printer Bluetooth tersebut melalui setelan HP Android, lalu buka menu Pengaturan Printer di dalam aplikasi KASIR DUNIA dan pilih printer Anda untuk melakukan tes cetak struk.',
  },
  {
    q: 'Bagaimana cara melakukan backup dan restore database?',
    a: 'Buka menu Pengaturan di aplikasi, lalu pilih menu "Cadangkan Data (Backup)". Aplikasi akan menghasilkan file salinan database di penyimpanan ponsel Anda. Untuk memulihkan, pilih menu "Pulihkan Data (Restore)" dan pilih file cadangan Anda.',
  },
  {
    q: 'Bagaimana cara membeli akses selamanya?',
    a: `Cukup isi formulir pemesanan di website ini seharga ${PRICE_FORMATTED}, kirimkan pesanan melalui tombol WhatsApp, lakukan pembayaran via QRIS, lalu kirimkan screenshot bukti transfer Anda ke WhatsApp Admin ${ADMIN_WA_RAW}.`,
  },
  {
    q: 'Bagaimana cara membayar dengan QRIS?',
    a: `Buka aplikasi perbankan (BCA, Mandiri, BRI, BNI, dll) atau e-wallet (GoPay, OVO, Dana, ShopeePay, LinkAja) di HP Anda, pilih menu Scan QRIS, pindai QRIS asli milik penjual, pastikan nama merchant sesuai dan nominal adalah ${PRICE_FORMATTED}, lalu selesaikan pembayaran.`,
  },
  {
    q: 'Apa yang harus dilakukan setelah menyelesaikan pembayaran?',
    a: `Setelah pembayaran sukses, Anda WAJIB mengambil tangkapan layar (screenshot) bukti pembayaran di aplikasi perbankan/e-wallet Anda, lalu kirimkan bukti tersebut secara manual ke WhatsApp Admin ${ADMIN_WA_RAW}. Admin akan memeriksa pembayaran Anda secara manual sebelum memberikan akses dan pengiriman aplikasi.`,
  },
  {
    q: 'Apakah pembayaran diverifikasi secara otomatis?',
    a: 'Tidak. Website ini tidak menggunakan sistem verifikasi otomatis atau webhook pihak ketiga. Semua verifikasi pembayaran diproses secara teliti dan manual oleh Admin KASIR DUNIA demi keamanan dan kenyamanan transaksi.',
  },
  {
    q: 'Apakah KASIR DUNIA bisa diunduh secara gratis?',
    a: `Tidak. KASIR DUNIA adalah aplikasi berbayar seharga ${PRICE_FORMATTED} sekali bayar untuk akses selamanya (tanpa biaya langganan). Tidak ada link download publik gratis di website. File aplikasi hanya didistribusikan secara resmi melalui WhatsApp: Admin akan mengirimkan link download khusus ke nomor WhatsApp pembeli setelah pesanan dan bukti pembayaran diverifikasi.`,
  },
  {
    q: 'Bagaimana cara mendapatkan link download khusus?',
    a: `Setelah Anda menyelesaikan transfer QRIS Rp28.500 dan mengirimkan screenshot bukti pembayaran secara manual ke WhatsApp Admin di ${ADMIN_WA_RAW}, Admin akan memvalidasi bukti Anda lalu mengirimkan link download khusus resmi untuk mengunduh file APK langsung ke HP Android Anda.`,
  },
  {
    q: 'Bagaimana cara menghubungi layanan dukungan (support)?',
    a: `Layanan dukungan resmi KASIR DUNIA dapat dihubungi melalui WhatsApp: ${ADMIN_WA_RAW} atau email: kasirdunia.asia@gmail.com. Kami siap membantu pertanyaan teknis maupun pemesanan Anda.`,
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faq" className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-semibold text-amber-700 tracking-wider uppercase mb-1">
            Tanya Jawab Lengkap
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Pertanyaan yang Sering Diajukan (FAQ)
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            Jawaban transparan dan faktual seputar cara kerja offline, pembayaran, dan instalasi KASIR DUNIA.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 transition-colors focus-visible:outline-2 focus-visible:outline-amber-600"
                >
                  <span className="text-sm sm:text-base font-bold text-slate-900 pr-4 flex items-start gap-2.5">
                    <HelpCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>{faq.q}</span>
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-amber-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
