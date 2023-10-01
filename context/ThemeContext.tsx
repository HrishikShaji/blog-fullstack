"use client";

import { ReactNode, createContext } from "react";

export const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
  return <ThemeContext.Provider>{children}</ThemeContext.Provider>;
};
