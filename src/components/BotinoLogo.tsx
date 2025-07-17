import React from "react";
import { cn } from "@/lib/utils";

interface BotinoLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "compact" | "full";
  animated?: boolean;
}

export const BotinoLogo: React.FC<BotinoLogoProps> = ({
  className,
  size = "md",
  variant = "full",
  animated = true,
}) => {
  const sizeClasses = {
    sm: variant === "compact" ? "h-10 w-10" : "h-14 max-w-[180px]",
    md: variant === "compact" ? "h-12 w-12" : "h-20 max-w-[260px]",
    lg: variant === "compact" ? "h-16 w-16" : "h-28 max-w-[340px]",
    xl: variant === "compact" ? "h-20 w-20" : "h-36 max-w-[420px]",
  };

  const logoSrc =
    variant === "compact"
      ? "/pictures/compact-logo.png"
      : "/pictures/big-logo.png";

  return (
    <div
      className={cn("flex items-center justify-center", className)}
    >
      <img
        src={logoSrc}
        alt="Botino Logo"
        className={cn(
          "object-contain drop-shadow-sm",
          sizeClasses[size],
          variant === "compact" && "object-cover rounded-sm",
          animated &&
            "hover:scale-105 hover:drop-shadow-lg transition-all duration-700 ease-out hover:brightness-110"
        )}
        style={
          variant === "compact"
            ? {
                filter: "drop-shadow(0 1px 2px rgb(0 0 0 / 0.1))",
                objectPosition: "center",
              }
            : undefined
        }
      />
    </div>
  );
};
