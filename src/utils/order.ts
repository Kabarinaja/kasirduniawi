export interface OrderData {
  nama: string;
  nomorWhatsapp: string;
  email: string;
  kota: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<keyof OrderData, string>;
}

export const ADMIN_WA_RAW = '082379474173';
export const ADMIN_WA_INTL = '6282379474173';
export const PRICE_AMOUNT = 28500;
export const PRICE_FORMATTED = 'Rp28.500';

export function formatRupiah(amount: number): string {
  return 'Rp' + amount.toLocaleString('id-ID');
}

export function validateOrderInput(data: Partial<OrderData>): ValidationResult {
  const errors: Record<keyof OrderData, string> = {
    nama: '',
    nomorWhatsapp: '',
    email: '',
    kota: '',
  };

  const trimmedNama = (data.nama || '').trim();
  if (!trimmedNama) {
    errors.nama = 'Nama lengkap wajib diisi.';
  } else if (trimmedNama.length < 2) {
    errors.nama = 'Nama terlalu pendek (minimal 2 karakter).';
  }

  const rawPhone = (data.nomorWhatsapp || '').trim().replace(/[^0-9+]/g, '');
  if (!rawPhone) {
    errors.nomorWhatsapp = 'Nomor WhatsApp wajib diisi.';
  } else if (rawPhone.length < 9 || rawPhone.length > 16) {
    errors.nomorWhatsapp = 'Nomor WhatsApp tidak valid (antara 9 hingga 16 digit).';
  }

  const trimmedEmail = (data.email || '').trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!trimmedEmail) {
    errors.email = 'Alamat email wajib diisi.';
  } else if (!emailRegex.test(trimmedEmail)) {
    errors.email = 'Format alamat email tidak valid.';
  }

  const trimmedKota = (data.kota || '').trim();
  if (!trimmedKota) {
    errors.kota = 'Kabupaten/Kota domisili usaha wajib diisi.';
  } else if (trimmedKota.length < 2) {
    errors.kota = 'Nama Kabupaten/Kota terlalu pendek.';
  }

  const isValid = !errors.nama && !errors.nomorWhatsapp && !errors.email && !errors.kota;

  return { isValid, errors };
}

export function generateWhatsAppOrderUrl(data: OrderData): string {
  const message = `Halo Admin KASIR DUNIA, saya ingin memesan akses KASIR DUNIA seharga Rp28.500 untuk akses selamanya.

Nama: ${data.nama.trim()}
Nomor WhatsApp: ${data.nomorWhatsapp.trim()}
Email: ${data.email.trim()}
Kabupaten/Kota: ${data.kota.trim()}

Mohon petunjuk pembayaran dan proses aktivasi/pengiriman aplikasi. Terima kasih.`;

  return `https://wa.me/${ADMIN_WA_INTL}?text=${encodeURIComponent(message)}`;
}

export function generatePaymentProofWhatsAppUrl(buyerName?: string): string {
  const namaText = buyerName && buyerName.trim() ? buyerName.trim() : '-';
  const message = `Halo Admin KASIR DUNIA, saya telah menyelesaikan pembayaran sebesar Rp28.500 untuk akses selamanya KASIR DUNIA.

Nama Pemesan: ${namaText}
Nominal: Rp28.500

Berikut saya lampirkan tangkapan layar (screenshot) bukti pembayaran saya secara manual. Mohon diperiksa dan dikonfirmasi. Terima kasih.`;

  return `https://wa.me/${ADMIN_WA_INTL}?text=${encodeURIComponent(message)}`;
}
