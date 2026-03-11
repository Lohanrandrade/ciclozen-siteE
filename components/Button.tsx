
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const CTAButton: React.FC<ButtonProps> = ({ children, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`
        bg-[#800020] text-[#d4af37] font-bold py-5 px-8 rounded-full 
        text-lg md:text-xl shadow-lg hover:bg-[#600018] 
        transition-all transform hover:scale-105 active:scale-95
        w-full max-w-md uppercase tracking-wide flex items-center justify-center gap-2
        border border-[#d4af37]/30
        ${className}
      `}
    >
      {children}
    </button>
  );
};
