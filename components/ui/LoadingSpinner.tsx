/**
 * Loading Spinner Component
 * Animated loading indicator
 */

import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  text?: string;
  className?: string;
}

const SIZES = {
  sm: 20,
  md: 32,
  lg: 48,
};

export function LoadingSpinner({
  size = "md",
  text,
  className,
}: LoadingSpinnerProps) {
  return (
    <div className={cn("loading-spinner", className)}>
      <Loader2 size={SIZES[size]} className="spinner" />
      {text && <p className="loading-text">{text}</p>}
    </div>
  );
}
