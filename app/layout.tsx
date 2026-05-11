import "./globals.css";
import type { ReactNode } from "react";
import { Be_Vietnam_Pro, Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter",
  display: "swap",
});

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-be-vietnam",
  display: "swap",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      className={`${inter.variable} ${beVietnamPro.variable}`}
      lang="en"
      data-scroll-behavior="smooth"
    >
      <body className="font-sans antialiased" cz-shortcut-listen="true">
        {children}
      </body>
    </html>
  );
}
