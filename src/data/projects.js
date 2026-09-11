import { assets } from './assets';

export const logoProjects = [
  { id: 'jokirif', name: 'JOKI RIF', image: assets.logos.jokirif, hoverColor: '#007bff' },
  { id: 'raja-iblis', name: 'RAJA 1BLIS E-Sport', image: assets.logos.rajaIblis, hoverColor: '#ff4d4d' },
  { id: 'minara', name: 'MINARA', image: assets.logos.minara, hoverColor: '#ffb400' },
  { id: 'relaska-logo', name: 'RELASKA COMPUTER', image: assets.logos.relaska, hoverColor: '#9b59b6' },
  { id: 'ptm', name: 'PTM LUMBA-LUMBA PISANGAN BARU', image: assets.logos.ptm, hoverColor: '#00d4ff' }
];

export const softwareProjects = [
  {
    id: 'relaska',
    href: 'case-study-relaska.html',
    title: 'RELASKA — PC Builder & Smart Store',
    description: 'Simulator rakit PC interaktif yang mengecek kompatibilitas hardware otomatis, terintegrasi dengan Price Trend Radar berbasis Regresi Linear.',
    tags: ['PC Builder Simulator', '2026', 'Linear Regression'],
    image: assets.relaskaThumb,
    imageAlt: 'Thumbnail Proyek RELASKA'
  },
  {
    id: 'ecommerce',
    href: 'case-study-ecommerce.html',
    title: 'Redesign Website E-Commerce',
    description: 'Checkout flow dipangkas dari 5 langkah menjadi 2 langkah dengan progress indicator yang persisten.',
    tags: ['UI/UX Engineer', '2025', 'System Analysis'],
    pending: true
  }
];
