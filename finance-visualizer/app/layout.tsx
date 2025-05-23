import type { Metadata } from "next";
import "./globals.css"; // keep only Tailwind base

export const metadata: Metadata = {
  title: "Personal Finance Visualizer",
  description: "Track and visualize your personal finances easily",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
