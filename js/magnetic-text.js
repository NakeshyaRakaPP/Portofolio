// ===========================================
// MAGNETIC TEXT — Efek huruf "terangkat" mendekati kursor
// (dipakai pada nama & deskripsi panjang di Hero)
// ===========================================
window.RakaSite = window.RakaSite || {};

RakaSite.initMagneticText = function () {
    // Efek ini murni berbasis mousemove — tidak ada gunanya (dan boros) di layar sentuh,
    // dan harus dihormati kalau pengguna minta gerakan lebih sedikit.
    if (RakaSite.utils.isTouchDevice() || RakaSite.utils.prefersReducedMotion()) return;

    // 1. Pecah teks jadi span per-huruf (tetap menjaga kata utuh agar tidak wrap aneh)
    function wrapLettersInSpans(selector) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(el => {
            const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);
            const textNodes = [];

            let node;
            while (node = walker.nextNode()) {
                if (node.nodeValue.trim() !== '') {
                    textNodes.push(node);
                }
            }

            textNodes.forEach(textNode => {
                const fragment = document.createDocumentFragment();
                const words = textNode.nodeValue.split(/(\s+)/);

                words.forEach(word => {
                    if (word.trim() === '') {
                        fragment.appendChild(document.createTextNode(word));
                    } else {
                        const wordSpan = document.createElement('span');
                        wordSpan.style.display = 'inline-block';
                        wordSpan.style.whiteSpace = 'nowrap'; // Kunci agar kata tidak patah

                        const chars = word.split('');
                        chars.forEach(char => {
                            const charSpan = document.createElement('span');
                            charSpan.textContent = char;
                            charSpan.className = 'hover-char';
                            wordSpan.appendChild(charSpan);
                        });

                        fragment.appendChild(wordSpan);
                    }
                });
                textNode.parentNode.replaceChild(fragment, textNode);
            });
        });
    }

    wrapLettersInSpans('.hero-name-big, .hero-desc-long');

    // 2. Engine jarak kursor — cache rect, throttle lewat rAF, skip kalau mouse jauh dari hero
    const charEls = Array.from(document.querySelectorAll('.hover-char'));
    if (!charEls.length) return;

    const heroSection = document.getElementById('hero-section');
    const maxDistance = 75;
    let charData = [];
    let rawMouseX = 0, rawMouseY = 0;
    let needsRectRefresh = true;
    let ticking = false;

    function refreshRects() {
        charData = charEls.map(span => {
            const rect = span.getBoundingClientRect();
            return {
                span,
                cx: rect.left + rect.width / 2,
                cy: rect.top + rect.height / 2
            };
        });
        needsRectRefresh = false;
    }

    function applyMagnet() {
        ticking = false;

        if (heroSection) {
            const heroRect = heroSection.getBoundingClientRect();
            if (heroRect.bottom < 0 || heroRect.top > window.innerHeight) {
                return;
            }
        }

        if (needsRectRefresh) refreshRects();

        charData.forEach(({ span, cx, cy }) => {
            const distX = rawMouseX - cx;
            const distY = rawMouseY - cy;
            const distance = Math.sqrt(distX * distX + distY * distY);

            if (distance < maxDistance) {
                const lift = ((maxDistance - distance) / maxDistance) * -18;
                span.style.transform = `translateY(${lift}px) scale(1.1)`;
                span.style.color = 'var(--accent-color)';
            } else if (span.style.color) {
                span.style.transform = 'translateY(0) scale(1)';
                span.style.color = '';
            }
        });
    }

    document.addEventListener('mousemove', (e) => {
        rawMouseX = e.clientX;
        rawMouseY = e.clientY;
        if (!ticking) {
            ticking = true;
            requestAnimationFrame(applyMagnet);
        }
    }, { passive: true });

    window.addEventListener('scroll', () => { needsRectRefresh = true; }, { passive: true });
    window.addEventListener('resize', () => { needsRectRefresh = true; });
};
