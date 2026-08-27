const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

// Middleware agar Express bisa membaca data dari form/JSON dan file statis
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname)); // Mengizinkan akses ke index.html, css, js

// Atur EJS sebagai template engine untuk halaman Dashboard
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 1. KONEKSI DATABASE (Ganti URL jika pakai MongoDB Atlas nanti, saat ini pakai lokal)
mongoose.connect('mongodb://localhost:25017/db_emosi')
  .then(() => console.log('Terhubung ke MongoDB lokal!'))
  .catch(err => console.error('Gagal konek database:', err));

// 2. MEMBUAT SCHEMA & MODEL DATABASE
const CeritaSchema = new mongoose.Schema({
  emosi: String,
  cerita: String,
  tanggal: { type: Date, default: Date.now }
});
const Cerita = mongoose.model('Cerita', CeritaSchema);

// 3. ROUTE UTAMA: Menampilkan Halaman Form Input
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// 4. ROUTE API: Menerima Inputan Form dari Frontend
app.post('/api/kirim-cerita', async (req, res) => {
  try {
    const dataBaru = new Cerita({
      emosi: req.body.emosi,
      cerita: req.body.cerita
    });
    await dataBaru.save(); // Simpan ke MongoDB
    res.status(200).json({ success: true, message: 'Data berhasil disimpan!' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 5. ROUTE DASHBOARD: Menampilkan Semua Data untuk Dipantau
app.get('/dashboard', async (req, res) => {
  try {
    const semuaCerita = await Cerita.find().sort({ tanggal: -1 }); // Ambil semua data, urutkan dari yang terbaru
    res.render('dashboard', { data: semuaCerita }); // Kirim data ke file dashboard.ejs
  } catch (error) {
    res.status(500).send('Gagal memuat dashboard');
  }
});

// Jalankan Server di Port 3000
app.listen(3000, () => {
  console.log('Server berjalan di http://localhost:3000');
});
