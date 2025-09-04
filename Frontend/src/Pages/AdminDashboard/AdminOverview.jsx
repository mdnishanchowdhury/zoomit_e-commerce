import { useState } from "react";

export default function AdminOverview() {
  // ডেমো ডেটা
  const stats = {
    users: 120,
    products: 58,
    orders: 240,
    revenue: 35000,
  };

  const recentOrders = [
    { id: "ORD123", customer: "Nishan", total: "$120", status: "Pending" },
    { id: "ORD124", customer: "Hasan", total: "$80", status: "Delivered" },
    { id: "ORD125", customer: "Rafi", total: "$200", status: "Processing" },
  ];

  // Chat State
  const [messages, setMessages] = useState([
    { sender: "User", text: "Hello Admin, I need help." },
    { sender: "Admin", text: "Sure, tell me your issue." },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { sender: "Admin", text: input }]);
    setInput("");
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <h1 className="text-2xl font-bold">Admin Dashboard - Overview</h1>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-blue-100 p-4 rounded-xl text-center shadow">
          <h2 className="text-xl font-bold">{stats.users}</h2>
          <p className="text-gray-600">Total Users</p>
        </div>
        <div className="bg-green-100 p-4 rounded-xl text-center shadow">
          <h2 className="text-xl font-bold">{stats.products}</h2>
          <p className="text-gray-600">Total Products</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-xl text-center shadow">
          <h2 className="text-xl font-bold">{stats.orders}</h2>
          <p className="text-gray-600">Total Orders</p>
        </div>
        <div className="bg-purple-100 p-4 rounded-xl text-center shadow">
          <h2 className="text-xl font-bold">${stats.revenue}</h2>
          <p className="text-gray-600">Total Revenue</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white shadow-md rounded-xl p-4">
          <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
          <table className="w-full text-left border">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">Order ID</th>
                <th className="p-2 border">Customer</th>
                <th className="p-2 border">Total</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="p-2 border">{order.id}</td>
                  <td className="p-2 border">{order.customer}</td>
                  <td className="p-2 border">{order.total}</td>
                  <td className="p-2 border">{order.status}</td>
                  <td className="p-2 border">
                    <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Chat Section */}
        <div className="bg-white shadow-md rounded-xl p-4 flex flex-col h-[400px]">
          <h2 className="text-lg font-semibold mb-4">Admin Chat</h2>
          <div className="flex-1 overflow-y-auto border p-2 rounded">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 p-2 rounded max-w-[70%] ${
                  msg.sender === "Admin"
                    ? "ml-auto bg-blue-100 text-right"
                    : "mr-auto bg-gray-100 text-left"
                }`}
              >
                <p className="text-sm font-semibold">{msg.sender}</p>
                <p>{msg.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-2 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 border rounded p-2"
              placeholder="Type a message..."
            />
            <button
              onClick={handleSend}
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
