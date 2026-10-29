import React, { createContext, useContext, useState } from 'react';

interface ResumeContextType {
  isResumeModalOpen: boolean;
  openResumeModal: () => void;
  closeResumeModal: () => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  const openResumeModal = () => setIsResumeModalOpen(true);
  const closeResumeModal = () => setIsResumeModalOpen(false);

  return (
    <ResumeContext.Provider value={{ isResumeModalOpen, openResumeModal, closeResumeModal }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResumeGate = (): ResumeContextType => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResumeGate must be used within a ResumeProvider');
  }
  return context;
};
