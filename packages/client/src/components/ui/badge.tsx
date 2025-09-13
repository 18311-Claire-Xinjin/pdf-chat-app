import React from "react";
import { cn } from "@/lib/utils";

const variants = {
  gray: "bg-[#ebebeb] dark:bg-[#1f1f1f] text-[#171717] dark:text-[#ededed]",
  blue: "bg-[#e9f4ff] dark:bg-[#022248] text-[#005ff2] dark:text-[#47a8ff]",
  purple: "bg-[#f9f0ff] dark:bg-[#341142] text-[#7d00cc] dark:text-[#c472fb]",
  amber: "bg-[#fff4cf] dark:bg-[#361900] text-[#aa4d00] dark:text-[#ff9300]",
  red: "bg-[#ffe8ea] dark:bg-[#440d13] text-[#d8001b] dark:text-[#ff565f]",
  pink: "bg-[#ffdfeb] dark:bg-[#571032] text-[#c41562] dark:text-[#ff4d8d]",
  green: "bg-[#e5fce7] dark:bg-[#00320b] text-[#107d32] dark:text-[#00ca50]",
  teal: "bg-[#ccf9f1] dark:bg-[#003d34] text-[#007f70] dark:text-[#00cfb7]",
};

interface BadgeProps {
  children?: React.ReactNode;
  variant?: keyof typeof variants;
  icon?: React.ReactNode;
  className?: string;
}

export const Badge = ({
  children,
  variant = "gray",
  icon,
  className = "",
}: BadgeProps) => {
  return (
    <div
      className={cn(
        "inline-flex justify-center items-center shrink-0",
        "font-bricolage font-medium whitespace-nowrap rounded-sm",
        "text-sm py-2 px-2.5 tracking-normal gap-1",
        variants[variant],
        className
      )}
    >
      {icon && <span>{icon}</span>}
      {children}
    </div>
  );
};
