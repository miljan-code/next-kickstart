import { Inter } from "next/font/google";
import localFont from "next/font/local";

export const fontSans = Inter({ subsets: ["latin"], variable: "--font-sans" });
export const fontHeading = localFont({
  src: "../assets/fonts/CalSans-SemiBold.woff2",
  variable: "--font-heading",
});
