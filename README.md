# KASIR DUNIA — Website Resmi & Panduan Pengelolaan

Selamat datang di repositori website resmi **KASIR DUNIA** (Domain: [https://kasirdunia.asia](https://kasirdunia.asia)).
Website ini dibangun khusus untuk memperkenalkan, memasarkan, dan mendistribusikan aplikasi kasir Android mandiri yang berfokus pada operasional **100% offline** tanpa biaya langganan bulanan.

---

## 1. Identitas Proyek & Konfigurasi Inti

| Atribut | Nilai Resmi |
| :--- | :--- |
| **Nama Aplikasi** | KASIR DUNIA |
| **Domain Resmi** | `https://kasirdunia.asia` |
| **Harga Akses** | **Rp28.500** (Akses Selamanya sesuai ketentuan penjual) |
| **Pembuat** | **Logis Denis Prabowo** |
| **Jabatan** | CEO & Founder |
| **Keterangan** | `[ Prompt Developer ]` |
| **WhatsApp Admin** | `082379474173` (Link: `https://wa.me/6282379474173`) |
| **Email Kontak** | `kasirdunia.asia@gmail.com` |

---

## 2. Struktur Folder & File Penting

```text
/
├── public/
│   ├── assets/
│   │   ├── favicon.png          <- Ikon browser (64x64)
│   │   ├── logo-header.png      <- Logo bilah navigasi header
│   │   ├── logo-aplikasi.png    <- Ikon & logo utama aplikasi (512x512)
│   │   ├── screenshot1.png      <- Tangkapan layar 1: Menu Penjualan Kasir (9:16)
│   │   ├── screenshot2.png      <- Tangkapan layar 2: Manajemen Produk & Stok (9:16)
│   │   ├── screenshot3.png      <- Tangkapan layar 3: Checkout & Pembayaran (9:16)
│   │   ├── screenshot4.png      <- Tangkapan layar 4: Cetak Struk Thermal (9:16)
│   │   ├── screenshot5.png      <- Tangkapan layar 5: Laporan Penjualan Lokal (9:16)
│   │   ├── screenshot6.png      <- Tangkapan layar 6: Pengaturan Toko & Struk (9:16)
│   │   ├── screenshot7.png      <- Tangkapan layar 7: Backup & Restore (9:16)
│   │   ├── qris.png             <- Gambar QRIS resmi (WAJIB diganti sebelum live)
│   │   └── site-config.json     <- Pengaturan flags qrisReady & merchant
│   ├── robots.txt               <- Aturan crawling mesin pencari
│   └── sitemap.xml              <- Peta situs untuk Google Search Console
├── src/
│   ├── components/              <- Komponen UI modular (Hero, Gallery, Form, dll)
│   ├── utils/                   <- Utilitas kalkulasi, validasi form & link WA
│   ├── App.tsx                  <- Komponen induk aplikasi
│   ├── index.css                <- Styling Tailwind CSS
│   └── main.tsx                 <- Entry point React
├── index.html                   <- Template HTML + SEO Meta + JSON-LD Schema
├── PANDUAN-PENGGUNA.md          <- Dokumentasi panduan operasional kasir
└── README.md                    <- Dokumentasi ini
```

---

## 3. Cara Mengganti Gambar Aset dari File Manager Android / PC

Anda **tidak perlu mengedit kode sumber** untuk mengganti logo, 7 screenshot, atau gambar QRIS. Cukup ikuti langkah berikut:

1. Buka folder `public/assets/` melalui File Manager Android atau File Explorer di komputer Anda.
2. Siapkan file gambar baru Anda dengan nama dan format ekstensi yang **persis sama**:
   - `favicon.png` (Ikon persegi, disarankan 64x64 atau 128x128 px)
   - `logo-header.png` (Logo persegi panjang untuk header)
   - `logo-aplikasi.png` (Ikon persegi aplikasi, disarankan 512x512 px)
   - `screenshot1.png` sampai `screenshot7.png` (Format tegak / portrait 9:16, resolusi ideal 720x1280 atau 1080x1920 px)
   - `qris.png` (Gambar QRIS resmi rekening merchant Anda, disarankan 600x600 px)
3. Timpa (overwrite) file yang lama dengan file baru Anda.
4. Buka file `public/assets/site-config.json`, lalu ubah:
   ```json
   "qrisReady": true
   ```
   *(Ini akan menghilangkan peringatan placeholder dan mengaktifkan tampilan pembayaran siap pakai).*
5. Jalankan build ulang atau deploy (lihat langkah 6). Gambar di website akan otomatis berubah.

---

## 4. Sistem Distribusi Aplikasi Berbayar (Link Download Khusus via WhatsApp)

Aplikasi **KASIR DUNIA** adalah aplikasi kasir Android **berbayar (Rp28.500)** dan **BUKAN aplikasi gratis**.
Oleh karena itu, website ini **tidak menyediakan tautan download publik langsung** demi menjaga keamanan lisensi dan eksklusivitas pembeli resmi.

### Alur Distribusi ke Pembeli:
1. Calon pembeli mengisi formulir pemesanan di website dan menekan tombol **"Pesan Sekarang melalui WhatsApp"**.
2. Calon pembeli melakukan transfer pembayaran **Rp28.500** via QRIS resmi.
3. Pembeli mengirimkan screenshot bukti transfer secara manual ke WhatsApp Admin resmi **082379474173**.
4. Admin memverifikasi bukti transaksi secara manual.
5. Setelah dana terkonfirmasi, **Admin mengirimkan link download khusus resmi** (misal link Google Drive/storage cloud privat milik pengembang) langsung ke ruang chat WhatsApp pembeli.
6. Pembeli mengunduh file APK dari link khusus tersebut dan memasangnya di HP Android kasir toko mereka.

---

## 5. Cara Menjalankan & Membangun (Build) Proyek

### Di Komputer / Laptop:
```bash
# Instal dependensi
npm install

# Jalankan server pengembangan lokal (Port 3000)
npm run dev

# Jalankan pengujian unit (unit tests)
npx --yes tsx --test src/utils/order.test.ts

# Lakukan build produksi
npm run build
```
Folder hasil build adalah `dist/`.

---

## 6. Cara Push ke GitHub & Deploy ke Domain kasirdunia.asia

### Langkah A: Push ke Repositori GitHub
```bash
git init
git add .
git commit -m "Inisialisasi website resmi KASIR DUNIA"
git branch -M main
git remote add origin https://github.com/USERNAME-ANDA/kasirdunia-web.git
git push -u origin main
```

### Langkah B: Deploy ke Hosting (Contoh: Vercel / Cloudflare Pages / Static Hosting)
1. Buka [Vercel](https://vercel.com) atau [Cloudflare Pages](https://pages.cloudflare.com).
2. Hubungkan akun GitHub Anda dan pilih repositori `kasirdunia-web`.
3. Framework preset akan terdeteksi sebagai **Vite**.
4. Biarkan pengaturan default (`Build command: npm run build`, `Output directory: dist`).
5. Klik **Deploy**.
6. Pada menu **Domains** di dashboard hosting, tambahkan domain kustom Anda: `kasirdunia.asia`.
7. Atur DNS pada penyedia domain Anda (CNAME / A Record) sesuai petunjuk hosting.

---

## 7. Mendaftarkan ke Google Search Console (SEO)

1. Buka [Google Search Console](https://search.google.com/search-console).
2. Masukkan URL domain Anda: `https://kasirdunia.asia/`.
3. Verifikasi kepemilikan domain menggunakan TXT record DNS atau tag HTML.
4. Masuk ke menu **Sitemaps**, lalu masukkan:
   `https://kasirdunia.asia/sitemap.xml`
5. Tekan **Submit**. Google Bot akan mengindeks halaman beranda, panduan, dan FAQ.

---

## 8. Checklist Wajib Sebelum Menerima Pembayaran Nyata (Go-Live)

Sebelum website disebarluaskan dan menerima transaksi:

- [ ] **Ganti `qris.png`**: Pastikan gambar placeholder telah ditimpa dengan kode QRIS resmi milik merchant KASIR DUNIA.
- [ ] **Ubah `qrisReady: true`**: Pastikan status di `public/assets/site-config.json` sudah diubah ke `true`.
- [ ] **Uji Scan QRIS**: Coba pindai QRIS dengan nominal Rp28.500 untuk memverifikasi nama merchant benar.
- [ ] **Siapkan Link Download Khusus**: Siapkan tautan download cloud resmi yang siap dikirimkan Admin ke chat WhatsApp pembeli setelah pembayaran terkonfirmasi.
- [ ] **Ganti 7 Screenshot**: Timpa `screenshot1.png` sampai `screenshot7.png` dengan tangkapan layar asli aplikasi KASIR DUNIA.
- [ ] **Ganti Logo**: Timpa `favicon.png`, `logo-header.png`, dan `logo-aplikasi.png` dengan logo asli Anda.
- [ ] **Uji Tombol WhatsApp**: Klik tombol "Pesan Sekarang" dan pastikan membuka chat ke `082379474173` dengan pesan terformat.
- [ ] **Uji Tombol Salin**: Pastikan tombol "Salin nominal Rp28.500" menyalin angka `28500` ke clipboard ponsel Anda.
- [ ] **Cek Tampilan Mobile**: Buka website dari smartphone untuk memastikan teks mudah dibaca dan tombol mudah ditekan.

---

© 2026 KASIR DUNIA. Hak cipta dilindungi.
