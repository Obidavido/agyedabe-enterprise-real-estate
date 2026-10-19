import type { Metadata, Viewport } from "next";
import { PropertyStoreProvider } from "@/components/admin/PropertyStoreProvider";
import "@fontsource-variable/manrope";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "AGYEDABE ENTERPRISE | Building Consultants & Real Estate",
    template: "%s | AGYEDABE ENTERPRISE",
  },
  description:
    "Discover property opportunities and building consultancy support with AGYEDABE ENTERPRISE in Ghana.",
  icons: { icon: "/brand/06_icon-only.png" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#103D2E",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body><PropertyStoreProvider>{children}</PropertyStoreProvider></body>
    </html>
  );
}
