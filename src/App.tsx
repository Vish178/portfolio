import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MetricsRibbon } from './components/MetricsRibbon';
import { ProjectsSection } from './components/ProjectsSection';
import { S2STPipelineLab } from './components/S2STPipelineLab';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { SkillsMatrix } from './components/SkillsMatrix';
import { PublicationCard } from './components/PublicationCard';
import { ContactTerminal } from './components/ContactTerminal';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-carbon-950 text-slate-100 flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <MetricsRibbon />
        <ProjectsSection />
        <S2STPipelineLab />
        <ExperienceTimeline />
        <SkillsMatrix />
        <PublicationCard />
        <ContactTerminal />
      </main>
      <Footer />
    </div>
  );
};

export default App;
