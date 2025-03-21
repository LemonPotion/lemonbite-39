
import React from 'react';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <footer className="py-6 px-6 text-center text-sm text-gray-500 bg-white border-t border-gray-100">
        <p>© {new Date().getFullYear()} LemonBite. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
