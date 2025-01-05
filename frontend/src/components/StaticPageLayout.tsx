import React from 'react';

interface StaticPageLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

function StaticPageLayout({ title, subtitle, children }: StaticPageLayoutProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center">{title}</h1>
      <p className="text-gray-600 text-center mt-2">{subtitle}</p>
      <div className="mt-8">
        {children}
      </div>
    </div>
  );
}

export default StaticPageLayout; 