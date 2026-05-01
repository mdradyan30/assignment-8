"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signUp, signIn } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photoURL: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      setLoading(false);
      return;
    }

    try {
      const result = await signUp.email({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        image: formData.photoURL || "",
      });

      if (result?.error) {
        setError(result.error.message || "Registration failed. Please try again.");
        toast.error("Registration failed.");
      } else {
        toast.success("Account created successfully! 🌞 Please log in.");
        router.push("/login");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      toast.error("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    try {
      await signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (err) {
      toast.error("Google sign-in failed. Please try again.");
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-cyan-50 to-teal-50 flex items-center justify-center px-4 py-16">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 text-6xl opacity-10 sun-rotate">☀</div>
        <div className="absolute bottom-20 left-20 text-5xl opacity-10 wave-float">🌊</div>
        <div className="absolute top-1/3 right-10 text-4xl opacity-10 wave-float" style={{ animationDelay: "1.5s" }}>🌺</div>
      </div>

      <div className="w-full max-w-md relative animate__animated animate__fadeInUp">
        <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-10">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-md">
                <span className="text-white text-xl">☀</span>
              </div>
              <span className="font-display font-bold text-2xl text-gray-800">
                Sun<span className="text-amber-500">Cart</span>
              </span>
            </div>
            <h1 className="font-display text-3xl font-black text-gray-900 mb-1">Create Account</h1>
            <p className="text-gray-500 text-sm">Join SunCart and enjoy summer shopping</p>
          </div>

          {/* Error */}
          {error && (
            <div className="alert alert-error mb-6 py-3 rounded-xl text-sm animate__animated animate__shakeX">
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
                className="input input-bordered w-full rounded-xl focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className="input input-bordered w-full rounded-xl focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Profile Photo URL <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <input
                type="url"
                name="photoURL"
                value={formData.photoURL}
                onChange={handleChange}
                placeholder="https://example.com/your-photo.jpg"
                className="input input-bordered w-full rounded-xl focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Min. 6 characters"
                required
                className="input input-bordered w-full rounded-xl focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white border-0 rounded-xl font-bold text-sm shadow-lg disabled:opacity-60 mt-2"
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "Create Account →"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-gray-400 text-xs font-medium">OR</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Google */}
          <button
            onClick={handleGoogleLogin}
            disabled={googleLoading}
            className="btn w-full btn-outline border-gray-200 hover:bg-gray-50 hover:border-gray-300 rounded-xl font-semibold text-gray-700 text-sm gap-2"
          >
            {googleLoading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              <>
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </>
            )}
          </button>

          <p className="text-center mt-6 text-sm text-gray-500">
            Already have an account?{" "}
            <Link href="/login" className="text-amber-600 hover:text-amber-700 font-semibold">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
