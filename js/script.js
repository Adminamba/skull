document.getElementById('emotionForm').addEventListener('submit', function(e) {
            e.preventDefault(); // Mencegah halaman reload

            // Mengambil data dari form
            const nama = document.getElementById('nama').value;
            const kelas = document.getElementById('kelas').value;
            const emosi = document.querySelector('input[name="emosi"]:checked').value;
            // Membersihkan teks cerita dari enter/koma agar format Excel tidak rusak
            const cerita = document.getElementById('cerita').value.replace(/(\r\n|\n|\r|,)/gm, " "); 
            const tanggal = new Date().toLocaleString('id-ID');

            // Membuat baris data format CSV (Excel)
            const csvContent = `Tanggal,Nama,Kelas,Emosi,Cerita\n"${tanggal}","${nama}","${kelas}","${emosi}","${cerita}"`;

            // Proses download file CSV
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement("a");
            const url = URL.createObjectURL(blob);
            
            link.setAttribute("href", url);
            link.setAttribute("download", `Data_Emosi_${nama}.csv`);
            link.style.visibility = 'hidden';
            
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Reset form setelah dikirim
            alert("Data berhasil disimpan! File Excel (CSV) otomatis terdownload.");
            this.reset();
        });
