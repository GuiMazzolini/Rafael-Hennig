import React from 'react';

interface PageShellProps {
  children: React.ReactNode;
}

export const PageShell: React.FC<PageShellProps> = ({ children }) => {
  return (
    <div className="relative warm-surface min-h-[50vh]">
      <div className="grain-overlay" aria-hidden="true" />
      <div className="relative pt-28 md:pt-36 pb-16 md:pb-24">
        {children}
      </div>
    </div>
  );
};
