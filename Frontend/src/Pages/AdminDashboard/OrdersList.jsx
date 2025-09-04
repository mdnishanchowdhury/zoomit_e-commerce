import { useState } from "react";

export default function AdminOrders() {
  const [orders, setOrders] = useState([
    {
      id: "ORD101",
      customer: "Nishan",
      total: 120,
      status: "Pending",
      date: "2025-09-01",
    },
    {
      id: "ORD102",
      customer: "Hasan",
      total: 80,
      status: "Delivered",
      date: "2025-09-02",
    },
    {
      id: "ORD103",
      customer: "Rafi",
      total: 200,
      status: "Processing",
      date: "2025-09-03",
    },
    {
      id: "ORD104",
      customer: "Sadia",
      total: 150,
      status: "Pending",
      date: "2025-09-04",
    },
  ]);

  const [filterDate, setFilterDate] = useState("");

  // Update order status
  const updateStatus = (id, newStatus) => {
    setOrders(
      orders.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  // Filtered orders by date
  const filteredOrders = filterDate
    ? orders.filter((order) => order.date === filterDate)
    : orders;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Admin - Orders Management</h1>
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="border rounded p-2"
        />
      </div>

      {/* Orders Table */}
      <div className="bg-white shadow-md rounded-xl p-4">
        <h2 className="text-lg font-semibold mb-4">All Orders</h2>
        <table className="w-full text-left border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Order ID</th>
              <th className="p-2 border">Customer</th>
              <th className="p-2 border">Total</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="p-2 border">{order.id}</td>
                <td className="p-2 border">{order.customer}</td>
                <td className="p-2 border">${order.total}</td>
                <td className="p-2 border">
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : order.status === "Processing"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="p-2 border">{order.date}</td>
                <td className="p-2 border space-x-2">
                  {order.status !== "Delivered" && (
                    <>
                      {order.status === "Pending" && (
                        <button
                          onClick={() => updateStatus(order.id, "Processing")}
                          className="px-3 py-1 text-sm bg-yellow-500 text-white rounded"
                        >
                          Mark Processing
                        </button>
                      )}
                      {order.status === "Processing" && (
                        <button
                          onClick={() => updateStatus(order.id, "Delivered")}
                          className="px-3 py-1 text-sm bg-green-600 text-white rounded"
                        >
                          Mark Delivered
                        </button>
                      )}
                    </>
                  )}
                  <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
