import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AMX OS - Bespoke Android Reskin System",
  description: "Elevate your Android screen layout with elegant, glassy widgets inspired by macOS glass.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}