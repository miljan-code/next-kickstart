import type { Metadata } from "next";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { siteConfig } from "@/config/site";
import { fontHeading, fontSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";

import "@/styles/globals.css";

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(fontSans.variable, fontHeading.variable, "font-sans")}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
