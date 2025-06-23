
import React from "react";
import { LoaderCircle } from "lucide-react";

const LoadingSpinner: React.FC<{
  text?: string;
}> = ({
  text = "Генерируем рекомендации..."
}) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <LoaderCircle className="h-8 w-8 animate-spin text-accent" />
      <p className="text-sm text-muted-foreground">{text}</p>
    </div>
  );
};

export default LoadingSpinner;
