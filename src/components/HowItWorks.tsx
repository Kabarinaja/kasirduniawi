import { ClipboardEdit, QrCode, Link as LinkIcon, Store } from 'lucide-react';

const STEPS = [
  {
    step: '01',
    icon: ClipboardEdit,
    title: 'Isi Formulir & Hubungi Admin WhatsApp',
    desc: 'Lengkapi formulir pemesanan dengan nama, nomor WhatsApp, email, dan kota Anda, lalu tekan tombol untuk membuka percakapan WhatsApp resmi.',
  },
  {
    step: '02',
    icon: QrCode,
    title: 'Pindai QRIS Rp28.500 & Kirim Bukti Manual',
    desc: 'Pindai QRIS resmi dengan nominal Rp28.500, simpan screenshot bukti pembayaran, lalu kirimkan secara manual ke chat WhatsApp Admin resmi 082379474173.',
  },
  {
    step: '03',
    icon: LinkIcon,
    title: 'Admin Mengirimkan Link Download Khusus',
    desc: 'Karena aplikasi ini berbayar (bukan gratis), Admin akan memverifikasi bukti Anda secara manual dan mengirimkan link download khusus resmi langsung ke WhatsApp Anda.',
  },
  {
    step: '04',
    icon: Store,
    title: 'Unduh Lewat Link Khusus & Pasang di HP',
    desc: 'Buka link download khusus yang diberikan Admin, pasang aplikasi KASIR DUNIA di HP Android Anda, dan mulai kasir offline sepuasnya tanpa biaya langganan.',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-16 md:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-semibold text-amber-700 tracking-wider uppercase mb-1">
            Alur Pemesanan
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Cara Mendapatkan Akses KASIR DUNIA
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            Empat langkah sederhana untuk memiliki aplikasi kasir offline selamanya dengan harga terjangkau Rp28.500.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="relative bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-amber-700 font-mono tracking-wider">
                      LANGKAH {s.step}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 tracking-tight mb-2">
                    {s.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {s.desc}
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
