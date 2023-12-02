import type { Metadata } from "next";
import "./globals.css";
import styles from "./layout.module.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Contacts App",
  description: "Display contacts list",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <div className={styles.container}>{children}</div>
      </body>
    </html>
  );
}
