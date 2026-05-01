"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

export default function ClientLayout({ children }) {
    return (
        <>
            <Navbar />
            <main className="flex-1">
                {children}
            </main>
            <Footer />
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
