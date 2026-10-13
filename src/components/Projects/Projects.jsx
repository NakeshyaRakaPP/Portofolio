import { useEffect, useRef } from 'react';
import LogoCoverflow from './LogoCoverflow';
import { logoProjects, softwareProjects } from '../../data/projects';
import SceneChrome from '../common/SceneChrome';
import Magnetic from '../common/Magnetic';

export default function Projects() {
  const sectionRef = useRef(null);

  /* Card spotlight — an amber radial glow follows the cursor
     inside each project card, driven by CSS variables. */
  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return undefined;

    if (
      !window.matchMedia('(hover: hover) and (pointer: fine)').matches
    ) {
      return undefined;
    }

    const handlePointerMove = event => {
      const card = event.target.closest('.project-card');

      if (!card || !section.contains(card)) return;

      const rect = card.getBoundingClientRect();

      card.style.setProperty(
        '--spot-x',
        `${event.clientX - rect.left}px`
      );

      card.style.setProperty(
        '--spot-y',
        `${event.clientY - rect.top}px`
      );
    };

    section.addEventListener(
      'pointermove',
      handlePointerMove,
      { passive: true }
    );

    return () => {
      section.removeEventListener(
        'pointermove',
        handlePointerMove
      );
    };
  }, []);

  return (
    <section id="works" ref={sectionRef} className="works-section scene-section scene-projects">
      <SceneChrome
        index="03"
        label="SELECTED WORK"
        meta="PROJECT ARCHIVE"
      />

      <div className="container">
        <div className="scene-intro reveal in-up" data-delay="0">
          <div>
            <span className="scene-kicker">Selected / Projects</span>
            <h2 className="scene-title">
              SYSTEMS I&apos;VE <span className="outline">SHIPPED.</span>
            </h2>
          </div>
          <p className="scene-description">
            A mix of identity work and software systems. Different outputs,
            same approach: structure the problem, design the logic, then make it usable.
          </p>
        </div>

        <div className="project-category-block">
          <div className="project-category-header reveal in-left" data-delay="0">
            <span className="cat-num">01 / VISUAL SYSTEMS</span>
            <h3>Logo Designs</h3>
          </div>

          <div className="reveal in-up" data-delay="100">
            <LogoCoverflow logos={logoProjects} />
          </div>
        </div>

        <div className="project-category-block">
          <div className="project-category-header reveal in-left" data-delay="0">
            <span className="cat-num">02 / DIGITAL SYSTEMS</span>
            <h3>Software Architecture &amp; Development</h3>
          </div>

          <div className="row g-4">
            {softwareProjects.map(project => (
              <div className="col-md-6 reveal in-up" data-delay="0" key={project.id}>
                <a href={project.href} className="project-card">
                  {project.pending ? (
                    <div className="project-card-media is-pending">
                      <i className="bi bi-image" aria-hidden="true" />
                      <span>Screenshot coming soon</span>
                    </div>
                  ) : (
                    <div className="project-card-media">
                      <img
                        src={project.image}
                        alt={project.imageAlt}
                        className="project-card-media-img"
                        loading={project.id === 'relaska' ? 'eager' : 'lazy'}
                        decoding="async"
                      />
                    </div>
                  )}

                  <div className="project-card-overlay">
                    <div className="project-card-tags">
                      {project.tags.map(tag => <span className="project-tag" key={tag}>{tag}</span>)}
                    </div>
                    <h5 className="project-card-title">{project.title}</h5>
                    <p className="project-card-desc">{project.description}</p>
                    <Magnetic as="span" className="project-card-btn">
                      View Case Study <i className="bi bi-arrow-up-right" aria-hidden="true" />
                    </Magnetic>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
