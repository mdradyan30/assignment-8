"use client";

import { Toaster } from "react-hot-toast";

export default function AuthProvider({ children }) {
  return (
    <>
      {children}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#1f2937",
            color: "#fff",
            borderRadius: "12px",
            padding: "12px 20px",
            fontFamily: "Nunito, sans-serif",
            fontWeight: "500",
          },
          success: {
            iconTheme: { primary: "#f59e0b", secondary: "#fff" },
          },
          error: {
            iconTheme: { primary: "#ef4444", secondary: "#fff" },
          },
        }}
      />
    </>
  );
}
