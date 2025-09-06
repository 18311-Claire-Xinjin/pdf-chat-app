"use client";

import { Moon, Sun } from "lucide-react";

import { Button } from "../ui/button";
import { Logo } from "./logo";

import { useTheme } from "@/hooks/use-theme";

export function Header() {
  const { theme, setTheme } = useTheme();

  const handleToggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between bg-background py-4">
      <div className="flex items-center gap-2">
        <Logo />
      </div>
      <div>
        <Button
          className="cursor-pointer"
          onClick={handleToggleTheme}
          size="icon"
          variant="outline"
        >
          {theme === "dark" ? <Sun /> : <Moon />}
        </Button>
      </div>
    </header>
  );
}
