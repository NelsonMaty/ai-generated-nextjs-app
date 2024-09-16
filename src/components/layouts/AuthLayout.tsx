import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
}

export default function AuthLayout({ children, title }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 bg-cover bg-center" style={{ backgroundImage: "url('/hero.jpg')" }}>
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">{title}</h2>
        </div>
        {children}
      </div>
    </div>
  );
}