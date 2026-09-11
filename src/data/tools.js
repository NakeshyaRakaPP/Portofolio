import figmaLogo from '../img/tools/Logo Figma.png';
import mysqlLogo from '../img/tools/Logo MySQL.png';
import bootstrapLogo from '../img/tools/Logo Bootstrap.png';
import laravelLogo from '../img/tools/Logo Laravel.png';
import codeigniterLogo from '../img/tools/Logo CodeIgniter.png';
import blenderLogo from '../img/tools/Logo Blender.png';
import rapidminerLogo from '../img/tools/Logo RapidMiner.png';
import canvaLogo from '../img/tools/Logo Canva.png';
import gitLogo from '../img/tools/Logo Git.png';
import vscodeLogo from '../img/tools/Logo VS Code.png';
import capcutLogo from '../img/tools/Logo CapCut.png';

/**
 * Single source of truth untuk Tools & Technologies.
 *
 * Kalau nanti mau:
 * - ganti nama
 * - ganti level
 * - ganti deskripsi
 * - ganti logo
 *
 * cukup ubah file ini.
 */

export const tools = [
  {
    id: 'figma',
    name: 'Figma',
    level: 88,
    logo: figmaLogo,
    description:
      'UI/UX design, wireframing, prototyping, design systems, and interface exploration.'
  },

  {
    id: 'mysql',
    name: 'MySQL',
    level: 82,
    logo: mysqlLogo,
    description:
      'Relational database design, SQL queries, data modeling, and application database integration.'
  },

  {
    id: 'bootstrap',
    name: 'Bootstrap',
    level: 90,
    logo: bootstrapLogo,
    description:
      'Responsive layouts, reusable components, grid systems, and rapid interface development.'
  },

  {
    id: 'laravel',
    name: 'Laravel',
    level: 84,
    logo: laravelLogo,
    description:
      'MVC web development, routing, Blade templates, CRUD systems, authentication, and database integration.'
  },

  {
    id: 'blender',
    name: 'Blender',
    level: 62,
    logo: blenderLogo,
    description:
      '3D modeling, scene composition, basic lighting, asset creation, and visual experimentation.'
  },

  {
    id: 'rapidminer',
    name: 'RapidMiner',
    level: 70,
    logo: rapidminerLogo,
    description:
      'Data preparation, analytical workflows, regression modeling, and machine learning experiments.'
  },

  {
    id: 'codeigniter',
    name: 'CodeIgniter',
    level: 76,
    logo: codeigniterLogo,
    description:
      'PHP web application development using MVC architecture, routing, CRUD operations, and database integration.'
  },

  {
    id: 'canva',
    name: 'Canva',
    level: 92,
    logo: canvaLogo,
    description:
      'Visual design, social media assets, presentation layouts, branding materials, and rapid creative production.'
  },

  {
    id: 'git',
    name: 'GitHub / Lab',
    level: 80,
    logo: gitLogo,
    description:
      'Version control, repository management, branching workflows, collaboration, and project deployment.'
  },

  {
    id: 'vscode',
    name: 'VS Code',
    level: 93,
    logo: vscodeLogo,
    description:
      'Primary development environment for coding, debugging, project organization, extensions, and workflow optimization.'
  },

  {
    id: 'capcut',
    name: 'CapCut',
    level: 78,
    logo: capcutLogo,
    description:
      'Video editing, motion graphics, transitions, timing, audio synchronization, and short-form visual content.'
  }
];