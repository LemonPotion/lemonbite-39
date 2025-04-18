
import React from 'react';
import { motion } from 'framer-motion';

interface ConfettiProps {
  x: number;
  y: number;
}

const Confetti: React.FC<ConfettiProps> = ({ x, y }) => {
  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD'];
  
  return (
    <div className="fixed pointer-events-none" style={{ left: x, top: y }}>
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          initial={{
            opacity: 1,
            scale: 0,
          }}
          animate={{
            opacity: 0,
            scale: 1,
            x: Math.random() * 200 - 100,
            y: Math.random() * 200 - 100,
            rotate: Math.random() * 360,
          }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
          style={{
            backgroundColor: colors[Math.floor(Math.random() * colors.length)],
          }}
        />
      ))}
    </div>
  );
};

export default Confetti;
