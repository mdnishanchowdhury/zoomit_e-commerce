import React, { useState } from "react";
import { useLocation } from "react-router-dom";

function ProductDetails() {
  const location = useLocation();
  const cartItem = location.state?.cartItem;

  const [cart, setCart] = useState(cartItem ? [{ ...cartItem }] : []);

  const updateQuantity = (id, type) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          if (type === "inc" && item.quantity < item.stock) {
            return { ...item, quantity: item.quantity + 1 };
          }
          if (type === "dec" && item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 };
          }
        }
        return item;
      })
    );
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cart.reduce(
    (acc, item) => acc + (item.price - (item.price * item.discount) / 100) * item.quantity,
    0
  );
  const shipping = subtotal > 0 ? 100 : 0;
  const total = subtotal + shipping;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border p-4 rounded-xl shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.photos[0]}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <h2 className="font-semibold">{item.name}</h2>
                    <p className="text-sm text-gray-500">
                      ৳{item.price - (item.price * item.discount) / 100}{" "}
                      {item.discount > 0 && (
                        <span className="line-through text-gray-400 ml-2">৳{item.price}</span>
                      )}
                    </p>
                    <p
                      className={`text-xs mt-1 ${
                        item.stock > 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {item.stock > 0 ? "In Stock" : "Stock Out"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, "dec")}
                    className="px-2 py-1 border rounded"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, "inc")}
                    disabled={item.quantity >= item.stock}
                    className="px-2 py-1 border rounded"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 hover:underline"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="border p-6 rounded-xl shadow-md h-fit">
            <h2 className="text-lg font-bold mb-4">Order Summary</h2>
            <p className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>৳{subtotal}</span>
            </p>
            <p className="flex justify-between mb-2">
              <span>Shipping</span>
              <span>৳{shipping}</span>
            </p>
            <p className="flex justify-between font-bold text-lg border-t pt-2">
              <span>Total</span>
              <span>৳{total}</span>
            </p>

            <button
              onClick={() => alert("➡️ Proceed to Checkout")}
              className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetails;
