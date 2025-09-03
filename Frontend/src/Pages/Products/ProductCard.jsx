import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
  const [inCart, setInCart] = useState(false);
  const navigate = useNavigate();

  const handleAddToCart = () => setInCart(true);

  const handleViewCart = () => {
    navigate("/details", { state: { cartItem: product } });
  };

  // Button Disabled Condition
  const isDisabled = product.stock === 0 || product.status !== "active";

  return (
    <div className="border rounded-2xl shadow-md p-4 hover:shadow-lg transition bg-white">
      {/* Product Image */}
      <div className="w-full h-48 overflow-hidden rounded-xl mb-4">
        <img
          src={product.photos[0]}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition"
        />
      </div>

      {/* Product Info */}
      <h2 className="text-lg font-bold mb-1">{product.name}</h2>
      <p className="text-sm text-gray-500 mb-2">/{product.slug}</p>
      <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>

      {/* Price + Discount */}
      <div className="mb-2">
        <span className="text-xl font-semibold text-green-600">
          ৳{product.price - (product.price * product.discount) / 100}
        </span>
        {product.discount > 0 && (
          <>
            <span className="line-through text-gray-400 ml-2">৳{product.price}</span>
            <span className="ml-2 text-sm text-red-500">-{product.discount}%</span>
          </>
        )}
      </div>

      {/* Stock + Status */}
      <div className="flex justify-between items-center mb-3">
        <span
          className={`text-sm px-2 py-1 rounded ${
            product.stock > 0 ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
          }`}
        >
          {product.stock > 0 ? "In Stock" : "Out of Stock"}
        </span>
        <span
          className={`text-sm px-2 py-1 rounded ${
            product.status === "active" ? "bg-blue-100 text-blue-600" : "bg-gray-200 text-gray-500"
          }`}
        >
          {product.status}
        </span>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 mb-4">
        {product.categories.map((cat, i) => (
          <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
            {cat}
          </span>
        ))}
      </div>

      {/* Action Button */}
      {inCart ? (
        <button
          onClick={handleViewCart}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition"
        >
          View Cart
        </button>
      ) : (
        <button
          onClick={handleAddToCart}
          disabled={isDisabled}
          className={`w-full py-2 rounded-lg font-medium transition ${
            !isDisabled
              ? "bg-green-600 hover:bg-green-700 text-white"
              : "bg-gray-400 text-gray-200 cursor-not-allowed"
          }`}
        >
          Add to Cart
        </button>
      )}
    </div>
  );
}

export default ProductCard;
