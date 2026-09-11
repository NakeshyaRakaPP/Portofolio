import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../../hooks/useTheme';

export default function Navbar({ subpage = false }) {
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(subpage);
  const [active, setActive] = useState('about');
  const navRef = useRef(null);
  const indicatorRef = useRef(null);

  useEffect(() => {
    if (subpage) return;
    const onScroll = () => setScrolled(window.scrollY > 100);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [subpage]);

  useEffect(() => {
    if (subpage) return;
    const sections = ['about', 'works', 'contact']
      .map(id => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, { rootMargin: '-50% 0px -50% 0px', threshold: 0 });

    sections.forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, [subpage]);

  useEffect(() => {
    if (subpage || window.innerWidth <= 991 || !indicatorRef.current || !navRef.current) return;
    const activeLink = navRef.current.querySelector(`[data-section="${active}"]`);
    if (!activeLink) return;
    indicatorRef.current.style.width = `${activeLink.offsetWidth}px`;
    indicatorRef.current.style.left = `${activeLink.offsetLeft}px`;
  }, [active, subpage, open]);

  const homeHref = subpage ? 'index.html' : '#hero-section';

  if (subpage) {
    return (
      <nav className="navbar navbar-expand-lg fixed-top scrolled">
        <div className="container-fluid">
          <a className="navbar-brand fw-bold" href={homeHref}>RAKA<span>.</span></a>
          <div className="ms-auto">
            <button
              id="theme-toggle"
              type="button"
              className={`btn rounded-circle theme-toggle-btn ${theme === 'light' ? 'btn-outline-dark' : 'btn-outline-light'}`}
              onClick={toggleTheme}
              aria-label="Toggle color theme"
            >
              {theme === 'light' ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </nav>
    );
  }

  const links = [
    ['about', 'About'],
    ['works', 'Projects'],
    ['contact', 'Contact']
  ];

  return (
    <nav
      ref={navRef}
      className={`navbar navbar-expand-lg fixed-top ${scrolled ? 'scrolled' : ''}`}
    >
      <div className="container-fluid">
        <a className="navbar-brand fw-bold" href="#hero-section" onClick={() => setOpen(false)}>RAKA<span>.</span></a>

        <button
          className="navbar-toggler"
          type="button"
          aria-controls="navbarNav"
          aria-expanded={open}
          aria-label="Toggle navigation"
          onClick={() => setOpen(value => !value)}
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className={`collapse navbar-collapse ${open ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {links.map(([section, label]) => (
              <li className="nav-item" key={section}>
                <a
                  className={`nav-link ${active === section ? 'active' : ''}`}
                  data-section={section}
                  href={`#${section}`}
                  onClick={() => setOpen(false)}
                >
                  {label}
                </a>
              </li>
            ))}
            <li className="nav-item ms-3">
              <button
                id="theme-toggle"
                type="button"
                className={`btn rounded-circle theme-toggle-btn ${theme === 'light' ? 'btn-outline-dark' : 'btn-outline-light'}`}
                onClick={toggleTheme}
                aria-label="Toggle color theme"
              >
                {theme === 'light' ? '☀️' : '🌙'}
              </button>
            </li>
            <div className="nav-indicator" ref={indicatorRef} aria-hidden="true" />
          </ul>
        </div>
      </div>
    </nav>
  );
}
