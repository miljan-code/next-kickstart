import { Header } from "@/components/header";
import styles from "@/styles/background.module.css";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col justify-between">
      <div className={styles.main}>
        <div className={styles.content}>
          <Header />
          {children}
        </div>
      </div>
    </div>
  );
}
