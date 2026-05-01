import "./globals.css";
import ClientLayout from "@/components/ClientLayout";

export const metadata = {
  title: "SunCart – Summer Essentials Store",
  description: "Your one-stop destination for summer essentials. Shop sunglasses, beach accessories, skincare, and more.",
  keywords: "summer, sunglasses, skincare, beach accessories, summer sale",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="suncart">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>☀️</text></svg>" />
      </head>
      <body className="min-h-screen flex flex-col bg-white">
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
