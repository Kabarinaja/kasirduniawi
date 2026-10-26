import test from 'node:test';
import assert from 'node:assert/strict';
import {
  formatRupiah,
  validateOrderInput,
  generateWhatsAppOrderUrl,
  generatePaymentProofWhatsAppUrl,
  ADMIN_WA_RAW,
  ADMIN_WA_INTL,
  PRICE_AMOUNT,
  PRICE_FORMATTED,
} from './order.ts';

test('constants match exact project identity specifications', () => {
  assert.equal(ADMIN_WA_RAW, '082379474173');
  assert.equal(ADMIN_WA_INTL, '6282379474173');
  assert.equal(PRICE_AMOUNT, 28500);
  assert.equal(PRICE_FORMATTED, 'Rp28.500');
});

test('formatRupiah formats 28500 properly', () => {
  const result = formatRupiah(28500);
  assert.equal(result, 'Rp28.500');
});

test('validateOrderInput validates empty inputs', () => {
  const result = validateOrderInput({});
  assert.equal(result.isValid, false);
  assert.ok(result.errors.nama.length > 0);
  assert.ok(result.errors.nomorWhatsapp.length > 0);
  assert.ok(result.errors.email.length > 0);
  assert.ok(result.errors.kota.length > 0);
});

test('validateOrderInput detects invalid email and short phone', () => {
  const result = validateOrderInput({
    nama: 'Budi Santoso',
    nomorWhatsapp: '123',
    email: 'not-an-email',
    kota: 'Surabaya',
  });
  assert.equal(result.isValid, false);
  assert.equal(result.errors.nama, '');
  assert.ok(result.errors.nomorWhatsapp.includes('tidak valid'));
  assert.ok(result.errors.email.includes('tidak valid'));
  assert.equal(result.errors.kota, '');
});

test('validateOrderInput succeeds on valid data', () => {
  const result = validateOrderInput({
    nama: 'Ahmad Dahlan',
    nomorWhatsapp: '081234567890',
    email: 'ahmad@example.com',
    kota: 'Yogyakarta',
  });
  assert.equal(result.isValid, true);
  assert.equal(result.errors.nama, '');
  assert.equal(result.errors.nomorWhatsapp, '');
  assert.equal(result.errors.email, '');
  assert.equal(result.errors.kota, '');
});

test('generateWhatsAppOrderUrl creates correct link with required text format', () => {
  const url = generateWhatsAppOrderUrl({
    nama: 'Siti Rahma',
    nomorWhatsapp: '085712345678',
    email: 'siti@warung.com',
    kota: 'Bandung',
  });

  assert.ok(url.startsWith('https://wa.me/6282379474173?text='));
  const decoded = decodeURIComponent(url.replace('https://wa.me/6282379474173?text=', ''));
  assert.ok(decoded.includes('Halo Admin KASIR DUNIA, saya ingin memesan akses KASIR DUNIA seharga Rp28.500 untuk akses selamanya.'));
  assert.ok(decoded.includes('Nama: Siti Rahma'));
  assert.ok(decoded.includes('Nomor WhatsApp: 085712345678'));
  assert.ok(decoded.includes('Email: siti@warung.com'));
  assert.ok(decoded.includes('Kabupaten/Kota: Bandung'));
  assert.ok(decoded.includes('Mohon petunjuk pembayaran dan proses aktivasi/pengiriman aplikasi. Terima kasih.'));
});

test('generatePaymentProofWhatsAppUrl creates correct proof link', () => {
  const url = generatePaymentProofWhatsAppUrl('Siti Rahma');
  assert.ok(url.startsWith('https://wa.me/6282379474173?text='));
  const decoded = decodeURIComponent(url.replace('https://wa.me/6282379474173?text=', ''));
  assert.ok(decoded.includes('Rp28.500'));
  assert.ok(decoded.includes('Siti Rahma'));
  assert.ok(decoded.includes('lampirkan tangkapan layar'));
});
