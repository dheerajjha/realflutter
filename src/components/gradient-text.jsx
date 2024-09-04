import { cn } from "@/lib/utils";
import React from "react";

const GradientText = ({ className, text = "" }) => {
  return (
    <span className={cn(className, "relative inline-block")}>
      <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#16509B] to-[#62A5DA] opacity-75 mix-blend-overlay" />
      <span className="relative z-10">{text}</span>
    </span>
  );
};

export default GradientText;
