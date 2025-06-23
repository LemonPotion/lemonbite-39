import React from "react";
import { LoaderCircle } from "lucide-react";
const LoadingSpinner: React.FC<{
  text?: string;
}> = ({
  text = "Генерируем рекомендации..."
}) => {};
export default LoadingSpinner;