"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useState } from "react";

export default function Navbar() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
    toast.success("Logged out successfully!");
    router.push("/");
    router.refresh();
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-amber-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
              <span className="text-white text-lg font-bold">☀</span>
            </div>
            <span className="font-display font-bold text-xl text-gray-800">
              Sun<span className="text-amber-500">Cart</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-gray-600 hover:text-amber-500 font-medium transition-colors text-sm">
              Home
            </Link>
            <Link href="/#products" className="text-gray-600 hover:text-amber-500 font-medium transition-colors text-sm">
              Products
            </Link>
            {session && (
              <Link href="/my-profile" className="text-gray-600 hover:text-amber-500 font-medium transition-colors text-sm">
                My Profile
              </Link>
            )}
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-3">
            {isPending ? (
              <div className="loading loading-spinner loading-sm text-amber-500"></div>
            ) : session ? (
              <div className="flex items-center gap-3">
                <Link href="/my-profile" className="flex items-center gap-2 group">
                  {session.user?.image ? (
                    <Image
                      src={session.user.image}
                      alt={session.user.name || "User"}
                      width={36}
                      height={36}
                      className="rounded-full border-2 border-amber-400 group-hover:border-amber-500 transition-colors object-cover"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold text-sm">
                      {session.user?.name?.[0]?.toUpperCase() || "U"}
                    </div>
                  )}
                  <span className="text-sm font-semibold text-gray-700 max-w-[100px] truncate">
                    {session.user?.name}
                  </span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="btn btn-sm bg-gray-100 hover:bg-red-50 hover:text-red-600 border-0 text-gray-600 font-medium transition-all"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link href="/login" className="btn btn-sm btn-ghost text-gray-600 font-medium">
                  Login
                </Link>
                <Link href="/register" className="btn btn-sm bg-amber-500 hover:bg-amber-600 text-white border-0 shadow-sm">
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden btn btn-ghost btn-sm"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden py-4 border-t border-amber-100 animate__animated animate__fadeInDown animate__faster">
            <div className="flex flex-col gap-3">
              <Link href="/" className="text-gray-600 hover:text-amber-500 font-medium py-1" onClick={() => setMenuOpen(false)}>
                Home
              </Link>
              <Link href="/#products" className="text-gray-600 hover:text-amber-500 font-medium py-1" onClick={() => setMenuOpen(false)}>
                Products
              </Link>
              {session && (
                <Link href="/my-profile" className="text-gray-600 hover:text-amber-500 font-medium py-1" onClick={() => setMenuOpen(false)}>
                  My Profile
                </Link>
              )}
              <div className="pt-2 border-t border-gray-100 flex flex-col gap-2">
                {session ? (
                  <>
                    <div className="flex items-center gap-2 py-1">
                      {session.user?.image ? (
                        <Image src={session.user.image} alt="User" width={28} height={28} className="rounded-full border border-amber-400" />
                      ) : (
                        <div className="w-7 h-7 rounded-full bg-amber-400 flex items-center justify-center text-white text-xs font-bold">
                          {session.user?.name?.[0]?.toUpperCase()}
                        </div>
                      )}
                      <span className="text-sm font-semibold text-gray-700">{session.user?.name}</span>
                    </div>
                    <button onClick={handleLogout} className="btn btn-sm btn-error btn-outline w-full">
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/login" className="btn btn-sm btn-outline border-amber-400 text-amber-600 w-full" onClick={() => setMenuOpen(false)}>
                      Login
                    </Link>
                    <Link href="/register" className="btn btn-sm bg-amber-500 text-white border-0 w-full" onClick={() => setMenuOpen(false)}>
                      Register
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
