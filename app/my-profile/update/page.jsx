"use client";

import { useState, useEffect } from "react";
import { useSession, updateProfile } from "@/lib/auth-client";
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
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;


    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }


    if (!file.type.startsWith("image/")) {
      toast.error("Please upload a valid image file");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const imageData = event.target?.result;
      setPreview(imageData);
      setFormData((prev) => ({ ...prev, image: imageData }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await updateProfile(
        formData.name,
        formData.image || undefined
      );

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

          {/* Photo Upload Section - Facebook Style */}
          <div className="flex justify-center mb-8">
            <div className="relative group w-40 h-40">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="avatar-input"
              />
              <label htmlFor="avatar-input" className="cursor-pointer block h-full">
                {preview ? (
                  <Image
                    src={preview}
                    alt="Profile Preview"
                    width={160}
                    height={160}
                    className="w-40 h-40 rounded-full border-4 border-amber-200 shadow-xl object-cover transition-all duration-300 group-hover:shadow-2xl group-hover:border-amber-400"
                    onError={() => setPreview("")}
                  />
                ) : (
                  <div className="w-40 h-40 rounded-full border-4 border-amber-200 shadow-xl bg-gradient-to-br from-amber-300 to-orange-400 flex items-center justify-center transition-all duration-300 group-hover:shadow-2xl group-hover:border-amber-400">
                    <span className="text-white font-display font-black text-6xl">
                      {formData.name?.[0]?.toUpperCase() || "U"}
                    </span>
                  </div>
                )}
                {/* Overlay on hover */}
                <div className="absolute inset-0 rounded-full bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                  <div className="text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="text-4xl mb-2">📷</div>
                    <p className="text-sm font-semibold">Change Photo</p>
                  </div>
                </div>
              </label>
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
