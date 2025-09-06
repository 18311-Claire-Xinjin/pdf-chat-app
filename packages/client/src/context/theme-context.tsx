import { createContext } from "react";
import type { Theme } from "@/types";

type ThemeState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeState = {
  theme: "system",
  setTheme: () => null,
};

export const ThemeContext = createContext<ThemeState>(initialState);
