import { useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Stats from './components/Stats/Stats';
import AboutScroll from './components/About/AboutScroll';
import ToolsSection from './components/Tools/ToolsSection';
import Projects from './components/Projects/Projects';
import Contact from './components/Contact/Contact';
import CinematicFooter from './components/Footer/CinematicFooter';
import Loader from './components/common/Loader';
import CustomCursor from './components/common/CustomCursor';
import { useReveal } from './hooks/useReveal';
import { useCounters } from './hooks/useCounters';
import { useCursor } from './hooks/useCursor';
import { useParallax } from './hooks/useParallax';
import { useMagneticText } from './hooks/useMagneticText';
import { useToolsScrollGate } from './hooks/useToolsScrollGate';
import { useContactScrollGate } from './hooks/useContactScrollGate';

export default function HomePage() {
  useEffect(() => {
    if (!window.location.hash) return;
    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.querySelector(window.location.hash)?.scrollIntoView();
      });
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  useReveal();
  useCounters();
  useCursor();
  useParallax(true);
  useMagneticText(true);
  useToolsScrollGate();
  useContactScrollGate();

  return (
    <>
      <Loader />
      <CustomCursor />
      <Navbar />
      <div className="portfolio-flow">
        <Hero />
        <Stats />
        <AboutScroll />
        <ToolsSection />
        <Projects />
        <Contact />
        <CinematicFooter />
      </div>
    </>
  );
}
