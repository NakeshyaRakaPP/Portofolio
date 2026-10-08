import { assets } from './assets';

const shots = {
  jokirif: {
    hero: new URL('../img/logo-projects/jokirif/01-hero.png', import.meta.url).href,
    applicationA: new URL('../img/logo-projects/jokirif/02-application-a.png', import.meta.url).href,
    applicationB: new URL('../img/logo-projects/jokirif/03-application-b.png', import.meta.url).href,
    applicationC: new URL('../img/logo-projects/jokirif/04-application-c.png', import.meta.url).href
  },
  rajaIblis: {
    hero: new URL('../img/logo-projects/raja-iblis/01-hero.png', import.meta.url).href,
    applicationA: new URL('../img/logo-projects/raja-iblis/02-application-a.png', import.meta.url).href,
    applicationB: new URL('../img/logo-projects/raja-iblis/03-application-b.png', import.meta.url).href,
    applicationC: new URL('../img/logo-projects/raja-iblis/04-application-c.png', import.meta.url).href
  },
  minara: {
    hero: new URL('../img/logo-projects/minara/01-hero.png', import.meta.url).href,
    applicationA: new URL('../img/logo-projects/minara/02-application-a.png', import.meta.url).href,
    applicationB: new URL('../img/logo-projects/minara/03-application-b.png', import.meta.url).href,
    applicationC: new URL('../img/logo-projects/minara/04-application-c.png', import.meta.url).href
  },
  relaska: {
    hero: new URL('../img/logo-projects/relaska/01-hero.png', import.meta.url).href,
    applicationA: new URL('../img/logo-projects/relaska/02-application-a.png', import.meta.url).href,
    applicationB: new URL('../img/logo-projects/relaska/03-application-b.png', import.meta.url).href,
    applicationC: new URL('../img/logo-projects/relaska/04-application-c.png', import.meta.url).href
  },
  ptm: {
    hero: new URL('../img/logo-projects/ptm/01-hero.png', import.meta.url).href,
    applicationA: new URL('../img/logo-projects/ptm/02-application-a.png', import.meta.url).href,
    applicationB: new URL('../img/logo-projects/ptm/03-application-b.png', import.meta.url).href,
    applicationC: new URL('../img/logo-projects/ptm/04-application-c.png', import.meta.url).href
  }
};

export const logoProjects = [
  {
    id: 'jokirif',
    name: 'JOKI RIF',
    image: assets.logos.jokirif,
    hoverColor: '#007bff',
    subtitle: 'Digital Gaming Identity',
    category: 'Visual Identity',
    year: '2026',
    role: 'Logo Designer',
    description:
      'A bold identity exploration for JOKI RIF, designed to stay recognizable across compact digital touchpoints and gaming-oriented promotional media.',
    deliverables: ['Logo Design', 'Digital Identity', 'Brand Applications'],
    caseStudyHref: 'logo-jokirif.html',
    gallery: [
      { src: shots.jokirif.hero, label: 'Hero Application', alt: 'JOKI RIF hero brand application' },
      { src: assets.logos.jokirif, label: 'Logo Mark', alt: 'JOKI RIF logo mark', fit: 'contain' },
      { src: shots.jokirif.applicationA, label: 'Digital Profile', alt: 'JOKI RIF digital profile application' },
      { src: shots.jokirif.applicationB, label: 'Promo Asset', alt: 'JOKI RIF promotional application' },
      { src: shots.jokirif.applicationC, label: 'Merch Detail', alt: 'JOKI RIF merchandise application' }
    ],
    caseStudy: {
      eyebrow: 'Visual Identity — 01 // Gaming',
      intro:
        'JOKI RIF is presented as a compact digital identity system: the logo needs to remain readable at small sizes while still carrying enough personality for promotional and gaming-related applications.',
      story: [
        {
          number: '01 // CONTEXT',
          title: 'Built for Fast Digital Recognition',
          paragraphs: [
            'The identity is treated as a mark that frequently appears in small digital spaces, where clarity and instant recognition matter more than decorative complexity.',
            'The visual system therefore prioritizes a strong silhouette, controlled contrast, and flexible placement across profile assets, promotional graphics, and merchandise.'
          ]
        },
        {
          number: '02 // DIRECTION',
          title: 'Bold, Compact, and Easy to Repeat',
          paragraphs: [
            'The design direction keeps the logo as the main visual anchor. Supporting applications are intentionally simple so the identity can be repeated consistently without losing impact.',
            'This case study focuses on showing how the same mark behaves across several formats rather than changing the logo itself for every medium.'
          ]
        }
      ]
    }
  },
  {
    id: 'raja-iblis',
    name: 'RAJA 1BLIS E-Sport',
    image: assets.logos.rajaIblis,
    hoverColor: '#ff4d4d',
    subtitle: 'E-Sports Team Identity',
    category: 'Visual Identity',
    year: '2026',
    role: 'Logo Designer',
    description:
      'An assertive identity for an e-sports brand, developed to feel energetic across team apparel, tournament graphics, and digital competitive content.',
    deliverables: ['Logo Design', 'E-Sports Identity', 'Team Applications'],
    caseStudyHref: 'logo-raja-1blis.html',
    gallery: [
      { src: shots.rajaIblis.hero, label: 'Hero Application', alt: 'Raja 1blis E-Sport hero brand application' },
      { src: assets.logos.rajaIblis, label: 'Logo Mark', alt: 'Raja 1blis E-Sport logo mark', fit: 'contain' },
      { src: shots.rajaIblis.applicationA, label: 'Team Jersey', alt: 'Raja 1blis E-Sport jersey application' },
      { src: shots.rajaIblis.applicationB, label: 'Tournament Graphic', alt: 'Raja 1blis E-Sport tournament graphic' },
      { src: shots.rajaIblis.applicationC, label: 'Team Asset', alt: 'Raja 1blis E-Sport team application' }
    ],
    caseStudy: {
      eyebrow: 'Visual Identity — 02 // E-Sports',
      intro:
        'RAJA 1BLIS E-Sport is framed as a competitive identity that must work both as a standalone emblem and as a strong visual anchor across team-facing media.',
      story: [
        {
          number: '01 // CONTEXT',
          title: 'An Identity That Has to Compete Visually',
          paragraphs: [
            'E-sports branding often appears beside other aggressive visual identities, so the logo needs enough presence to remain distinct on jerseys, tournament layouts, and social graphics.',
            'The project is presented around consistency: one recognizable mark, repeated confidently across different competitive applications.'
          ]
        },
        {
          number: '02 // DIRECTION',
          title: 'Energy Without Visual Noise',
          paragraphs: [
            'The application system keeps supporting graphics secondary to the logo, allowing the mark to remain the strongest element in the composition.',
            'The result is a visual identity that can feel energetic without relying on excessive effects or overly complex layouts.'
          ]
        }
      ]
    }
  },
  {
    id: 'minara',
    name: 'MINARA',
    image: assets.logos.minara,
    hoverColor: '#ffb400',
    subtitle: 'Visual Identity for a Mukena Brand',
    category: 'Brand Identity',
    year: '2026',
    role: 'Logo Designer',
    description:
      'A visual identity for a mukena brand, designed to feel calm, refined, and flexible across the product itself, packaging, labels, and supporting brand materials.',
    deliverables: ['Logo Design', 'Brand Identity', 'Packaging Direction'],
    caseStudyHref: 'logo-minara.html',
    gallery: [
      { src: shots.minara.hero, label: 'Hero Application', alt: 'MINARA mukena and packaging hero application' },
      { src: assets.logos.minara, label: 'Logo Mark', alt: 'MINARA logo mark', fit: 'contain' },
      { src: shots.minara.applicationA, label: 'Packaging Box', alt: 'MINARA packaging box application' },
      { src: shots.minara.applicationB, label: 'Fabric Detail', alt: 'MINARA logo applied to mukena fabric' },
      { src: shots.minara.applicationC, label: 'Product Tag', alt: 'MINARA product tag or shopping bag application' }
    ],
    caseStudy: {
      eyebrow: 'Visual Identity — 03 // Modest Fashion',
      intro:
        'MINARA is a mukena brand identity designed to feel elegant and calm while remaining practical enough to live across fabric, packaging, tags, and promotional material.',
      story: [
        {
          number: '01 // CONTEXT',
          title: 'A Logo That Lives on the Product',
          paragraphs: [
            'Unlike an identity that only appears on a screen, MINARA needs to work directly on physical products. The mark has to remain graceful when printed or embroidered on fabric while still feeling premium on packaging.',
            'That makes consistency across scale and material an important part of the identity, not just the appearance of the standalone logo.'
          ]
        },
        {
          number: '02 // DIRECTION',
          title: 'Calm, Refined, and Product-Friendly',
          paragraphs: [
            'The visual direction keeps the identity soft and controlled so it can support the product instead of competing with it.',
            'Applications focus on the moments where customers actually meet the brand: the mukena itself, the box, the product tag, and the unboxing experience.'
          ]
        }
      ]
    }
  },
  {
    id: 'relaska',
    name: 'RELASKA COMPUTER',
    image: assets.logos.relaska,
    hoverColor: '#9b59b6',
    subtitle: 'Computer Store Identity',
    category: 'Brand Identity',
    year: '2026',
    role: 'Logo Designer',
    description:
      'The visual identity behind RELASKA COMPUTER, built to support a technology-focused store experience across digital storefronts, packaging, and branded customer touchpoints.',
    deliverables: ['Logo Design', 'Retail Identity', 'Digital Applications'],
    caseStudyHref: 'logo-relaska.html',
    gallery: [
      { src: shots.relaska.hero, label: 'Hero Application', alt: 'RELASKA COMPUTER hero brand application' },
      { src: assets.logos.relaska, label: 'Logo Mark', alt: 'RELASKA COMPUTER logo mark', fit: 'contain' },
      { src: shots.relaska.applicationA, label: 'Storefront / Web', alt: 'RELASKA COMPUTER storefront or website application' },
      { src: shots.relaska.applicationB, label: 'Packaging', alt: 'RELASKA COMPUTER packaging application' },
      { src: shots.relaska.applicationC, label: 'Retail Detail', alt: 'RELASKA COMPUTER retail identity application' }
    ],
    caseStudy: {
      eyebrow: 'Visual Identity — 04 // Technology Retail',
      intro:
        'RELASKA COMPUTER extends the store project into a visual identity system that can move between digital interfaces and physical retail applications without feeling disconnected.',
      story: [
        {
          number: '01 // CONTEXT',
          title: 'Connecting the Store and the Brand',
          paragraphs: [
            'The logo sits inside a broader e-commerce experience, so it needs to work just as comfortably in navigation bars and product pages as it does on packaging or printed retail material.',
            'The identity is therefore presented as a flexible system rather than a single isolated mark.'
          ]
        },
        {
          number: '02 // DIRECTION',
          title: 'Technical, Clear, and Retail-Ready',
          paragraphs: [
            'The brand applications use the logo as a consistent anchor while allowing the surrounding interface or product photography to carry the detail.',
            'This keeps the identity recognizable without overwhelming the functional nature of a computer retail experience.'
          ]
        }
      ]
    }
  },
  {
    id: 'ptm',
    name: 'PTM LUMBA-LUMBA PISANGAN BARU',
    image: assets.logos.ptm,
    hoverColor: '#00d4ff',
    subtitle: 'Table Tennis Community Identity',
    category: 'Community Identity',
    year: '2026',
    role: 'Logo Designer',
    description:
      'A community identity for PTM Lumba-Lumba Pisangan Baru, prepared to work across team apparel, event material, equipment accessories, and local table-tennis activities.',
    deliverables: ['Logo Design', 'Community Identity', 'Event Applications'],
    caseStudyHref: 'logo-ptm-lumba-lumba.html',
    gallery: [
      { src: shots.ptm.hero, label: 'Hero Application', alt: 'PTM Lumba-Lumba Pisangan Baru hero application' },
      { src: assets.logos.ptm, label: 'Logo Mark', alt: 'PTM Lumba-Lumba Pisangan Baru logo mark', fit: 'contain' },
      { src: shots.ptm.applicationA, label: 'Team Jersey', alt: 'PTM Lumba-Lumba Pisangan Baru jersey application' },
      { src: shots.ptm.applicationB, label: 'Event Banner', alt: 'PTM Lumba-Lumba Pisangan Baru event banner application' },
      { src: shots.ptm.applicationC, label: 'Equipment Detail', alt: 'PTM Lumba-Lumba Pisangan Baru equipment application' }
    ],
    caseStudy: {
      eyebrow: 'Visual Identity — 05 // Table Tennis Community',
      intro:
        'PTM Lumba-Lumba Pisangan Baru is shown as a community identity: recognizable enough for jerseys and events, but flexible enough to appear on equipment, signage, and everyday club material.',
      story: [
        {
          number: '01 // CONTEXT',
          title: 'A Mark for a Real Community',
          paragraphs: [
            'Community identities are seen repeatedly in practical settings: on shirts, banners, tournament material, and equipment. The logo needs to feel familiar and readable rather than overly precious.',
            'The showcase therefore emphasizes repeatability and visibility across the places members are most likely to encounter the identity.'
          ]
        },
        {
          number: '02 // DIRECTION',
          title: 'Recognizable Across Team and Event Media',
          paragraphs: [
            'The applications keep the logo prominent and easy to identify from a distance, especially on team apparel and event graphics.',
            'The identity can then scale down into smaller equipment and accessory placements without changing its core character.'
          ]
        }
      ]
    }
  }
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
