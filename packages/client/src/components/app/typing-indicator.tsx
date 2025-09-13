type DotProps = {
  className?: string;
};

const Dot = ({ className }: DotProps) => (
  <div
    className={`w-2 h-2 rounded-full bg-muted-foreground animate-pulse ${className}`}
  />
);

export function TypingIndicator() {
  return (
    <div className="flex self-start gap-1 px-3 py-2 rounded-lg bg-muted/30 border border-muted/50 text-muted-foreground mb-10">
      <Dot />
      <Dot className="[animation-delay:0.2s]" />
      <Dot className="[animation-delay:0.4s]" />
    </div>
  );
}
