import HeroSlider from "@/components/HeroSlider";
import ProductCard from "@/components/ProductCard";
import products from "@/data/products.json";
import Link from "next/link";
import Image from "next/image";

const popularProducts = products.slice(0, 3);

const brands = [
  { name: "SunShade", emoji: "🕶️", tagline: "UV Protection Experts" },
  { name: "GlowSafe", emoji: "🧖‍♀️", tagline: "Premium Skincare" },
  { name: "WaveRider", emoji: "🌊", tagline: "Beach Accessories" },
  { name: "CoastalVibes", emoji: "🌴", tagline: "Summer Fashion" },
];

const summerTips = [
  {
    icon: "🧴",
    title: "Apply Sunscreen Daily",
    desc: "Use SPF 30+ broad-spectrum sunscreen every day, even on cloudy days. Reapply every 2 hours when outdoors.",
    color: "from-amber-50 to-orange-50",
    border: "border-amber-200",
  },
  {
    icon: "💧",
    title: "Stay Hydrated",
    desc: "Drink at least 8 glasses of water daily. Carry a water bottle to avoid dehydration during hot summer days.",
    color: "from-sky-50 to-cyan-50",
    border: "border-sky-200",
  },
  {
    icon: "🕶️",
    title: "Protect Your Eyes",
    desc: "Wear UV400 protective sunglasses to shield your eyes from harmful UVA and UVB rays all summer long.",
    color: "from-violet-50 to-purple-50",
    border: "border-violet-200",
  },
  {
    icon: "👒",
    title: "Wear Protective Clothing",
    desc: "Light-colored, loose-fitting clothes and wide-brim hats help protect skin from direct sun exposure.",
    color: "from-green-50 to-emerald-50",
    border: "border-green-200",
  },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <HeroSlider />

      {/* Popular Products */}
      <section id="products" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-14 animate__animated animate__fadeInUp">
            <span className="inline-block bg-amber-100 text-amber-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
              🔥 Most Popular
            </span>
            <h2 className="font-display text-4xl lg:text-5xl font-black text-gray-900 mb-4">
              Summer <span className="gradient-text">Bestsellers</span>
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-base">
              Hand-picked products loved by thousands of customers this summer season
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularProducts.map((product, index) => (
              <div
                key={product.id}
                className="animate__animated animate__fadeInUp"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {/* View All */}
          <div className="text-center mt-12">
            <Link
              href="#all-products"
              className="btn btn-outline border-amber-400 text-amber-600 hover:bg-amber-500 hover:text-white hover:border-amber-500 font-semibold px-10 rounded-full"
            >
              View All Products →
            </Link>
          </div>
        </div>
      </section>

      {/* All Products */}
      <section id="all-products" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block bg-sky-100 text-sky-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
              🛍️ Full Collection
            </span>
            <h2 className="font-display text-4xl lg:text-5xl font-black text-gray-900 mb-4">
              All <span className="gradient-text">Products</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Summer Care Tips */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block bg-green-100 text-green-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
              💡 Expert Advice
            </span>
            <h2 className="font-display text-4xl lg:text-5xl font-black text-gray-900 mb-4">
              Summer <span className="gradient-text">Care Tips</span>
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Stay healthy, hydrated, and glowing all summer with these expert-approved tips
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mx-auto items-center">
            {summerTips.map((tip, index) => (
              <div
                key={index}
                className={`p-6 rounded-2xl bg-gradient-to-br ${tip.color} border ${tip.border} hover:shadow-md transition-all duration-300 animate__animated animate__fadeInUp`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-4xl mb-4 wave-float justify-center items-center" style={{ animationDelay: `${index * 0.5}s` }}>
                  {tip.icon}
                </div>
                <h3 className="font-display font-bold text-gray-800 text-lg mb-2 ">{tip.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Brands */}
      <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block bg-amber-200 text-amber-800 text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
              🏆 Trusted Brands
            </span>
            <h2 className="font-display text-4xl lg:text-5xl font-black text-gray-900 mb-4">
              Our Top <span className="gradient-text">Brands</span>
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              We partner with the finest summer brands to bring you quality you can trust
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {brands.map((brand, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer animate__animated animate__zoomIn"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-5xl mb-3 wave-float" style={{ animationDelay: `${index * 0.3}s` }}>
                  {brand.emoji}
                </div>
                <h3 className="font-display font-bold text-gray-800 text-lg">{brand.name}</h3>
                <p className="text-gray-400 text-xs mt-1">{brand.tagline}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-20 text-8xl sun-rotate">☀</div>
          <div className="absolute bottom-10 right-20 text-6xl wave-float">🌊</div>
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full border-4 border-white/20"></div>
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-display text-4xl lg:text-6xl font-black text-white mb-4">
            Ready for Your Best Summer?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of happy customers and get exclusive access to our summer deals and new arrivals.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/register" className="btn bg-white text-orange-600 hover:bg-amber-50 border-0 font-bold px-10 rounded-full shadow-xl text-sm">
              Get Started Free →
            </Link>
            <Link href="/#products" className="btn btn-outline border-white text-white hover:bg-white hover:text-orange-600 font-semibold px-10 rounded-full text-sm">
              Browse Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
