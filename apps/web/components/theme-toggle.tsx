"use client";

import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="w-9 px-0">
          <SunIcon
            data-theme={theme}
            className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all data-[theme=dark]:-rotate-90 data-[theme=system]:-rotate-90 data-[theme=dark]:scale-0 data-[theme=system]:scale-0"
          />
          <MoonIcon
            data-theme={theme}
            className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all data-[theme=dark]:rotate-0 data-[theme=system]:rotate-0 data-[theme=dark]:scale-100 data-[theme=system]:scale-100"
          />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
