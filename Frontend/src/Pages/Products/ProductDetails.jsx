import { useState } from "react";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { usePlaceOrderMutation } from "../../redux/features/products/productSlice";
import useAuth from "../../Hook/useAuth";

function ProductDetails() {
  const location = useLocation();
  const cartItem = location.state?.cartItem;
  const { user } = useAuth();
  const [cart, setCart] = useState(
    cartItem ? [{ ...cartItem, quantity: cartItem.quantity || 1 }] : []
  );

  const [placeOrder] = usePlaceOrderMutation();

  const updateQuantity = (id, type) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item._id === id) {
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
    setCart((prev) => prev.filter((item) => item._id !== id));
  };

  const subtotal = cart.reduce(
    (acc, item) =>
      acc + (item.price - (item.price * item.discount) / 100) * item.quantity,
    0
  );
  const shipping = subtotal > 0 ? 100 : 0;
  const total = subtotal + shipping;

  const handleCheckout = async () => {
    if (!user?.email)
      return Swal.fire(
        "Not Logged In",
        "You must be logged in to place an order",
        "warning"
      );

    if (cart.length === 0)
      return Swal.fire(
        "Cart Empty",
        "Please add items to your cart.",
        "warning"
      );

    const items = cart.map((item) => ({
      productId: item._id,
      name: item.name,
      price: item.price - (item.price * item.discount) / 100,
      quantity: item.quantity,
    }));

    try {
      await placeOrder({ email: user.email, items, total }).unwrap();
      Swal.fire("Success", "Order placed successfully!", "success");
      setCart([]);
    } catch (err) {
      Swal.fire("Error", err?.data?.message || "Failed to place order", "error");
    }
  };

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
                key={item._id}
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
                      ৳
                      {(
                        item.price - (item.price * item.discount) / 100
                      ).toFixed(2)}
                      {item.discount > 0 && (
                        <span className="line-through text-gray-400 ml-2">
                          ৳{item.price}
                        </span>
                      )}
                    </p>
                    <p
                      className={`text-xs mt-1 ${item.stock > 0 ? "text-green-600" : "text-red-600"
                        }`}
                    >
                      {item.stock > 0 ? "In Stock" : "Stock Out"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item._id, "dec")}
                    className="px-2 py-1 border rounded"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item._id, "inc")}
                    disabled={item.quantity >= item.stock}
                    className="px-2 py-1 border rounded"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => removeItem(item._id)}
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
              <span>৳{subtotal.toFixed(2)}</span>
            </p>
            <p className="flex justify-between mb-2">
              <span>Shipping</span>
              <span>৳{shipping.toFixed(2)}</span>
            </p>
            <p className="flex justify-between font-bold text-lg border-t pt-2">
              <span>Total</span>
              <span>৳{total.toFixed(2)}</span>
            </p>

            <button
              onClick={handleCheckout}
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
