import { ThemeProvider } from "./theme-provider";
import { AuthProvider } from "./auth-provider";
import { TrpcProvider } from "./trpc-provider";

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <AuthProvider>
      <TrpcProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </TrpcProvider>
    </AuthProvider>
  );
};
