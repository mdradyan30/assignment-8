"use client";

import { useSession } from "@/lib/auth-client";
import { useRouter, useParams } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import products from "@/data/products.json";
import toast from "react-hot-toast";

export default function ProductDetailPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const params = useParams();
  const productId = parseInt(params.id);

  const product = products.find((p) => p.id === productId);

  useEffect(() => {
    if (!isPending && !session) {
      toast.error("Please login to view product details.");
      router.push(`/login?redirect=/products/${productId}`);
    }
  }, [session, isPending, router, productId]);

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-amber-500"></span>
          <p className="mt-3 text-gray-500 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) return null;

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="font-display text-3xl font-bold text-gray-800 mb-2">Product Not Found</h2>
          <p className="text-gray-500 mb-6">This product doesn&apos;t exist or has been removed.</p>
          <Link href="/#all-products" className="btn bg-amber-500 text-white border-0 rounded-xl">
            ← Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const stars = Array.from({ length: 5 }, (_, i) => (
    <span key={i} className={`text-2xl ${i < Math.floor(product.rating) ? "text-amber-400" : "text-gray-200"}`}>
      ★
    </span>
  ));

  const relatedProducts = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-amber-500 transition-colors">Home</Link>
            <span>›</span>
            <Link href="/#all-products" className="hover:text-amber-500 transition-colors">Products</Link>
            <span>›</span>
            <span className="text-gray-800 font-medium truncate">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-start animate__animated animate__fadeIn">
          {/* Product Image */}
          <div className="sticky top-24">
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50 aspect-square shadow-xl">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              {/* Category badge */}
              <span className="absolute top-4 left-4 bg-amber-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                {product.category}
              </span>
              {/* Stock badge */}
              {product.stock <= 10 && (
                <span className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full badge-pulse">
                  Only {product.stock} left!
                </span>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="animate__animated animate__fadeInRight">
            {/* Brand & Name */}
            <p className="text-amber-500 font-bold text-sm uppercase tracking-widest mb-2">{product.brand}</p>
            <h1 className="font-display text-4xl lg:text-5xl font-black text-gray-900 mb-4 leading-tight">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex">{stars}</div>
              <span className="text-gray-600 font-semibold">{product.rating}</span>
              <span className="text-gray-400 text-sm">(128 reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-display text-5xl font-black text-amber-600">${product.price}</span>
              <span className="text-gray-400 text-sm line-through">${Math.round(product.price * 1.4)}</span>
              <span className="bg-red-100 text-red-600 text-sm font-bold px-2 py-0.5 rounded-full">
                Save {Math.round(((product.price * 0.4) / (product.price * 1.4)) * 100)}%
              </span>
            </div>

            {/* Description */}
            <div className="bg-gray-50 rounded-2xl p-6 mb-6">
              <h3 className="font-semibold text-gray-800 mb-2">About this product</h3>
              <p className="text-gray-600 leading-relaxed text-sm">{product.description}</p>
            </div>

            {/* Product Details */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { label: "Brand", value: product.brand },
                { label: "Category", value: product.category },
                { label: "Rating", value: `⭐ ${product.rating}/5` },
                { label: "Stock", value: `${product.stock} units` },
              ].map(({ label, value }) => (
                <div key={label} className="bg-white border border-gray-100 rounded-xl p-3 shadow-sm">
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">{label}</p>
                  <p className="font-semibold text-gray-800 mt-0.5 text-sm">{value}</p>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => toast.success("Added to cart! 🛒")}
                className="btn flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white border-0 rounded-xl font-bold shadow-lg text-sm h-12"
              >
                🛒 Add to Cart
              </button>
              <button
                onClick={() => toast.success("Proceeding to checkout! ✨")}
                className="btn flex-1 btn-outline border-amber-400 text-amber-600 hover:bg-amber-500 hover:text-white hover:border-amber-500 rounded-xl font-bold text-sm h-12"
              >
                ⚡ Buy Now
              </button>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-4 mt-6">
              {["🚚 Free Shipping", "🔄 Easy Returns", "🔒 Secure Payment", "✅ Authentic"].map((badge) => (
                <span key={badge} className="text-xs text-gray-500 font-medium flex items-center gap-1">
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="font-display text-3xl font-black text-gray-900 mb-8">
              Related <span className="gradient-text">Products</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((p) => (
                <Link key={p.id} href={`/products/${p.id}`}
                  className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
                  <div className="relative h-48 overflow-hidden">
                    <Image src={p.image} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-display font-bold text-gray-800 text-sm">{p.name}</h3>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-amber-600 font-black text-lg">${p.price}</span>
                      <span className="text-xs text-amber-500">View →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
