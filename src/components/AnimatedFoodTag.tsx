
import React, { useState, useEffect } from 'react';

interface AnimatedFoodTagProps {
  tag: string;
  index: number;
}

const AnimatedFoodTag: React.FC<AnimatedFoodTagProps> = ({ tag, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  useEffect(() => {
    // Stagger the appearance of tags
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100 + index * 50);
    
    return () => clearTimeout(timer);
  }, [index]);
  
  return (
    <span 
      className={`inline-block bg-muted/80 px-2 py-1 rounded-full text-xs font-medium text-foreground/70 transition-all duration-300
        ${isVisible ? 'opacity-100 transform-none' : 'opacity-0 transform translate-y-1'}
        ${isHovered ? 'scale-110 bg-accent/20' : ''}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {tag}
    </span>
  );
};

export default AnimatedFoodTag;
