import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Style order intentionally mirrors the stable vanilla build.
import './styles/variables.css';
import './styles/navbar.css';
import './styles/hero.css';
import './styles/projects.css';
import './styles/stats.css';
import './styles/tools.css';
import './styles/footer.css';
import './styles/case-study.css';
import './styles/animations.css';
import './styles/utilities.css';
import './styles/responsive.css';
import './styles/scene-system.css';

createRoot(document.getElementById('root')).render(<App />);
