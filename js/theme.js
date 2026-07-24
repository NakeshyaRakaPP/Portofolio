// ===========================================
// THEME — Dark / Light mode toggle (tersimpan di localStorage)
// ===========================================
window.RakaSite = window.RakaSite || {};

RakaSite.initTheme = function () {
    const toggleBtn = document.getElementById('theme-toggle');
    if (!toggleBtn) return;

    const body = document.body;
    const currentTheme = localStorage.getItem('theme');

    const updateThemeUI = (isLight) => {
        toggleBtn.innerHTML = isLight ? '☀️' : '🌙';
        toggleBtn.className = isLight
            ? 'btn btn-outline-dark rounded-circle theme-toggle-btn'
            : 'btn btn-outline-light rounded-circle theme-toggle-btn';
    };

    if (currentTheme === 'light') {
        body.setAttribute('data-theme', 'light');
        updateThemeUI(true);
    } else {
        localStorage.setItem('theme', 'dark'); // Default explicit
        updateThemeUI(false);
    }

    toggleBtn.addEventListener('click', () => {
        const isLight = body.getAttribute('data-theme') === 'light';

        if (isLight) {
            body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'dark');
            updateThemeUI(false);
        } else {
            body.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            updateThemeUI(true);
        }
    });
};
