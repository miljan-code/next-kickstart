import { CodeCard } from "@/components/code-card";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center space-y-2 py-16 text-center">
        <Button
          size="sm"
          className="bg-button hover:bg-button-hover rounded-full px-6 text-accent-foreground transition-colors"
        >
          Documentation
        </Button>
        <h2 className="text-5xl font-bold leading-[50px] tracking-tight">
          All-in-one toolkit for <br />
          <span className="to-tertiary bg-gradient-to-r from-primary via-secondary bg-clip-text text-transparent">
            full-stack, typesafe
          </span>{" "}
          <br />
          applications
        </h2>
      </div>
      <CodeCard />
    </>
  );
}
