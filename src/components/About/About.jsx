export default function About() {
  return (
    <section id="about" className="about-section" lang="id">
      <div className="container">
        <div className="row g-5">
          <div className="col-lg-4 reveal in-left" data-delay="0">
            <div className="about-eyebrow">// ABOUT ME</div>
            <h2 className="about-heading">Cara Berpikir, Bukan Hanya Cara Kerja.</h2>
          </div>

          <div className="col-lg-8 reveal in-right" data-delay="150">
            <p className="about-paragraph">
              Semua bermula dari kebiasaan yang mungkin agak "aneh": setiap kali menemukan sistem yang rumit — entah itu alur checkout, birokrasi kampus, atau bahkan game strategi — saya lebih penasaran dengan <em>kenapa</em> sistemnya begitu, dibanding sekadar memakainya. Kebiasaan itu yang akhirnya membawa saya ke persimpangan antara desain dan logika: satu kaki di dunia visual (Figma, komposisi, warna), satu kaki lagi di dunia struktur (database, arsitektur sistem, alur data).
            </p>
            <p className="about-paragraph">
              Saya menyebut diri saya <strong>System Thinker</strong> bukan karena gelar atau gaya-gayaan, tapi karena itulah proses kerja saya yang sebenarnya: sebelum menyentuh warna atau layout, saya memetakan masalahnya dulu — siapa penggunanya, data apa yang mengalir, keputusan apa yang harus diambil di setiap titik. Desain yang bagus, menurut saya, adalah desain yang sudah "beres" secara logika sebelum dia terlihat cantik.
            </p>
            <p className="about-paragraph">
              Pendekatan itu yang saya bawa ke setiap proyek: mulai dari flowchart dan ERD, baru turun ke wireframe, mockup, dan akhirnya implementasi. Hasil akhirnya bukan cuma tampil rapi, tapi juga masuk akal secara sistem — dan itu yang menurut saya membedakan "tampilan yang indah" dari "produk yang benar-benar bekerja."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
