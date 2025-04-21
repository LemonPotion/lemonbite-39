
import React from "react";
import { LoaderCircle } from "lucide-react";

const LoadingSpinner: React.FC<{ text?: string }> = ({ text = "Генерируем рекомендации..." }) => (
  <div className="flex flex-col items-center justify-center py-8" aria-busy="true" aria-live="polite">
    <div className="relative mb-3">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-accent border-opacity-40 border-r-4 border-b-transparent border-l-transparent" />
      <LoaderCircle className="absolute inset-0 m-auto text-accent/70" size={32} />
      {/* Pulsing dots */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex gap-1 pb-2">
        <span className="dot-pulse" />
        <span className="dot-pulse" />
        <span className="dot-pulse" />
      </div>
    </div>
    <span className="text-accent text-sm mt-2">{text}</span>
  </div>
);

export default LoadingSpinner;
