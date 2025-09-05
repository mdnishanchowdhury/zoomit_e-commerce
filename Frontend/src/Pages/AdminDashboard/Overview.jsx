import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { useGetOrdersQuery, useGetProductsQuery, useGetUsersQuery } from "../../redux/features/products/productSlice";

function Overview() {
  const { user } = useContext(AuthContext);

  const { data: users, isLoading: usersLoading } = useGetUsersQuery();
  const { data: products, isLoading: productsLoading } = useGetProductsQuery();
  const { data: orders, isLoading: ordersLoading } = useGetOrdersQuery(user?.email);

  if (usersLoading || productsLoading || ordersLoading) {
    return <p className="text-center">Loading...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold">Welcome, {user?.name}</h2>
        <p>Email: {user?.email}</p>
        <p>Role: {user?.role}</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-blue-500 text-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Users</h3>
          <p className="text-3xl">{users?.length || 0}</p>
        </div>

        <div className="bg-green-500 text-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Products</h3>
          <p className="text-3xl">{products?.length || 0}</p>
        </div>

        <div className="bg-purple-500 text-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Orders</h3>
          <p className="text-3xl">{orders?.length || 0}</p>
        </div>
      </div>
    </div>
  );
}
export default Overview;