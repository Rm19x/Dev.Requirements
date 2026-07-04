# Developer Requirements - Platform Multi-Tools
[![Author](https://img.shields.io/badge/Developed%20by-Mr.Rm19-orange?style=flat-square)](https://github.com/Rm19x)

**Developer Requirements Suite** adalah sebuah platform web multi-tools statis yang dirancang khusus untuk mempermudah pekerjaan harian para developer, analis data, hingga praktisi keamanan siber. Aplikasi ini menggabungkan puluhan fungsi utilitas mulai dari pelacakan domain, enkoding/dekoding, kriptografi sederhana, pemformat kode, hingga generator tata letak visual dalam satu antarmuka yang responsif dan ringkas.

---
##  Live website
Kunjungi website ini secara langsung di: 
 **[https://rm19x.github.io/Dev.Requirements/](https://rm19x.github.io/Dev.Requirements/)**


##  Fitur

Platform ini dibagi menjadi 5 kategori alat utama yang dapat diakses secara instan melalui sistem navigasi tab:

### 1. Core Tools
* **Domain Tracker Engine:** Melacak status pembacaan daftar domain murni dari file `.txt` secara lokal menggunakan browser *Local Storage*.
* **URL & Path Extractor Tools:** Mengekstrak tautan URL (`http`/`https`) bersih dari tumpukan teks log mentah atau arsip defacement.
* **URL Custom Path Append Tools:** Mengambil domain utama (*root*) dari daftar URL dan memasangkan *path* kustom secara massal.
* **Mass Website Deleter :** Membandingkan daftar website pusat (misal dari Notepad++) dengan daftar hitam (*blacklist*) untuk melakukan penghapusan atau penyaringan massal secara instan.

### 2. Encoders & Decoders
* **URL Encoder & Decoder:** Mengonversi string teks biasa menjadi format URL-safe dan sebaliknya.
* **HTML Entity Encoder:** Mengamankan kode teks/HTML (seperti `<script>`) menjadi entitas HTML aman.
* **Base32 & Base64 Codec:** Enkoder dan dekoder teks untuk arsitektur string Base32 dan Base64 murni.
* **Morse Code Converter:** Mengubah alfabet teks menjadi sandi Morse internasional dan sebaliknya.

### 3. Crypto & Obfuscator
* **JavaScript Obfuscator Simple:** Mengacak script JavaScript mentah agar kodenya lebih sulit dibaca dan dipahami secara langsung oleh pihak luar.
* **XOR Cipher Tool:** Enkripsi atau dekripsi baris teks menggunakan kalkulasi logika XOR dengan kunci (*key*) rahasia kustom.
* **ROT13 Obfuscator:** Menyamarkan teks menggunakan metode pergeseran klasik 13 huruf.

### 4. Formatters & Dev-Minifier
* **JSON to HTML Table Converter:** Mengubah struktur data array JSON objek menjadi bentuk tabel HTML siap pakai lengkap dengan pratinjaunya.
* **Markdown to HTML Live Editor:** Menulis sintaks Markdown secara bebas dengan visualisasi render HTML secara langsung (*live*).
* **HTML / CSS / JS Code Minifier:** Kompresi ukuran file web statis dengan membuang spasi kosong, tab, breakline, dan komentar skrip.
* **Robots.txt & Sitemap Builder:** Generator otomatis untuk struktur SEO web standar berdasarkan URL domain utama Anda.
* **Binary / Hex / Decimal Converter:** Konversi angka desimal atau teks menjadi susunan biner dan heksadesimal.

### 5. Visual & Data Tools
* **Regex Code Generator:** Membuat pola regex siap pakai berdasarkan kriteria umum (Email, IPv4, Alfanumerik, URL).
* **CSS Flexbox & Grid Layout Creator:** Sandbox visual instan untuk membangun struktur tata letak web berbasis CSS Flexbox dan CSS Grid.
* **JavaScript Array Shuffler:** Mengacak susunan elemen di dalam format array JavaScript menggunakan algoritma acak adil.
* **Bencode Encoder & Decoder:** Memproses pengodean data string teks mentah menjadi format enkapsulasi Bencode biner (standar Torrent).



