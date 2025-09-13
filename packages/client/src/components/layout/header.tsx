"use client";

import { Moon, Sun } from "lucide-react";

import { Button } from "../ui/button";
import { Logo } from "./logo";
import { GitHubIcon } from "@/svgs/github-icon";

import { useTheme } from "@/hooks/use-theme";

export function Header() {
  const { theme, setTheme } = useTheme();

  const handleToggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between py-4 bg-background">
      <div className="flex items-center gap-2">
        <Logo />
      </div>
      <div className="flex gap-2 items-center">
        <Button
          className="cursor-pointer"
          onClick={handleToggleTheme}
          size="icon"
          variant="outline"
        >
          {theme === "dark" ? <Sun /> : <Moon />}
        </Button>

        <Button asChild>
          <a
            href="https://github.com/thedreamydev/pdf-chat-app"
            target="_blank"
          >
            <GitHubIcon />
            <span>Star on GitHub</span>
          </a>
        </Button>

        {/* <Button
          onClick={handleDeleteSession}
          disabled={isDeletingSession}
          variant="outline"
          size="icon"
          className="cursor-pointer [&_svg]:text-rose-500"
        >
          {isDeletingSession ? <Loader className="animate-spin" /> : <Trash2 />}
        </Button> */}
      </div>
    </header>
  );
}
