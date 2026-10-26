# PANDUAN PENGGUNA RESMI — KASIR DUNIA

Dokumentasi operasional aplikasi kasir Android **KASIR DUNIA**.
Aplikasi ini beroperasi secara mandiri dan offline tanpa server cloud terpusat.

---

## Daftar Isi
1. [Cara Mengunduh File APK](#1-cara-mengunduh-file-apk)
2. [Cara Memasang (Install) APK di Android](#2-cara-memasang-install-apk-di-android)
3. [Membuka Aplikasi & Menyiapkan Informasi Usaha](#3-membuka-aplikasi--menyiapkan-informasi-usaha)
4. [Menambahkan Produk, Kategori, Harga & Stok](#4-menambahkan-produk-kategori-harga--stok)
5. [Melakukan Transaksi Kasir & Checkout Penjualan](#5-melakukan-transaksi-kasir--checkout-penjualan)
6. [Melihat Riwayat Transaksi & Laporan Penjualan](#6-melihat-riwayat-transaksi--laporan-penjualan)
7. [Mengatur Kas / Karyawan (jika tersedia pada versi Anda)](#7-mengatur-kas--karyawan-jika-tersedia-pada-versi-anda)
8. [Menghubungkan Printer Thermal Bluetooth & Tes Cetak](#8-menghubungkan-printer-thermal-bluetooth--tes-cetak)
9. [Cara Membuat Backup & Memulihkan Database (Restore)](#9-cara-membuat-backup--memulihkan-database-restore)
10. [Tips Menjaga Keamanan File Backup & Data Usaha](#10-tips-menjaga-keamanan-file-backup--data-usaha)
11. [Panduan Pemecahan Masalah (Troubleshooting)](#11-panduan-pemecahan-masalah-troubleshooting)

---

### 1. Cara Memperoleh Link Download Khusus & Mengunduh APK
- **KASIR DUNIA adalah aplikasi berbayar (Rp28.500)** dan **bukan aplikasi gratis**. Website resmi tidak menyediakan link unduhan publik gratis.
- Calon pembeli melakukan pemesanan via formulir di website dan melakukan pembayaran Rp28.500 via QRIS resmi.
- Kirimkan tangkapan layar (screenshot) bukti pembayaran secara manual ke WhatsApp Admin resmi di `082379474173`.
- Setelah Admin memvalidasi transaksi Anda secara manual, **Admin akan mengirimkan link download khusus resmi** langsung ke chat WhatsApp Anda.
- Buka link khusus tersebut di browser smartphone Android Anda untuk mengunduh file instalasi APK KASIR DUNIA.
- Jika muncul peringatan keamanan sistem ("File mungkin berbahaya"), pilih opsi **Tetap Unduh** (*Download anyway*) karena file didistribusikan secara mandiri di luar Google Play Store.

### 2. Cara Memasang (Install) APK di Android
- Buka notifikasi unduhan selesai atau buka aplikasi **File Manager** > folder **Download**.
- Ketuk file `KASIR-DUNIA.apk`.
- Jika muncul peringatan sistem Android: *"Demi keamanan, ponsel Anda tidak diizinkan memasang aplikasi yang tidak dikenal dari sumber ini"*:
  1. Ketuk tombol **Setelan** (*Settings*).
  2. Aktifkan sakelar / toggle **Izinkan dari sumber ini** (*Allow from this source*).
  3. Tekan tombol Kembali (*Back*).
  4. Ketuk tombol **Pasang** (*Install*).
  5. Setelah selesai, ketuk **Buka** (*Open*).

### 3. Membuka Aplikasi & Menyiapkan Informasi Usaha
*(jika fitur tersedia pada versi aplikasi Anda)*
- Saat pertama kali membuka KASIR DUNIA, buka menu **Pengaturan** > **Profil Toko**.
- Masukkan Nama Toko / Usaha Anda.
- Masukkan Alamat Usaha dan Nomor Telepon Toko.
- Masukkan catatan kaki (*footer*) struk, misalnya: *"Barang yang sudah dibeli tidak dapat ditukar. Terima kasih atas kunjungan Anda."*
- Simpan perubahan profil toko Anda.

### 4. Menambahkan Produk, Kategori, Harga & Stok
- Masuk ke menu **Daftar Produk** atau **Katalog**.
- Tekan tombol **Tambah Produk (+)**.
- Masukkan nama produk secara jelas.
- Tentukan harga jual ke pelanggan dan harga modal (opsional untuk perhitungan margin).
- Masukkan jumlah stok awal.
- Simpan produk. Produk akan langsung muncul di layar kasir utama.

### 5. Melakukan Transaksi Kasir & Checkout Penjualan
- Pada layar utama kasir, ketuk produk yang dibeli pembeli untuk memasukkannya ke keranjang belanja.
- Sesuaikan jumlah kuantitas jika pembeli membeli lebih dari 1 item.
- Tekan tombol **Bayar** / **Checkout**.
- Pilih metode pembayaran: **Tunai** atau **Non-Tunai**.
- Jika tunai, masukkan nominal uang yang diberikan pembeli. Sistem akan langsung menghitung nominal uang kembalian.
- Tekan **Selesai Transaksi** untuk menyimpan nota ke memori dan mencetak struk belanja.

### 6. Melihat Riwayat Transaksi & Laporan Penjualan
- Masuk ke menu **Riwayat Transaksi** atau **Laporan Penjualan**.
- Anda dapat meninjau total omset penjualan harian, jumlah transaksi, dan barang yang paling sering terjual.
- Anda dapat mencetak ulang struk nota kasir jika pelanggan membutuhkannya.

### 7. Mengatur Kas / Karyawan (jika tersedia pada versi Anda)
- Bila aplikasi Anda menyertakan modul kasir harian: masukkan modal kas awal kasir sebelum toko mulai buka.
- Catat pengeluaran kecil kas toko (*petty cash*) melalui menu Kas Keluar.
- Buat akun kasir dengan PIN unik jika toko Anda memiliki beberapa kasir yang bergantian jam kerja.

### 8. Menghubungkan Printer Thermal Bluetooth & Tes Cetak
- Pastikan printer thermal mini (ukuran kertas 58mm atau 80mm) dalam kondisi menyala (*ON*).
- Masuk ke setelan Bluetooth di ponsel Android Anda, lakukan pencarian perangkat baru, lalu pasangkan (*pair*) dengan printer Anda (PIN umum: `0000` atau `1234`).
- Masuk ke aplikasi KASIR DUNIA > menu **Pengaturan Printer**.
- Pilih printer Bluetooth yang sudah tersambung, pilih format kertas 58mm / 80mm, lalu tekan **Tes Cetak**.
- Printer akan mencetak struk percontohan.

### 9. Cara Membuat Backup & Memulihkan Database (Restore)
- Masuk ke menu **Pengaturan** > **Cadangan Data (Backup)**.
- Tekan **Buat Backup Baru**. File cadangan database akan tersimpan di memori HP Anda.
- Untuk mengembalikan data (misal saat ganti HP Android baru): salin file cadangan ke HP baru, buka KASIR DUNIA di HP baru, pilih **Pulihkan Data (Restore)**, lalu pilih file tersebut.

### 10. Tips Menjaga Keamanan File Backup & Data Usaha
- **Rutin Cadangkan**: Lakukan backup minimal 1 kali seminggu atau di akhir bulan.
- **Simpan di Media Luar**: Salin file backup ke Flashdisk USB OTG atau kirimkan salinannya ke Google Drive pribadi Anda.
- **Hati-hati Bersihkan Penyimpanan**: Jangan menekan "Hapus Data" (*Clear Data*) di setelan aplikasi Android jika belum memiliki file backup terbaru.

### 11. Panduan Pemecahan Masalah (Troubleshooting)
- **Aplikasi gagal terpasang**: Pastikan memori internal HP memiliki sisa ruang kosong minimal 100MB, dan hapus versi eksperimental lama jika ada.
- **Printer tidak mencetak**: Pastikan Bluetooth aktif, printer terhubung ke HP yang benar (tidak sedang dipasangkan ke HP lain), dan baterai printer mencukupi.
- **File APK belum tersedia di website**: Hubungi langsung admin WhatsApp di `082379474173`.
- **Perlu Bantuan Lanjutan**: Hubungi kontak resmi di `082379474173` atau email `kasirdunia.asia@gmail.com`.

---

© 2026 KASIR DUNIA. Hak cipta dilindungi.
