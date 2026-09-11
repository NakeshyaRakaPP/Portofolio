import LogoCoverflow from './LogoCoverflow';
import { logoProjects, softwareProjects } from '../../data/projects';
import AmbientDecor from '../common/AmbientDecor';

export default function Projects() {
  return (
    <section id="works" className="works-section py-5">

        <AmbientDecor variant="projects" />

        <div className="container">
        <h2 className="text-center mb-5 display-4 fw-bold reveal in-scale works-heading" data-delay="0">
          SELECTED WORKS
        </h2>

        <div className="mb-5">
          <div className="project-category-header reveal in-left" data-delay="0">
            <span className="cat-num">01 //</span>
            <h3>Logo Designs</h3>
          </div>

          <div className="reveal in-up" data-delay="100">
            <LogoCoverflow logos={logoProjects} />
          </div>
        </div>

        <div className="mt-5">
          <div className="project-category-header reveal in-left" data-delay="0">
            <span className="cat-num">02 //</span>
            <h3>Software Architecture & Dev</h3>
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
                    <span className="project-card-btn">View Case Study <i className="bi bi-arrow-up-right" aria-hidden="true" /></span>
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
