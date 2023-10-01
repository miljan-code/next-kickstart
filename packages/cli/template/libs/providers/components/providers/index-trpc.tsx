import { ThemeProvider } from "./theme-provider";
import { TrpcProvider } from "./trpc-provider";

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <TrpcProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </TrpcProvider>
  );
};
