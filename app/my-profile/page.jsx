"use client";

import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function MyProfilePage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-amber-500"></span>
      </div>
    );
  }

  if (!session) return null;

  const user = session.user;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 py-16 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Profile Card */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden animate__animated animate__fadeInUp">
          {/* Cover */}
          <div className="h-32 bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 relative">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-4 left-10 text-4xl sun-rotate">☀</div>
              <div className="absolute bottom-4 right-10 text-3xl wave-float">🌊</div>
            </div>
          </div>

          {/* Avatar */}
          <div className="px-8 pb-8">
            <div className="-mt-14 flex items-end justify-between mb-6">
              <div className="relative">
                {user?.image ? (
                  <Image
                    src={user.image}
                    alt={user.name || "User"}
                    width={100}
                    height={100}
                    className="rounded-full border-4 border-white shadow-lg object-cover w-24 h-24"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                    <span className="text-white font-display font-black text-4xl">
                      {user?.name?.[0]?.toUpperCase() || "U"}
                    </span>
                  </div>
                )}
                <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-400 rounded-full border-2 border-white"></div>
              </div>
              <Link
                href="/my-profile/update"
                className="btn btn-sm bg-amber-500 hover:bg-amber-600 text-white border-0 rounded-xl font-semibold shadow-sm gap-1.5"
              >
                ✏️ Update Info
              </Link>
            </div>

            {/* User Info */}
            <div className="mb-6">
              <h1 className="font-display text-3xl font-black text-gray-900">{user?.name || "User"}</h1>
              <p className="text-gray-500 text-sm mt-1 flex items-center gap-1">
                <span>✉️</span> {user?.email}
              </p>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4">
                <p className="text-xs text-amber-600 font-semibold uppercase tracking-wide mb-1">Full Name</p>
                <p className="text-gray-800 font-semibold">{user?.name || "—"}</p>
              </div>
              <div className="bg-sky-50 border border-sky-100 rounded-2xl p-4">
                <p className="text-xs text-sky-600 font-semibold uppercase tracking-wide mb-1">Email</p>
                <p className="text-gray-800 font-semibold text-sm truncate">{user?.email || "—"}</p>
              </div>
              <div className="bg-green-50 border border-green-100 rounded-2xl p-4">
                <p className="text-xs text-green-600 font-semibold uppercase tracking-wide mb-1">Account Status</p>
                <p className="text-gray-800 font-semibold flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full inline-block"></span> Active Member
                </p>
              </div>
              <div className="bg-purple-50 border border-purple-100 rounded-2xl p-4">
                <p className="text-xs text-purple-600 font-semibold uppercase tracking-wide mb-1">Member Since</p>
                <p className="text-gray-800 font-semibold">
                  {user?.createdAt
                    ? new Date(user.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })
                    : "2024"}
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-5 text-white">
              <h3 className="font-display font-bold text-lg mb-4">My Summer Stats ☀️</h3>
              <div className="grid grid-cols-3 gap-4">
                {[["0", "Orders"], ["0", "Wishlist"], ["0", "Reviews"]].map(([num, label]) => (
                  <div key={label} className="text-center">
                    <div className="font-display text-3xl font-black">{num}</div>
                    <div className="text-white/70 text-xs mt-0.5">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/#all-products" className="btn btn-sm btn-outline border-amber-300 text-amber-600 rounded-xl font-medium">
                🛍️ Browse Products
              </Link>
              <Link href="/my-profile/update" className="btn btn-sm btn-outline border-gray-200 text-gray-600 rounded-xl font-medium">
                ✏️ Edit Profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
