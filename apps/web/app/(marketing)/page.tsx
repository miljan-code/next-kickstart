import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <header className="flex items-center justify-between">
      <h1>Next Kickstart</h1>
      <ThemeToggle />
    </header>
  );
}
