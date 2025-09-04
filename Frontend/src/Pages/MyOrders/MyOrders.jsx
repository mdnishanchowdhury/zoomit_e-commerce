import React from "react";
import useAuth from "../../Hook/useAuth";
import { useGetOrdersQuery } from "../../redux/features/products/productSlice";

function MyOrders() {
  const { user } = useAuth();
  const { data: orders = [], isLoading, error } = useGetOrdersQuery(user?.email, { skip: !user?.email });

  if (!user) return <p className="text-red-500">You must be logged in to view your orders.</p>;
  if (isLoading) return <p>Loading orders...</p>;
  if (error) return <p className="text-red-500">Failed to load orders.</p>;
  if (orders.length === 0) return <p className="text-gray-500">You have no orders yet.</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order._id} className="border p-4 rounded-xl shadow-sm">
            <div className="flex justify-between mb-2"><p className="font-semibold">Order ID:</p><p>{order._id}</p></div>
            <div className="flex justify-between mb-2"><p className="font-semibold">Total:</p><p>৳{order.total.toFixed(2)}</p></div>
            <div className="flex justify-between mb-2"><p className="font-semibold">Date:</p><p>{new Date(order.createdAt).toLocaleString()}</p></div>

            <div>
              <p className="font-semibold mb-2">Items:</p>
              <ul className="list-none space-y-2">
                {order.items.map((item) => (
                  <li key={item.productId} className="flex items-center gap-4 border p-2 rounded">
                    <img src={item.photo} alt={item.name} className="w-16 h-16 object-cover rounded"/>
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <p>
                        ৳{item.price.toFixed(2)}
                        {item.discount > 0 && (
                          <span className="line-through text-gray-400 ml-1">৳{item.originalPrice}</span>
                        )}
                        &nbsp;({item.discount}% off)
                      </p>
                      <p>Quantity: {item.quantity}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyOrders;
