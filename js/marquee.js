// ===========================================
// MARQUEE — Teks berjalan tanpa celah, loop mulus di layar berapa pun.
// Alih-alih hardcode jumlah <span> di HTML (rawan bolong di layar lebar),
// JS menggandakan konten secukupnya berdasarkan lebar layar sebenarnya,
// lalu mengatur durasi animasi berdasarkan KECEPATAN (px/detik) yang konsisten
// — jadi tidak lagi terasa lambat saat kontennya pendek.
// ===========================================
window.RakaSite = window.RakaSite || {};

RakaSite.initMarquee = function () {
    const wrapper = document.querySelector('.marquee-wrapper');
    const track = document.querySelector('.marquee-content');
    if (!wrapper || !track) return;

    const firstSpan = track.querySelector('span');
    if (!firstSpan) return;

    const baseText = firstSpan.outerHTML;
    const SPEED_PX_PER_SEC = 110; // Naikkan angka ini untuk lebih cepat, turunkan untuk lebih lambat

    function buildTrack() {
        // Reset ke satu salinan asli dulu sebelum menghitung ulang
        track.style.animation = 'none';
        track.innerHTML = baseText;

        const wrapperWidth = wrapper.offsetWidth;

        // Tambah salinan sampai satu "putaran" sudah lebih lebar dari layar,
        // supaya saat di-double nanti tidak ada celah kosong yang kelihatan.
        while (track.scrollWidth < wrapperWidth) {
            track.insertAdjacentHTML('beforeend', baseText);
        }

        // Gandakan persis isi saat ini (teknik translateX(-50%) butuh 2 blok identik)
        track.innerHTML = track.innerHTML + track.innerHTML;

        // Lebar satu putaran penuh (separuh dari total, karena sudah digandakan 2x)
        const singleLoopWidth = track.scrollWidth / 2;
        const duration = singleLoopWidth / SPEED_PX_PER_SEC;

        track.style.animationDuration = `${duration}s`;
        track.style.animation = `marquee-slide ${duration}s linear infinite`;
    }

    buildTrack();

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(buildTrack, 250);
    });
};
