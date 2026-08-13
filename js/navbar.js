// ===========================================
// NAVBAR — Navbar transparan saat di atas + ScrollSpy indikator aktif
// ===========================================
window.RakaSite = window.RakaSite || {};

RakaSite.initNavbar = function () {
    // 1. Navbar berubah solid saat discroll
    const nav = document.querySelector('.navbar');
    if (!nav) return;
    const scrollThreshold = 100;

    window.addEventListener('scroll', () => {
        if (window.scrollY > scrollThreshold) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }, { passive: true });

    // 1b. Tutup menu mobile (Bootstrap collapse) begitu salah satu link ditekan —
    // supaya user tidak "terjebak" di menu terbuka setelah memilih tujuan.
    const collapseEl = document.getElementById('navbarNav');
    if (collapseEl && window.bootstrap) {
        collapseEl.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (collapseEl.classList.contains('show')) {
                    const bsCollapse = bootstrap.Collapse.getOrCreateInstance(collapseEl);
                    bsCollapse.hide();
                }
            });
        });
    }

    // 2. ScrollSpy — garis indikator mengikuti section aktif
    // (indikator geser hanya relevan di layout horizontal desktop; di ≤991px
    //  menu jadi vertikal/collapse sehingga indikator disembunyikan lewat CSS,
    //  jadi kita juga skip kalkulasinya di lebar tersebut demi hemat kerja JS)
    const MOBILE_BREAKPOINT = 991;
    const sections = document.querySelectorAll('#hero-section, #works, #contact');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const indicator = document.querySelector('.nav-indicator');
    if (!indicator) return;

    function moveIndicator(element) {
        if (window.innerWidth <= MOBILE_BREAKPOINT) return;
        if (element) {
            const width = element.offsetWidth;
            const left = element.offsetLeft;
            indicator.style.width = `${width}px`;
            indicator.style.left = `${left}px`;
        } else {
            indicator.style.width = '0';
        }
    }

    window.addEventListener('resize', () => {
        const activeLink = document.querySelector('.nav-link.active');
        moveIndicator(activeLink);
    });

    const removeActiveClass = () => {
        navLinks.forEach(link => link.classList.remove('active'));
    };

    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                removeActiveClass();
                const currentSectionId = entry.target.id;
                const targetHref = (currentSectionId === 'hero-section') ? '#hero-section' : `#${currentSectionId}`;
                const activeLink = document.querySelector(`.nav-link[href="${targetHref}"]`);

                if (activeLink) {
                    activeLink.classList.add('active');
                    moveIndicator(activeLink);
                }
            }
        });
    };

    const options = {
        root: null,
        rootMargin: "-50% 0px -50% 0px",
        threshold: 0
    };

    const observer = new IntersectionObserver(observerCallback, options);
    sections.forEach(section => observer.observe(section));

    // Set status 'active' awal saat load
    const initialActiveLink = document.querySelector('.nav-link[href="#hero-section"]');
    if (initialActiveLink) {
        initialActiveLink.classList.add('active');
        setTimeout(() => moveIndicator(initialActiveLink), 100);
    }
};
