import React from 'react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 p-10 bg-gray-50">
        {children}
      </div>
    </div>
  );
}