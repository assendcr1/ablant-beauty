import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Providers } from "@/components/layout/Providers";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: { default: "AblantBeauty", template: "%s | AblantBeauty" },
  description: "Premium wigs curated by Vanessa Ablant",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "#0a0a0a",
                color: "#ffffff",
                fontSize: "14px",
                borderRadius: "4px",
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
