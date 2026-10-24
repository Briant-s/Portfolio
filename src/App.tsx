import { Route, Routes } from 'react-router-dom';
import { ReactLenis } from 'lenis/react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CursorGlow } from './components/CursorGlow';
import { ScrollToTop } from './components/ScrollToTop';
import { HomePage } from './pages/HomePage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';

export default function App() {
  return (
    // `root` makes Lenis drive the window/<html> scroll for the whole app.
    <ReactLenis root options={{ lerp: 0.1, smoothWheel: true }}>
      <CursorGlow />
      <ScrollToTop />
      <Header />
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:slug" element={<ProjectDetailPage />} />
        </Routes>
      </main>
      <Footer />
    </ReactLenis>
  );
}
