import { useState, useEffect, useRef, useMemo } from "react";
import { IoCartOutline } from "react-icons/io5";
import Swal from "sweetalert2";
import useAuth from "../../Hook/useAuth";
import {
  useGetCartQuery,
  useUpdateCartMutation,
  useDeleteCartMutation,
} from "../../redux/features/products/productSlice";

function CartButton() {
  const { user } = useAuth();
  const email = user?.email;

  // RTK Query: get cart items
  const { data: cart = [] } = useGetCartQuery(email, { skip: !email });
  const [updateCart] = useUpdateCartMutation();
  const [deleteCart] = useDeleteCartMutation();

  const popupRef = useRef();
  const [open, setOpen] = useState(false);

  // Initialize quantities once
  const [quantities, setQuantities] = useState(() =>
    cart.reduce((acc, item) => {
      acc[item._id] = item.quantity || 1;
      return acc;
    }, {})
  );

  // Update quantities only when cart changes significantly
  useEffect(() => {
    const initQuantities = cart.reduce((acc, item) => {
      acc[item._id] = item.quantity || 1;
      return acc;
    }, {});

    // Only update if something changed
    setQuantities((prev) => {
      const isDifferent = Object.keys(initQuantities).some(
        (key) => initQuantities[key] !== prev[key]
      );
      return isDifferent ? initQuantities : prev;
    });
  }, [cart]);

  // Close popup on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleIncrease = async (id) => {
    const newQty = (quantities[id] || 1) + 1;
    setQuantities((prev) => ({ ...prev, [id]: newQty }));
    await updateCart({ id, data: { quantity: newQty } });
  };

  const handleDecrease = async (id) => {
    const newQty = Math.max(1, (quantities[id] || 1) - 1);
    setQuantities((prev) => ({ ...prev, [id]: newQty }));
    await updateCart({ id, data: { quantity: newQty } });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This item will be removed from your cart!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteCart(id); // ✅ auto refresh from RTK Query
          Swal.fire("Deleted!", "Item removed from cart.", "success");
        } catch {
          Swal.fire("Error!", "Failed to remove item.", "error");
        }
      }
    });
  };

  const subtotal = useMemo(
    () =>
      cart.reduce(
        (acc, item) => acc + item.price * (quantities[item._id] || 1),
        0
      ),
    [cart, quantities]
  );
  const shipping = cart.length > 0 ? 7 : 0;
  const total = subtotal + shipping;

  return (
    <div className="relative" ref={popupRef}>
      <button
        onClick={() => setOpen(!open)}
        className="relative flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 hover:bg-white/10 transition"
      >
        <IoCartOutline className="w-6 h-6" />
        {cart.length > 0 && (
          <div className="badge badge-sm bg-yellow-500 text-black absolute -top-1 -right-1">
            {cart.length}
          </div>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-[500px] bg-white text-black rounded-2xl shadow-lg p-3 z-50">
          <h2 className="text-lg font-semibold mb-3">Your Cart</h2>
          <div className="space-y-3 max-h-[300px] overflow-y-auto">
            {cart.length === 0 && (
              <p className="text-gray-500 text-sm">Cart is empty</p>
            )}

            {cart.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between border rounded-lg p-2"
              >
                <div className="flex items-center gap-2">
                  <img
                    src={item.photos[0]}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-medium text-sm">{item.name}</h3>
                    <p className="text-xs text-gray-500">৳{item.price} each</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <button
                    onClick={() => handleDecrease(item._id)}
                    className="px-1 py-0.5 border rounded disabled:opacity-50"
                    disabled={quantities[item._id] === 1}
                  >
                    -
                  </button>
                  <span>{quantities[item._id] || 1}</span>
                  <button
                    onClick={() => handleIncrease(item._id)}
                    className="px-1 py-0.5 border rounded"
                  >
                    +
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="text-red-500 px-1 cursor-pointer"
                  >
                    🗑
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-3 space-y-1 text-sm text-gray-600">
            <p>Subtotal: ৳{subtotal.toFixed(2)}</p>
            <p>Shipping: ৳{shipping.toFixed(2)}</p>
            <p className="text-base font-semibold text-black">
              Total: ৳{total.toFixed(2)}
            </p>
          </div>

          <button className="w-full mt-2 bg-black text-white py-2 rounded-lg hover:bg-gray-800 text-sm">
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
}

export default CartButton;
