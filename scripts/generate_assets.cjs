const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// CRC32 implementation for PNG chunks
const crcTable = [];
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    if (c & 1) {
      c = 0xedb88320 ^ (c >>> 1);
    } else {
      c = c >>> 1;
    }
  }
  crcTable[n] = c;
}

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  }
  return (c ^ 0xffffffff) >>> 0;
}

function makeChunk(type, data) {
  const len = data.length;
  const buf = Buffer.alloc(8 + len + 4);
  buf.writeUInt32BE(len, 0);
  buf.write(type, 4, 4, 'ascii');
  data.copy(buf, 8);
  const typeAndData = buf.subarray(4, 8 + len);
  const crc = crc32(typeAndData);
  buf.writeUInt32BE(crc, 8 + len);
  return buf;
}

function createPng(width, height, getPixel) {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // color type RGBA
  ihdr[10] = 0; // compression
  ihdr[11] = 0; // filter
  ihdr[12] = 0; // interlace
  const ihdrChunk = makeChunk('IHDR', ihdr);

  // Scanlines with filter byte 0
  const rawData = Buffer.alloc(height * (1 + width * 4));
  let offset = 0;
  for (let y = 0; y < height; y++) {
    rawData[offset++] = 0; // filter None
    for (let x = 0; x < width; x++) {
      const [r, g, b, a] = getPixel(x, y, width, height);
      rawData[offset++] = r;
      rawData[offset++] = g;
      rawData[offset++] = b;
      rawData[offset++] = a;
    }
  }

  const compressed = zlib.deflateSync(rawData);
  const idatChunk = makeChunk('IDAT', compressed);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

// Simple 5x7 bitmap font for rendering crisp labels without external fonts
const FONT = {
  ' ': [0, 0, 0, 0, 0],
  'A': [0x7e, 0x11, 0x11, 0x11, 0x7e],
  'B': [0x7f, 0x49, 0x49, 0x49, 0x36],
  'C': [0x3e, 0x41, 0x41, 0x41, 0x22],
  'D': [0x7f, 0x41, 0x41, 0x22, 0x1c],
  'E': [0x7f, 0x49, 0x49, 0x49, 0x41],
  'F': [0x7f, 0x09, 0x09, 0x09, 0x01],
  'G': [0x3e, 0x41, 0x49, 0x49, 0x7a],
  'H': [0x7f, 0x08, 0x08, 0x08, 0x7f],
  'I': [0x00, 0x41, 0x7f, 0x41, 0x00],
  'J': [0x20, 0x40, 0x41, 0x3f, 0x01],
  'K': [0x7f, 0x08, 0x14, 0x22, 0x41],
  'L': [0x7f, 0x40, 0x40, 0x40, 0x40],
  'M': [0x7f, 0x02, 0x0c, 0x02, 0x7f],
  'N': [0x7f, 0x04, 0x08, 0x10, 0x7f],
  'O': [0x3e, 0x41, 0x41, 0x41, 0x3e],
  'P': [0x7f, 0x09, 0x09, 0x09, 0x06],
  'Q': [0x3e, 0x41, 0x51, 0x21, 0x5e],
  'R': [0x7f, 0x09, 0x19, 0x29, 0x46],
  'S': [0x46, 0x49, 0x49, 0x49, 0x31],
  'T': [0x01, 0x01, 0x7f, 0x01, 0x01],
  'U': [0x3f, 0x40, 0x40, 0x40, 0x3f],
  'V': [0x1f, 0x20, 0x40, 0x20, 0x1f],
  'W': [0x7f, 0x20, 0x18, 0x20, 0x7f],
  'X': [0x63, 0x14, 0x08, 0x14, 0x63],
  'Y': [0x07, 0x08, 0x70, 0x08, 0x07],
  'Z': [0x61, 0x51, 0x49, 0x45, 0x43],
  '0': [0x3e, 0x51, 0x49, 0x45, 0x3e],
  '1': [0x00, 0x42, 0x7f, 0x40, 0x00],
  '2': [0x42, 0x61, 0x51, 0x49, 0x46],
  '3': [0x21, 0x41, 0x45, 0x4b, 0x31],
  '4': [0x18, 0x14, 0x12, 0x7f, 0x10],
  '5': [0x27, 0x45, 0x45, 0x45, 0x39],
  '6': [0x3c, 0x4a, 0x49, 0x49, 0x30],
  '7': [0x01, 0x71, 0x09, 0x05, 0x03],
  '8': [0x36, 0x49, 0x49, 0x49, 0x36],
  '9': [0x06, 0x49, 0x49, 0x29, 0x1e],
  ':': [0x00, 0x36, 0x36, 0x00, 0x00],
  '-': [0x08, 0x08, 0x08, 0x08, 0x08],
  '.': [0x00, 0x60, 0x60, 0x00, 0x00],
  '/': [0x20, 0x10, 0x08, 0x04, 0x02],
  '#': [0x14, 0x7f, 0x14, 0x7f, 0x14],
  '!': [0x00, 0x00, 0x5f, 0x00, 0x00],
  '?': [0x02, 0x01, 0x51, 0x09, 0x06],
  '(': [0x00, 0x3e, 0x41, 0x00, 0x00],
  ')': [0x00, 0x41, 0x3e, 0x00, 0x00],
  '[': [0x00, 0x7f, 0x41, 0x00, 0x00],
  ']': [0x00, 0x41, 0x7f, 0x00, 0x00],
};

class Canvas {
  constructor(width, height, defaultColor = [255, 255, 255, 255]) {
    this.width = width;
    this.height = height;
    this.buffer = Buffer.alloc(width * height * 4);
    for (let i = 0; i < width * height; i++) {
      this.buffer[i * 4 + 0] = defaultColor[0];
      this.buffer[i * 4 + 1] = defaultColor[1];
      this.buffer[i * 4 + 2] = defaultColor[2];
      this.buffer[i * 4 + 3] = defaultColor[3];
    }
  }

  setPixel(x, y, r, g, b, a = 255) {
    if (x < 0 || x >= this.width || y < 0 || y >= this.height) return;
    const idx = (y * this.width + x) * 4;
    if (a === 255) {
      this.buffer[idx + 0] = r;
      this.buffer[idx + 1] = g;
      this.buffer[idx + 2] = b;
      this.buffer[idx + 3] = a;
    } else {
      const srcA = a / 255;
      const dstA = this.buffer[idx + 3] / 255;
      const outA = srcA + dstA * (1 - srcA);
      if (outA > 0) {
        this.buffer[idx + 0] = Math.round((r * srcA + this.buffer[idx + 0] * dstA * (1 - srcA)) / outA);
        this.buffer[idx + 1] = Math.round((g * srcA + this.buffer[idx + 1] * dstA * (1 - srcA)) / outA);
        this.buffer[idx + 2] = Math.round((b * srcA + this.buffer[idx + 2] * dstA * (1 - srcA)) / outA);
        this.buffer[idx + 3] = Math.round(outA * 255);
      }
    }
  }

  fillRect(x, y, w, h, [r, g, b, a = 255]) {
    for (let cy = y; cy < y + h; cy++) {
      for (let cx = x; cx < x + w; cx++) {
        this.setPixel(cx, cy, r, g, b, a);
      }
    }
  }

  strokeRect(x, y, w, h, color, lineWidth = 1) {
    for (let lw = 0; lw < lineWidth; lw++) {
      for (let cx = x + lw; cx < x + w - lw; cx++) {
        this.setPixel(cx, y + lw, ...color);
        this.setPixel(cx, y + h - 1 - lw, ...color);
      }
      for (let cy = y + lw; cy < y + h - lw; cy++) {
        this.setPixel(x + lw, cy, ...color);
        this.setPixel(x + w - 1 - lw, cy, ...color);
      }
    }
  }

  drawText(text, startX, startY, color, scale = 2) {
    const upper = text.toUpperCase();
    let curX = startX;
    for (let i = 0; i < upper.length; i++) {
      const char = upper[i];
      const cols = FONT[char] || FONT['?'];
      for (let c = 0; c < 5; c++) {
        const colVal = cols[c];
        for (let r = 0; r < 7; r++) {
          if ((colVal >> r) & 1) {
            this.fillRect(curX + c * scale, startY + r * scale, scale, scale, color);
          }
        }
      }
      curX += 6 * scale;
    }
  }

  drawTextCentered(text, centerY, color, scale = 2) {
    const textWidth = text.length * 6 * scale;
    const startX = Math.round((this.width - textWidth) / 2);
    this.drawText(text, startX, centerY, color, scale);
  }

  toPng() {
    return createPng(this.width, this.height, (x, y) => {
      const idx = (y * this.width + x) * 4;
      return [
        this.buffer[idx + 0],
        this.buffer[idx + 1],
        this.buffer[idx + 2],
        this.buffer[idx + 3],
      ];
    });
  }
}

const assetsDir = path.resolve(__dirname, '../public/assets');
fs.mkdirSync(assetsDir, { recursive: true });

// 1. favicon.png (64x64)
{
  const c = new Canvas(64, 64, [245, 158, 11, 255]); // Amber-500
  c.strokeRect(2, 2, 60, 60, [217, 119, 6, 255], 2);
  c.fillRect(8, 8, 48, 48, [30, 41, 59, 255]); // Slate-800
  c.drawTextCentered('KD', 22, [245, 158, 11, 255], 3);
  fs.writeFileSync(path.join(assetsDir, 'favicon.png'), c.toPng());
}

// 2. logo-header.png (320x64, transparent-friendly background)
{
  const c = new Canvas(320, 64, [255, 255, 255, 255]);
  // Emblem
  c.fillRect(10, 10, 44, 44, [245, 158, 11, 255]);
  c.fillRect(14, 14, 36, 36, [15, 23, 42, 255]);
  c.drawText('KD', 20, 22, [245, 158, 11, 255], 2);
  // Text
  c.drawText('KASIR DUNIA', 68, 18, [15, 23, 42, 255], 3);
  c.drawText('OFFLINE ANDROID POS', 70, 42, [180, 83, 9, 255], 1);
  fs.writeFileSync(path.join(assetsDir, 'logo-header.png'), c.toPng());
}

// 3. logo-aplikasi.png (512x512)
{
  const c = new Canvas(512, 512, [248, 250, 252, 255]);
  // Soft outer border & container
  c.fillRect(32, 32, 448, 448, [15, 23, 42, 255]); // Slate-900 background
  c.strokeRect(32, 32, 448, 448, [245, 158, 11, 255], 8); // Amber border
  // Cash register graphic elements
  c.fillRect(96, 110, 320, 60, [30, 41, 59, 255]); // screen frame
  c.fillRect(110, 120, 292, 40, [15, 23, 42, 255]); // screen inner
  c.drawTextCentered('RP 28.500', 128, [52, 211, 153, 255], 3); // emerald text

  // Keypad grid
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 4; col++) {
      const bx = 110 + col * 75;
      const by = 195 + row * 45;
      c.fillRect(bx, by, 65, 36, [51, 65, 85, 255]);
    }
  }

  // Large Brand Text
  c.drawTextCentered('KASIR DUNIA', 355, [255, 255, 255, 255], 4);
  c.drawTextCentered('APLIKASI KASIR ANDROID OFFLINE', 415, [245, 158, 11, 255], 2);
  fs.writeFileSync(path.join(assetsDir, 'logo-aplikasi.png'), c.toPng());
}

// 4. screenshot1.png to screenshot7.png (540x960, vertical 9:16)
const screenshotsMeta = [
  {
    num: 1,
    title: 'MENU PENJUALAN KASIR',
    sub: 'TAMPILAN GRID KATALOG & KERANJANG CEPAT',
    accent: [245, 158, 11, 255],
    desc1: 'OPSI SCAN KODE / PILIH PRODUK CEPAT',
    desc2: 'PERHITUNGAN SUB-TOTAL & KEMBALIAN OTOMATIS',
  },
  {
    num: 2,
    title: 'MANAJEMEN PRODUK & STOK',
    sub: 'DAFTAR HARGA MODAL, JUAL & MONITOR STOK',
    accent: [59, 130, 246, 255],
    desc1: 'TAMBAH / EDIT BARANG TANPA KONEKSI INTERNET',
    desc2: 'PERINGATAN STOK MENIPIS SECARA LOKAL',
  },
  {
    num: 3,
    title: 'PROSES CHECKOUT & BAYAR',
    sub: 'DUKUNGAN METODE TUNAI & NON-TUNAI',
    accent: [16, 185, 129, 255],
    desc1: 'INPUT NOMINAL PEMBAYARAN & HITUNG KEMBALIAN',
    desc2: 'STATUS TRANSAKSI TERSIMPAN DI PENYIMPANAN HP',
  },
  {
    num: 4,
    title: 'CETAK STRUK THERMAL',
    sub: 'KONEKSI BLUETOOTH & USB PRINTER 58/80MM',
    accent: [139, 92, 246, 255],
    desc1: 'CETAK STRUK KASIR OTOMATIS SAAT PEMBAYARAN',
    desc2: 'CUSTOM HEADER NAMA TOKO & FOOTER CATATAN',
  },
  {
    num: 5,
    title: 'LAPORAN PENJUALAN LOKAL',
    sub: 'REKAP HARIAN, BULANAN & LABA KOTOR',
    accent: [236, 72, 153, 255],
    desc1: 'PANTAU OMSET PENJUALAN TANPA BIAYA LANGGANAN',
    desc2: 'FILTER TANGGAL TRANSAKSI LENGKAP & CEPAT',
  },
  {
    num: 6,
    title: 'PENGATURAN TOKO & STRUK',
    sub: 'SESUAIKAN NAMA, ALAMAT & PESAN FOOTER',
    accent: [14, 165, 233, 255],
    desc1: 'ATUR PROFIL BISNIS ANDA DALAM HITUNGAN DETIK',
    desc2: 'OPSI PAJAK ATAU DISKON TOKO JIKA DIBUTUHKAN',
  },
  {
    num: 7,
    title: 'BACKUP & RESTORE DATA',
    sub: 'SIMPAN & PULIHKAN DATA KE FILE PENYIMPANAN HP',
    accent: [249, 115, 22, 255],
    desc1: 'DATA USAHA 100% MILIK ANDA DI PERANGKAT ANDA',
    desc2: 'EKSPOR AMAN DAN MUDAH DIPINDAHKAN JIKA GANTI HP',
  },
];

for (const sc of screenshotsMeta) {
  const c = new Canvas(540, 960, [241, 245, 249, 255]); // Slate-100 body

  // Top phone status bar
  c.fillRect(0, 0, 540, 40, [15, 23, 42, 255]);
  c.drawText('12:00 - KASIR DUNIA OFFLINE', 20, 14, [255, 255, 255, 255], 2);

  // App top bar
  c.fillRect(0, 40, 540, 80, [15, 23, 42, 255]);
  c.fillRect(0, 116, 540, 4, sc.accent);
  c.drawText(`KASIR DUNIA`, 30, 60, [255, 255, 255, 255], 3);
  c.drawText(`SCREENSHOT #${sc.num}`, 30, 92, sc.accent, 2);

  // Big Watermark / Notice Box
  c.fillRect(30, 140, 480, 80, [254, 243, 199, 255]); // Amber-100
  c.strokeRect(30, 140, 480, 80, [217, 119, 6, 255], 2);
  c.drawTextCentered(`PLACEHOLDER SCREENSHOT #${sc.num}`, 155, [180, 83, 9, 255], 2);
  c.drawTextCentered(`GANTI DENGAN SCREENSHOT ASLI ANDA`, 180, [15, 23, 42, 255], 2);

  // UI mockup representation
  c.fillRect(30, 240, 480, 450, [255, 255, 255, 255]);
  c.strokeRect(30, 240, 480, 450, [203, 213, 225, 255], 2);

  // Mock header in mockup
  c.fillRect(50, 260, 440, 50, [248, 250, 252, 255]);
  c.drawTextCentered(sc.title, 275, [15, 23, 42, 255], 2);

  // Mock content cards
  for (let i = 0; i < 4; i++) {
    const ypos = 330 + i * 80;
    c.fillRect(50, ypos, 440, 65, [241, 245, 249, 255]);
    c.fillRect(60, ypos + 12, 40, 40, sc.accent);
    c.fillRect(115, ypos + 15, 220, 14, [100, 116, 139, 255]);
    c.fillRect(115, ypos + 38, 140, 12, [148, 163, 184, 255]);
    c.fillRect(400, ypos + 20, 75, 24, [15, 23, 42, 255]);
  }

  // Descriptive text card at bottom
  c.fillRect(30, 710, 480, 180, [15, 23, 42, 255]);
  c.strokeRect(30, 710, 480, 180, sc.accent, 2);
  c.drawTextCentered(sc.title, 730, [255, 255, 255, 255], 2);
  c.drawTextCentered(sc.sub, 760, sc.accent, 2);
  c.drawTextCentered(sc.desc1, 805, [203, 213, 225, 255], 1);
  c.drawTextCentered(sc.desc2, 830, [203, 213, 225, 255], 1);
  c.drawTextCentered(`FILE: PUBLIC/ASSETS/SCREENSHOT${sc.num}.PNG`, 860, [148, 163, 184, 255], 1);

  // Bottom Android navigation bar
  c.fillRect(0, 920, 540, 40, [15, 23, 42, 255]);
  c.drawTextCentered('|||    O    <', 932, [148, 163, 184, 255], 2);

  fs.writeFileSync(path.join(assetsDir, `screenshot${sc.num}.png`), c.toPng());
}

// 11. qris.png (600x600) - CLEAR WARNING DUMMY AS PER SPECIFICATION
{
  const c = new Canvas(600, 600, [254, 242, 242, 255]); // Light red warning bg
  // Warning stripes border
  c.strokeRect(10, 10, 580, 580, [220, 38, 38, 255], 8); // Red border

  // Header band
  c.fillRect(30, 30, 540, 70, [220, 38, 38, 255]);
  c.drawTextCentered('PERINGATAN RESMI', 45, [255, 255, 255, 255], 3);
  c.drawTextCentered('PLACEHOLDER / CONTOH GAMBAR', 72, [254, 202, 202, 255], 2);

  // Central box
  c.fillRect(50, 130, 500, 320, [255, 255, 255, 255]);
  c.strokeRect(50, 130, 500, 320, [239, 68, 68, 255], 3);

  c.drawTextCentered('GANTI DENGAN QRIS ASLI', 160, [220, 38, 38, 255], 3);
  c.drawTextCentered('DILARANG MELAKUKAN PEMBAYARAN', 205, [15, 23, 42, 255], 2);
  c.drawTextCentered('KE GAMBAR PLACEHOLDER INI', 230, [15, 23, 42, 255], 2);

  c.fillRect(80, 270, 440, 4, [220, 38, 38, 255]);

  c.drawTextCentered('LOKASI FILE UNTUK DIGANTI:', 290, [71, 85, 105, 255], 2);
  c.drawTextCentered('PUBLIC/ASSETS/QRIS.PNG', 320, [15, 23, 42, 255], 2);
  c.drawTextCentered('NOMINAL RESMI TRANSAKSI: RP 28.500', 355, [180, 83, 9, 255], 2);
  c.drawTextCentered('KONFIRMASI KE WA: 082379474173', 385, [15, 23, 42, 255], 2);

  // Footer instructions
  c.fillRect(30, 480, 540, 90, [15, 23, 42, 255]);
  c.drawTextCentered('SETELAH MEMASANG QRIS ASLI, UBAH', 498, [255, 255, 255, 255], 2);
  c.drawTextCentered('QRISREADY MENJADI TRUE DI SITE-CONFIG.JSON', 525, [250, 204, 21, 255], 2);
  c.drawTextCentered('KASIR DUNIA - AKSES SELAMANYA', 550, [148, 163, 184, 255], 1);

  fs.writeFileSync(path.join(assetsDir, 'qris.png'), c.toPng());
}

console.log('All 11 local PNG assets generated successfully!');
