
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

const Navigation = () => {
  const location = useLocation();
  const isMobile = useIsMobile();

  const links = [
    { path: '/', label: 'Меню' },
    { path: '/history', label: 'История' },
  ];

  return (
    <nav className={cn(
      "flex", 
      isMobile ? "flex-col space-y-2" : "space-x-6"
    )}>
      {links.map(({ path, label }) => {
        const isActive = location.pathname === path;
        return (
          <Link
            key={path}
            to={path}
            className={cn(
              "relative px-2 py-1.5 transition-colors",
              isActive ? "text-foreground" : "text-foreground/60 hover:text-foreground"
            )}
          >
            {label}
            {isActive && (
              <motion.div
                layoutId="navigation-underline"
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent"
                initial={false}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
};

export default Navigation;
