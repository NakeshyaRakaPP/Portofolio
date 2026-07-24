// ===========================================
// MAIN — Entry point. Hanya menginisialisasi semua modul.
// Urutan file <script> di HTML: utils -> (modul lain) -> main.js (terakhir)
// ===========================================
(function () {
    // Loader butuh event 'load' penuh (nunggu semua aset selesai)
    RakaSite.initLoader();

    // Sisanya aman dijalankan langsung karena script ditaruh di akhir <body>
    // (DOM sudah ter-parse duluan saat baris ini dieksekusi)
    RakaSite.initCursor();
    RakaSite.initParallax();
    RakaSite.initReveal();
    RakaSite.initCounter();
    RakaSite.initNavbar();
    RakaSite.initMarquee();
    RakaSite.initTheme();
    RakaSite.initContact();
    RakaSite.initMagneticText();
})();
