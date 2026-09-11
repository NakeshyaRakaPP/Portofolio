import HomePage from './HomePage';
import CaseStudyPage from './components/CaseStudy/CaseStudyPage';
import NotFoundPage from './components/CaseStudy/NotFoundPage';

export default function App() {
  const page = document.body.dataset.page || 'home';

  if (page === 'relaska') return <CaseStudyPage studyId="relaska" />;
  if (page === 'ecommerce') return <CaseStudyPage studyId="ecommerce" />;
  if (page === '404') return <NotFoundPage />;
  return <HomePage />;
}
