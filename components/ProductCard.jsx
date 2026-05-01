import Link from "next/link";
import Image from "next/image";

export default function ProductCard({ product }) {
  const { id, name, brand, price, rating, image, category } = product;

  const stars = Array.from({ length: 5 }, (_, i) => (
    <span key={i} className={i < Math.floor(rating) ? "text-amber-400" : "text-gray-200"}>
      ★
    </span>
  ));

  return (
    <div className="product-card bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg group">
      {/* Image */}
      <div className="relative h-52 overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Category Badge */}
        <span className="absolute top-3 left-3 bg-amber-500/90 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm">
          {category}
        </span>
        {/* Quick view overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Link
            href={`/products/${id}`}
            className="btn btn-sm bg-white text-amber-700 hover:bg-amber-50 border-0 shadow-md font-semibold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
          >
            Quick View
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">{brand}</p>
            <h3 className="font-display font-bold text-gray-800 text-base leading-tight mt-0.5 line-clamp-2">
              {name}
            </h3>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex text-sm">{stars}</div>
          <span className="text-xs text-gray-500 font-medium">({rating})</span>
        </div>

        {/* Price & Button */}
        <div className="flex items-center justify-between">
          <div>
            <span className="font-display text-2xl font-black text-amber-600">${price}</span>
            <span className="text-xs text-gray-500 ml-1">USD</span>
          </div>
          <Link
            href={`/products/${id}`}
            className="btn btn-sm bg-amber-500 hover:bg-amber-600 text-white border-0 rounded-xl shadow-sm font-semibold text-xs"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
