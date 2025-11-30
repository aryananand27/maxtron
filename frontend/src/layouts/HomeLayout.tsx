import React from 'react';
import TopMenuBar from '../components/TopMenuBar';

interface HomeLayoutProps {
  children: React.ReactNode;
}

const HomeLayout: React.FC<HomeLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col w-screen h-screen overflow-hidden">
      <TopMenuBar />
      <main className="flex-1 bg-gradient-to-br from-blue-50 to-indigo-50 overflow-auto">
        {children}
      </main>
    </div>
  );
};

export default HomeLayout;