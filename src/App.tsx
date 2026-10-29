import React from 'react';
import { ResumeProvider } from './context/ResumeContext';
import { ResumeGateModal } from './components/ResumeGateModal';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MetricsRibbon } from './components/MetricsRibbon';
import { ProjectsSection } from './components/ProjectsSection';
import { CaseStudiesSection } from './components/CaseStudiesSection';
import { S2STPipelineLab } from './components/S2STPipelineLab';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { SkillsMatrix } from './components/SkillsMatrix';
import { PublicationCard } from './components/PublicationCard';
import { ContactTerminal } from './components/ContactTerminal';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  return (
    <ResumeProvider>
      <div className="min-h-screen bg-canvas-950 text-slate-200 flex flex-col selection:bg-slate-700 selection:text-white">
        <Navbar />
        <main className="flex-grow">
          <Hero />
          <MetricsRibbon />
          <ProjectsSection />
          <CaseStudiesSection />
          <S2STPipelineLab />
          <ExperienceTimeline />
          <SkillsMatrix />
          <PublicationCard />
          <ContactTerminal />
        </main>
        <Footer />
        <ResumeGateModal />
      </div>
    </ResumeProvider>
  );
};

export default App;
