import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

export const metadata = {
  title: "Health Monitor",
  description: "Healthcare Management System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}