import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import Loader from '../common/Loader';
import CustomCursor from '../common/CustomCursor';
import NotFoundPage from './NotFoundPage';
import { logoProjects } from '../../data/projects';
import { useReveal } from '../../hooks/useReveal';
import { useCursor } from '../../hooks/useCursor';
import '../../styles/logo-case-study.css';

export default function LogoCaseStudyPage({ studyId }) {
  const logo = logoProjects.find(item => item.id === studyId);

  useReveal();
  useCursor();

  if (!logo || !logo.caseStudy) {
    return <NotFoundPage />;
  }

  const currentIndex = logoProjects.findIndex(item => item.id === logo.id);
  const nextLogo = logoProjects[(currentIndex + 1) % logoProjects.length];
  const gallery = Array.isArray(logo.gallery) ? logo.gallery : [];
  const appGallery = gallery.filter(item => item.fit !== 'contain');

  return (
    <>
      <Loader />
      <CustomCursor />
      <Navbar subpage />

      <main
        className="logo-case-page"
        style={{ '--logo-accent': logo.hoverColor || 'var(--accent-color)' }}
      >
        <section className="logo-case-hero">
          <div className="container">
            <a
              href="index.html#works"
              className="logo-case-back reveal in-left"
              data-delay="0"
            >
              <i className="bi bi-arrow-left" aria-hidden="true" />
              Back to Visual Identity Systems
            </a>

            <div className="logo-case-head">
              <div className="logo-case-copy reveal in-up" data-delay="100">
                <span className="logo-case-eyebrow">
                  {logo.caseStudy.eyebrow}
                </span>

                <h1>{logo.name}</h1>

                <p className="logo-case-intro">
                  {logo.caseStudy.intro}
                </p>

                <div className="logo-case-tags">
                  {[logo.category, logo.year, logo.role, ...(logo.deliverables || [])]
                    .filter(Boolean)
                    .map(item => (
                      <span key={item}>{item}</span>
                    ))}
                </div>
              </div>

              <div className="logo-case-mark reveal in-scale" data-delay="180">
                <span className="logo-case-mark-code">IDENTITY / {String(currentIndex + 1).padStart(2, '0')}</span>
                <img src={logo.image} alt={`${logo.name} logo`} />
              </div>
            </div>
          </div>
        </section>

        {gallery[0] && (
          <section className="logo-case-feature reveal in-up" data-delay="0">
            <div className="container">
              <figure>
                <img
                  src={gallery[0].src}
                  alt={gallery[0].alt || `${logo.name} hero application`}
                />
                <figcaption>
                  <span>01 / FEATURED APPLICATION</span>
                  <strong>{gallery[0].label || 'Brand Application'}</strong>
                </figcaption>
              </figure>
            </div>
          </section>
        )}

        <section className="logo-case-story">
          <div className="container">
            {logo.caseStudy.story.map((section, index) => (
              <article
                className="logo-case-story-row reveal in-up"
                data-delay={index * 90}
                key={section.number}
              >
                <div className="logo-case-story-index">
                  {section.number}
                </div>

                <div className="logo-case-story-copy">
                  <h2>{section.title}</h2>
                  {section.paragraphs.map((paragraph, paragraphIndex) => (
                    <p key={paragraphIndex}>{paragraph}</p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="logo-case-applications">
          <div className="container">
            <div className="logo-case-section-head reveal in-left" data-delay="0">
              <span>03 // BRAND APPLICATIONS</span>
              <h2>The identity in use.</h2>
              <p>
                The gallery below is prepared for the real mockups and product photos. Replace the placeholder files without changing the component structure.
              </p>
            </div>

            <div className="logo-case-gallery">
              {appGallery.map((item, index) => (
                <figure
                  className={`logo-case-gallery-item ${index === 0 ? 'is-wide' : ''} reveal in-up`}
                  data-delay={(index % 3) * 80}
                  key={`${item.src}-${index}`}
                >
                  <img
                    src={item.src}
                    alt={item.alt || `${logo.name} application ${index + 1}`}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                  <figcaption>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <strong>{item.label || 'Brand Application'}</strong>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="logo-case-next">
          <div className="container reveal in-up" data-delay="0">
            <span>NEXT IDENTITY</span>
            <a href={nextLogo.caseStudyHref}>
              <strong>{nextLogo.name}</strong>
              <i className="bi bi-arrow-right" aria-hidden="true" />
            </a>
          </div>
        </section>
      </main>

      <Footer subpage />
    </>
  );
}
