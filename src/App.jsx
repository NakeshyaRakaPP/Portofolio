import HomePage from './HomePage';
import CaseStudyPage from './components/CaseStudy/CaseStudyPage';
import LogoCaseStudyPage from './components/CaseStudy/LogoCaseStudyPage';
import NotFoundPage from './components/CaseStudy/NotFoundPage';

export default function App() {
  const page = document.body.dataset.page || 'home';

  if (page === 'relaska') return <CaseStudyPage studyId="relaska" />;
  if (page === 'ecommerce') return <CaseStudyPage studyId="ecommerce" />;

  if (page.startsWith('logo-')) {
    return (
      <LogoCaseStudyPage
        studyId={page.replace('logo-', '')}
      />
    );
  }

  if (page === '404') return <NotFoundPage />;
  return <HomePage />;
}
