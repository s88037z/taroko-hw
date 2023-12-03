import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import { DialogProvider } from "@/app/_context/DialogContext";
import { NotificationProvider } from "@/app/_context/NotificationContext";
import "./globals.css";
import styles from "./layout.module.css";

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
        <NotificationProvider>
          <DialogProvider>
            <Navbar />
            <div className={styles.container}>{children}</div>
          </DialogProvider>
        </NotificationProvider>
      </body>
    </html>
  );
}
