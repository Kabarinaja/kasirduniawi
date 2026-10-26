import { WifiOff, Database, Receipt, Printer, BarChart3, ShieldCheck, DollarSign, Smartphone } from 'lucide-react';

const FEATURES = [
  {
    icon: WifiOff,
    title: '100% Offline Tanpa Ketergantungan Internet',
    desc: 'Kasir tetap dapat mencatat penjualan kapan pun di lokasi mana pun, tanpa takut sinyal lemot, kuota habis, atau server pusat down.',
  },
  {
    icon: DollarSign,
    title: 'Satu Kali Pembayaran Rp28.500',
    desc: 'Bebas biaya langganan bulanan atau tahunan. Akses selamanya sesuai syarat dan ketentuan lisensi yang ditetapkan oleh penjual.',
  },
  {
    icon: Database,
    title: 'Katalog Produk & Kontrol Stok Lokal',
    desc: 'Tambah barang, atur harga jual, masukkan harga modal, dan pantau ketersediaan stok produk langsung di penyimpanan ponsel Android Anda.',
  },
  {
    icon: Receipt,
    title: 'Hitung Total & Kembalian Kasir Cepat',
    desc: 'Proses pembayaran tunai dan non-tunai dengan kalkulasi kembalian otomatis untuk mempercepat antrean pembeli di toko fisik Anda.',
  },
  {
    icon: Printer,
    title: 'Cetak Struk ke Printer Thermal 58mm / 80mm',
    desc: 'Dukungan pencetakan nota kasir melalui koneksi Bluetooth maupun kabel USB OTG printer thermal portabel yang didukung perangkat.',
  },
  {
    icon: BarChart3,
    title: 'Rekap Laporan Omset & Penjualan Harian',
    desc: 'Cek rangkuman laba kotor, total pendapatan, dan riwayat transaksi usaha harian Anda tanpa perlu menyewa dashboard cloud.',
  },
  {
    icon: ShieldCheck,
    title: 'Backup & Restore Database Mandiri',
    desc: 'Data transaksi sepenuhnya tersimpan di memori perangkat Anda. Anda dapat mengekspor cadangan database secara manual kapan saja.',
  },
  {
    icon: Smartphone,
    title: 'Ringan & Praktis di Berbagai HP Android',
    desc: 'Instalasi file APK langsung ke ponsel Android kasir Anda dengan konsumsi memori dan baterai yang efisien.',
  },
];

export default function Features() {
  return (
    <section id="fitur" className="py-16 md:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs font-semibold text-amber-700 tracking-wider uppercase mb-1">
            Keunggulan Aplikasi
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
            Fitur Praktis untuk Kelancaran Kasir Usaha Anda
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            KASIR DUNIA dirancang secara realistis untuk kebutuhan nyata warung, toko kelontong, retail kecil, dan UMKM yang menginginkan aplikasi kasir mandiri tanpa keterikatan biaya langganan.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-slate-50/70 rounded-2xl p-6 border border-slate-200/90 hover:border-amber-400 hover:bg-white hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-amber-100/80 text-amber-700 flex items-center justify-center mb-5 shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 tracking-tight mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
