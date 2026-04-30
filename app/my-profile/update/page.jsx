"use client";

import { useState, useEffect } from "react";
import { useSession, authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";

export default function UpdateProfilePage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", image: "" });
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
      return;
    }
    if (session?.user) {
      setFormData({
        name: session.user.name || "",
        image: session.user.image || "",
      });
      setPreview(session.user.image || "");
    }
  }, [session, isPending, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "image") setPreview(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await authClient.updateUser({
        name: formData.name,
        image: formData.image || undefined,
      });

      if (result?.error) {
        toast.error(result.error.message || "Update failed.");
      } else {
        toast.success("Profile updated successfully! 🎉");
        router.push("/my-profile");
        router.refresh();
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-amber-500"></span>
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-cyan-50 to-teal-50 py-16 px-4">
      <div className="max-w-lg mx-auto animate__animated animate__fadeInUp">
        <div className="bg-white rounded-3xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mx-auto mb-4 shadow-md">
              <span className="text-white text-xl">✏️</span>
            </div>
            <h1 className="font-display text-3xl font-black text-gray-900 mb-1">Update Profile</h1>
            <p className="text-gray-500 text-sm">Keep your information up to date</p>
          </div>

          {/* Preview */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              {preview ? (
                <Image
                  src={preview}
                  alt="Preview"
                  width={100}
                  height={100}
                  className="w-24 h-24 rounded-full border-4 border-amber-200 shadow-lg object-cover"
                  onError={() => setPreview("")}
                />
              ) : (
                <div className="w-24 h-24 rounded-full border-4 border-amber-200 shadow-lg bg-gradient-to-br from-amber-300 to-orange-400 flex items-center justify-center">
                  <span className="text-white font-display font-black text-4xl">
                    {formData.name?.[0]?.toUpperCase() || "U"}
                  </span>
                </div>
              )}
              <div className="absolute bottom-0 right-0 w-7 h-7 bg-amber-500 rounded-full border-2 border-white flex items-center justify-center">
                <span className="text-white text-xs">📷</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                required
                className="input input-bordered w-full rounded-xl focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Profile Photo URL
              </label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/photo.jpg"
                className="input input-bordered w-full rounded-xl focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
              />
              <p className="text-xs text-gray-400 mt-1">Enter a direct URL to your profile image</p>
            </div>

            <div className="flex gap-3 pt-2">
              <Link
                href="/my-profile"
                className="btn flex-1 btn-outline border-gray-200 text-gray-600 hover:bg-gray-50 rounded-xl font-semibold text-sm"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="btn flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white border-0 rounded-xl font-bold text-sm shadow-lg disabled:opacity-60"
              >
                {loading ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  "Update Information"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
