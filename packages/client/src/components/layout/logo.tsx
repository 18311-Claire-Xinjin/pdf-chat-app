import { cn } from "@/lib/utils";
import { PdfIcon } from "@/svgs";

type LogoProps = {
  className?: string;
};

export function Logo({ className = "" }: LogoProps) {
  return (
    <div
      className={cn(
        "flex size-10 items-center justify-center rounded-lg bg-rose-700 text-white",
        className
      )}
    >
      <PdfIcon />
    </div>
  );
}
