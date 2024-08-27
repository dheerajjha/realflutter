import { cn } from "@/lib/utils";
import React from "react";

const GradientText = ({ className, text = "" }) => {
  return (
    <span
      className={cn(
        className,
        "bg-gradient-to-r from-[#16509B] to-[#62A5DA] bg-clip-text text-transparent"
      )}
    >
      {text}
    </span>
  );
};

export default GradientText;
