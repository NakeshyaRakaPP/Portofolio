const stats = [
  { value: 10, suffix: '+', label: 'Projects' },
  { value: 5, suffix: '+', label: 'Years Designing' },
  { value: 5, suffix: '+', label: 'Logo Designs' }
];

export default function Stats() {
  return (
    <section id="stats" className="stats-section">
      <div className="container">
        <div className="row g-4">
          {stats.map((stat, index) => (
            <div className="col-6 col-md-3" key={stat.label}>
              <div className="stat-item text-center reveal in-up" data-delay={index * 100}>
                <h3 className="stat-number"><span className="stat-count" data-count={stat.value}>0</span><span className="stat-suffix">{stat.suffix}</span></h3>
                <p className="stat-label">{stat.label}</p>
              </div>
            </div>
          ))}
          <div className="col-6 col-md-3">
            <div className="stat-item stat-tags text-center reveal in-up" data-delay="300">
              <h3 className="stat-number">UI &nbsp;•&nbsp; System Analysis &nbsp;•&nbsp; Front-End</h3>
              <p className="stat-label">Core Focus</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
