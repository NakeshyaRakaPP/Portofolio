// ===========================================
// CONTACT — Tombol copy alamat email ke clipboard
// ===========================================
window.RakaSite = window.RakaSite || {};

RakaSite.initContact = function () {
    const emailButton = document.getElementById('email-button');
    if (!emailButton) return;

    const emailTextEl = document.getElementById('email-text');
    const copyIcon = document.getElementById('copy-icon');
    const emailText = emailTextEl ? emailTextEl.innerText : '';

    emailButton.addEventListener('click', () => {
        navigator.clipboard.writeText(emailText).then(() => {
            copyIcon.textContent = 'COPIED!';
            emailButton.style.borderColor = '#28a745'; // Warna hijau sukses

            setTimeout(() => {
                copyIcon.textContent = 'COPY';
                emailButton.style.borderColor = ''; // Kembali ke border semula
            }, 2000);
        });
    });
};
