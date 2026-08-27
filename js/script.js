const form = document.getElementById('emotionForm');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Ambil nilai radio button yang dipilih
  const emosiTerpilih = document.querySelector('input[name="emosi"]:checked');
  const ceritaTeks = document.getElementById('cerita').value;

  if (!emosiTerpilih) {
    alert('Silakan pilih emosi Anda terlebih dahulu!');
    return;
  }

  // Kirim data ke backend server.js
  const response = await fetch('/api/kirim-cerita', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      emosi: emosiTerpilih.value,
      cerita: ceritaTeks
    })
  });

  const result = await response.json();
  if (result.success) {
    alert('Cerita Anda berhasil disimpan!');
    form.reset(); // Reset isi form setelah berhasil kirim
  } else {
    alert('Terjadi kesalahan: ' + result.message);
  }
});
