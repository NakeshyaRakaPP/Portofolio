import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import Loader from '../common/Loader';
import CustomCursor from '../common/CustomCursor';
import { useReveal } from '../../hooks/useReveal';
import { useCursor } from '../../hooks/useCursor';

export default function NotFoundPage() {
  useReveal();
  useCursor();

  return (
    <>
      <Loader />
      <CustomCursor />
      <Navbar subpage />
      <main>
        <section className="error-404-section">
          <div className="container text-center">
            <div className="error-404-code reveal in-zoom" data-delay="0">404</div>
            <h1 className="error-404-title reveal in-up" data-delay="150">Halaman ini tidak ada di dalam sistem.</h1>
            <p className="error-404-text reveal in-up" data-delay="250">
              Sepertinya kamu mengetik alamat yang salah, atau halaman ini sudah dipindahkan. Yuk kembali ke jalur yang benar.
            </p>
            <a href="index.html" className="footer-cta-btn reveal in-up" data-delay="350">
              Back to Home <i className="bi bi-arrow-up-right" aria-hidden="true" />
            </a>
          </div>
        </section>
      </main>
      <Footer compact subpage />
    </>
  );
}
