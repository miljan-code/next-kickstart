"use client";

import { Icons } from "./icons";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const CopyCmdTooltip = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Icons.copy size={12} />
        </TooltipTrigger>
        <TooltipContent>
          <p>Copy command</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
