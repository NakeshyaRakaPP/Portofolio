import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import Loader from '../common/Loader';
import CustomCursor from '../common/CustomCursor';
import { caseStudies } from '../../data/caseStudies';
import { useReveal } from '../../hooks/useReveal';
import { useCursor } from '../../hooks/useCursor';

function Paragraph({ children }) {
  if (typeof children === 'string' && children.startsWith('Insight:')) {
    return <p><strong>Insight:</strong>{children.slice('Insight:'.length)}</p>;
  }
  return <p>{children}</p>;
}

function StandardSection({ section }) {
  if (section.full) {
    return (
      <section className="case-section">
        <div className="container">
          <div className="reveal in-up" data-delay="0">
            <div className="case-step-num">{section.number}</div>
            <h2>{section.title}</h2>
            {section.paragraphs.map((paragraph, index) => <Paragraph key={index}>{paragraph}</Paragraph>)}
          </div>
          <div className="case-visual case-visual-tall reveal in-scale" data-delay="100">{section.visual}</div>
        </div>
      </section>
    );
  }

  return (
    <section className="case-section">
      <div className="container">
        <div className="row align-items-center g-5">
          <div className={`col-lg-6 reveal ${section.reverse ? 'order-lg-2 in-right' : 'in-left'}`} data-delay="0">
            <div className="case-step-num">{section.number}</div>
            <h2>{section.title}</h2>
            {section.paragraphs.map((paragraph, index) => <Paragraph key={index}>{paragraph}</Paragraph>)}
          </div>
          <div className={`col-lg-6 reveal ${section.reverse ? 'order-lg-1 in-left' : 'in-right'}`} data-delay="150">
            <div className="case-visual">{section.visual}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function CaseStudyPage({ studyId }) {
  const study = caseStudies[studyId];
  useReveal();
  useCursor();

  return (
    <>
      <Loader />
      <CustomCursor />
      <Navbar subpage />

      <main>
        <section className="case-hero">
          <div className="container">
            <a href="index.html#works" className="case-back-link reveal in-left" data-delay="0">
              <i className="bi bi-arrow-left" aria-hidden="true" /> Back to Selected Works
            </a>
            <div className="case-eyebrow reveal in-up mt-4" data-delay="100">{study.eyebrow}</div>
            <h1 className="case-title reveal in-up" data-delay="200">{study.title}</h1>
            <div className="case-meta reveal in-up" data-delay="300">
              {study.meta.map(([label, value]) => (
                <div className="case-meta-item" key={label}><span>{label}</span> {value}</div>
              ))}
            </div>
          </div>
        </section>

        {study.sections.map(section => <StandardSection section={section} key={section.number} />)}

        <section className="case-section case-section-noborder">
          <div className="container">
            <div className="reveal in-up" data-delay="0">
              <div className="case-step-num">{study.result.number}</div>
              <h2>{study.result.title}</h2>
              {study.result.paragraphs.map((paragraph, index) => <Paragraph key={index}>{paragraph}</Paragraph>)}
            </div>
            <div className="case-result-grid">
              {study.result.metrics.map(([value, label], index) => (
                <div className="case-result-item reveal in-scale" data-delay={index * 100} key={label}>
                  <h3 className="stat-number">{value}</h3>
                  <p className="stat-label">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="case-nav-footer reveal in-up" data-delay="0">
          <a href={study.next.href} className="btn btn-outline-primary">
            {study.next.label} <i className="bi bi-arrow-right" aria-hidden="true" />
          </a>
        </div>
      </main>

      <Footer subpage />
    </>
  );
}
