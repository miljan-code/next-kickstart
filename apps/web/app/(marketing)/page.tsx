import Link from "next/link";

import { CodeCard } from "@/components/code-card";
import { CopyCmdTooltip } from "@/components/copy-cmd-tooltip";
import { Icons } from "@/components/icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center space-y-2 py-16 text-center">
        <Link
          href={siteConfig.links.docs}
          target="_blank"
          className={cn(
            buttonVariants({ size: "sm" }),
            "gap-2 rounded-full bg-button pl-6 pr-5 text-accent-foreground transition-colors hover:bg-button-hover",
          )}
        >
          <span>Documentation</span>
          <Icons.arrowRight size={12} />
        </Link>
        <h2 className="pb-4 text-5xl font-bold leading-[50px] tracking-tight">
          All-in-one toolkit for <br />
          <span className="bg-gradient-to-r from-primary via-secondary to-tertiary bg-clip-text text-transparent">
            full-stack, typesafe
          </span>{" "}
          <br />
          applications
        </h2>
        <Button className="gap-4 border border-primary/75 bg-button text-accent-foreground transition-colors hover:bg-button-hover">
          <span>npx next-kickstart</span>
          <CopyCmdTooltip />
        </Button>
      </div>
      <CodeCard />
    </>
  );
}
