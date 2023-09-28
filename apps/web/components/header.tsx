import Link from "next/link";

import { Icons } from "./icons";
import { ThemeToggle } from "./theme-toggle";
import { buttonVariants } from "./ui/button";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export const Header = () => {
  return (
    <header className="flex items-center justify-between">
      <p className="cursor-pointer text-xl font-semibold tracking-tight">
        npx next-kickstart
      </p>
      <nav className="flex items-center">
        <Link href={siteConfig.links.github} target="_blank" rel="noreferrer">
          <div
            className={cn(
              buttonVariants({
                variant: "ghost",
              }),
              "w-9 px-0",
            )}
          >
            <Icons.github className="h-4 w-4" />
            <span className="sr-only">GitHub</span>
          </div>
        </Link>
        <ThemeToggle />
      </nav>
    </header>
  );
};
