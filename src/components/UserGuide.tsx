import { useState } from 'react';
import {
  BookOpen,
  ChevronDown,
  Download,
  Settings,
  Package,
  ShoppingCart,
  FileText,
  Users,
  Printer,
  HardDriveDownload,
  ShieldCheck,
  HelpCircle,
} from 'lucide-react';

interface GuideItem {
  id: number;
  icon: typeof Download;
  title: string;
  badge?: string;
  content: {
    summary: string;
    steps: string[];
    note?: string;
  };
}

const GUIDE_ITEMS: GuideItem[] = [
  {
    id: 1,
    icon: Download,
    title: '1. Cara Memperoleh Link Download Khusus & Mengunduh APK',
    content: {
      summary: 'KASIR DUNIA adalah aplikasi berbayar. Link unduhan khusus dikirimkan oleh Admin resmi melalui WhatsApp setelah pembayaran diverifikasi.',
      steps: [
        'Lakukan pemesanan melalui formulir pemesanan di website ini atau hubungi WhatsApp Admin resmi 082379474173.',
        'Selesaikan pembayaran Rp28.500 melalui QRIS resmi, kemudian kirimkan screenshot bukti transfer secara manual ke WhatsApp Admin.',
        'Setelah Admin memverifikasi bukti pembayaran Anda, Admin akan mengirimkan link download khusus resmi langsung ke nomor WhatsApp Anda.',
        'Buka link download khusus tersebut di browser smartphone Android Anda untuk mengunduh file instalasi APK KASIR DUNIA.',
        'Jika muncul notifikasi "File mungkin berbahaya", pilih opsi "Tetap Unduh" (Download anyway) karena file didistribusikan secara mandiri di luar Google Play Store.',
      ],
      note: 'Aplikasi ini adalah produk berbayar dan tidak menyediakan unduhan gratis terbuka di situs publik demi menjaga lisensi resmi pembeli.',
    },
  },
  {
    id: 2,
    icon: Settings,
    title: '2. Cara Memasang (Install) APK di Android',
    content: {
      summary: 'Mengaktifkan izin pemasangan dari sumber yang digunakan di pengaturan Android.',
      steps: [
        'Buka folder "Download" pada File Manager atau notifikasi unduhan selesai di HP Android Anda.',
        'Ketuk file "KASIR-DUNIA.apk".',
        'Jika sistem Android menampilkan pesan keamanan "Demi keamanan, ponsel Anda tidak diizinkan memasang aplikasi yang tidak dikenal dari sumber ini", ketuk opsi "Setelan" (Settings).',
        'Aktifkan tombol toggle "Izinkan dari sumber ini" (Allow from this source) untuk browser atau File Manager yang Anda gunakan.',
        'Tekan tombol kembali (Back), lalu ketuk "Pasang" (Install) dan tunggu proses pemasangan hingga selesai.',
      ],
      note: 'KASIR DUNIA tidak memerlukan akses root dan beroperasi tanpa akun Google khusus.',
    },
  },
  {
    id: 3,
    icon: Settings,
    title: '3. Membuka Aplikasi & Menyiapkan Informasi Usaha',
    badge: 'jika tersedia pada versi aplikasi Anda',
    content: {
      summary: 'Menyesuaikan identitas toko agar tercetak rapi pada struk belanja pelanggan.',
      steps: [
        'Buka ikon aplikasi "KASIR DUNIA" di layar utama ponsel Anda.',
        'Masuk ke menu "Pengaturan" atau "Profil Toko" (jika tersedia pada versi aplikasi Anda).',
        'Isi nama toko, alamat tempat usaha, nomor telepon kontak, serta catatan footer struk (misal: "Terima kasih atas kunjungan Anda").',
        'Simpan pengaturan toko Anda.',
      ],
    },
  },
  {
    id: 4,
    icon: Package,
    title: '4. Menambahkan Produk, Kategori, Harga & Stok',
    content: {
      summary: 'Mengisi katalog barang dagangan ke database internal smartphone Anda.',
      steps: [
        'Masuk ke menu "Kelola Produk" atau "Daftar Barang".',
        'Ketuk tombol "Tambah Produk Baru" (+).',
        'Ketikkan nama barang secara jelas (contoh: "Beras 5kg", "Kopi Susu 250ml").',
        'Masukkan harga jual ke pembeli, dan harga beli/modal (opsional untuk kalkulasi laba kotor).',
        'Masukkan jumlah stok awal barang, lalu simpan.',
      ],
      note: 'Semua data produk disimpan secara offline di perangkat, sehingga penambahan atau pengubahan barang tidak memerlukan kuota data.',
    },
  },
  {
    id: 5,
    icon: ShoppingCart,
    title: '5. Melakukan Transaksi Kasir & Checkout Penjualan',
    content: {
      summary: 'Melayani penjualan kasir harian kepada pelanggan toko.',
      steps: [
        'Pada halaman kasir utama, ketuk produk yang dibeli pelanggan atau gunakan fitur pencarian untuk menambahkan barang ke keranjang.',
        'Atur jumlah (kuantitas) barang jika pelanggan membeli lebih dari satu.',
        'Periksa subtotal keranjang belanja, lalu tekan tombol "Bayar" / "Checkout".',
        'Pilih metode pembayaran (Tunai atau Non-Tunai).',
        'Jika pembayaran tunai, masukkan jumlah uang yang diserahkan pelanggan. Aplikasi akan menghitung uang kembalian secara otomatis.',
        'Tekan "Selesai" untuk menyelesaikan transaksi dan mencetak struk.',
      ],
    },
  },
  {
    id: 6,
    icon: FileText,
    title: '6. Melihat Riwayat Transaksi & Laporan Penjualan',
    content: {
      summary: 'Memantau omset dan rekap pendapatan harian usaha.',
      steps: [
        'Buka menu "Riwayat Penjualan" atau "Laporan".',
        'Pilih rentang tanggal (Hari Ini, 7 Hari Terakhir, Bulan Ini, atau Kustom) jika opsi filter tersedia.',
        'Lihat ringkasan total omset, jumlah struk yang diterbitkan, dan estimasi laba kotor.',
        'Ketuk pada salah satu nomor nota transaksi untuk melihat rincian produk yang terjual atau cetak ulang struk.',
      ],
    },
  },
  {
    id: 7,
    icon: Users,
    title: '7. Mengatur Kas / Karyawan',
    badge: 'jika tersedia pada versi aplikasi Anda',
    content: {
      summary: 'Pencatatan kas masuk/keluar atau hak akses kasir jika fitur disertakan pada pembaruan aplikasi.',
      steps: [
        'Jika versi aplikasi Anda mendukung manajemen kas: masukkan modal awal kasir saat buka toko di pagi hari.',
        'Catat pengeluaran operasional toko kecil (misal: beli es batu, bayar sampah) melalui menu Kas Keluar.',
        'Jika terdapat fitur akun kasir: atur PIN atau nama kasir yang bertugas.',
      ],
      note: 'Ketersediaan fitur karyawan dan kas lanjutan disesuaikan dengan rilis build aplikasi Anda.',
    },
  },
  {
    id: 8,
    icon: Printer,
    title: '8. Menghubungkan Printer Thermal & Tes Cetak',
    content: {
      summary: 'Koneksi ke printer nota mini Bluetooth ukuran 58mm atau 80mm.',
      steps: [
        'Nyalakan printer thermal Bluetooth Anda dan pastikan kertas struk terpasang dengan benar.',
        'Buka menu Bluetooth pada pengaturan HP Android Anda, cari nama printer thermal (contoh: "MPT-II", "RPP02N", "Bluetooth Printer"), lalu lakukan pairing (PIN default biasanya 0000 atau 1234).',
        'Buka aplikasi KASIR DUNIA, masuk ke menu "Pengaturan Printer".',
        'Pilih nama printer Bluetooth yang sudah dipasangkan dan tentukan lebar kertas (58mm atau 80mm).',
        'Tekan tombol "Tes Cetak Struk" untuk memastikan printer dapat mencetak nota dengan jelas.',
      ],
    },
  },
  {
    id: 9,
    icon: HardDriveDownload,
    title: '9. Cara Backup & Restore Database Lokal',
    content: {
      summary: 'Menyimpan salinan keamanan data toko ke penyimpanan internal HP.',
      steps: [
        'Masuk ke menu "Pengaturan" > "Cadangan Data (Backup)".',
        'Tekan tombol "Buat Cadangan Baru" (Backup Data).',
        'Aplikasi akan membuat file cadangan (misalnya berformat .db / .json / .bak) di folder dokumen atau penyimpanan internal ponsel Anda.',
        'Untuk memulihkan data (misal saat ganti smartphone Android baru): pasang aplikasi KASIR DUNIA di ponsel baru, salin file backup tadi ke HP baru, lalu pilih "Pulihkan Data (Restore)" dan pilih file cadangan Anda.',
      ],
      note: 'Karena tidak ada sinkronisasi cloud otomatis, backup berkala sangat disarankan minimal satu minggu sekali.',
    },
  },
  {
    id: 10,
    icon: ShieldCheck,
    title: '10. Tips Menjaga Keamanan File Backup & Data Usaha',
    content: {
      summary: 'Praktik terbaik agar data transaksi toko Anda tidak hilang.',
      steps: [
        'Setelah membuat file backup di HP, salin file cadangan tersebut ke media lain: seperti flashdisk OTG, kartu memori SD Card, atau kirim salinannya ke Google Drive / WhatsApp Anda sendiri.',
        'Hindari menekan tombol "Hapus Data Aplikasi" (Clear Data) pada menu pengaturan sistem Android kecuali Anda sudah memiliki backup terbaru.',
        'Lakukan backup data terutama saat akhir bulan atau sebelum melakukan pembaruan versi Android pada smartphone Anda.',
      ],
    },
  },
  {
    id: 11,
    icon: HelpCircle,
    title: '11. Panduan Pemecahan Masalah (Troubleshooting Dasar)',
    content: {
      summary: 'Solusi untuk kendala umum saat instalasi dan operasional kasir.',
      steps: [
        'Kendala: "APK tidak dapat dipasang" (App not installed) -> Pastikan ruang penyimpanan internal HP Anda masih cukup minimal 100MB, dan hapus versi lama aplikasi jika sebelumnya ada versi eksperimental yang berbeda signature-nya.',
        'Kendala: "Aplikasi tidak mau terbuka atau tertutup sendiri" -> Mulai ulang (restart) ponsel Anda, dan pastikan Android Anda memenuhi syarat minimum (Android 7.0 ke atas disarankan).',
        'Kendala: "Printer Bluetooth tidak terdeteksi" -> Matikan Bluetooth HP lalu nyalakan kembali, pastikan printer tidak sedang terhubung ke perangkat HP lain, dan cek baterai printer.',
        'Kendala: "File APK belum tersedia di website" -> Hubungi admin via WhatsApp di 082379474173 untuk meminta file APK rilis final secara langsung.',
        'Kendala: "Data kasir belum pulih saat restore" -> Pastikan Anda memilih file backup yang tepat dan tidak mengubah ekstensi file cadangan tersebut.',
      ],
      note: 'Untuk bantuan teknis lebih lanjut, kirim pesan ke WhatsApp Admin: 082379474173.',
    },
  },
];

export default function UserGuide() {
  const [openId, setOpenId] = useState<number | null>(1); // open first by default

  const toggleOpen = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="panduan" className="py-16 md:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-xs font-semibold text-amber-700 tracking-wider uppercase mb-1">
            Buku Petunjuk Resmi
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Panduan Penggunaan KASIR DUNIA
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            Dokumentasi lengkap mulai dari unduhan APK, penyiapan produk, operasional kasir, koneksi printer thermal, hingga tips backup data.
          </p>
        </div>

        {/* 11 Topics Accordion */}
        <div className="max-w-4xl mx-auto space-y-3.5">
          {GUIDE_ITEMS.map((item) => {
            const isOpen = openId === item.id;
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                className="bg-slate-50/70 border border-slate-200 rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleOpen(item.id)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-100/60 transition-colors focus-visible:outline-2 focus-visible:outline-amber-600"
                >
                  <div className="flex items-center gap-3.5 pr-4">
                    <div className="w-9 h-9 rounded-xl bg-amber-100/70 text-amber-700 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm sm:text-base font-bold text-slate-900">
                          {item.title}
                        </span>
                        {item.badge && (
                          <span className="text-[11px] font-medium text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded-sm">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                        {item.content.summary}
                      </p>
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-amber-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-sm text-slate-700 border-t border-slate-200/60 bg-white">
                    <p className="text-xs sm:text-sm text-slate-600 mb-3 italic">
                      {item.content.summary}
                    </p>

                    <ol className="space-y-2.5 list-decimal list-inside text-xs sm:text-sm text-slate-700 leading-relaxed">
                      {item.content.steps.map((step, idx) => (
                        <li key={idx} className="pl-1">
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>

                    {item.content.note && (
                      <div className="mt-4 p-3 bg-amber-50/80 rounded-xl border border-amber-200/70 text-xs text-amber-900 leading-relaxed">
                        <strong>Perhatian:</strong> {item.content.note}
                      </div>
                    )}
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
