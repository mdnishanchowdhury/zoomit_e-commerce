import { useGetUsersQuery } from "../../redux/features/products/productSlice";

export default function UsersList() {
  // RTK Query hook ব্যবহার করে API থেকে ইউজার ডেটা আনা
  const { data: users = [], isLoading, isError } = useGetUsersQuery();

  if (isLoading) return <p className="p-6 text-gray-500">Loading users...</p>;
  if (isError) return <p className="p-6 text-red-500">Failed to load users.</p>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Users Management</h1>

      <div className="bg-white shadow-md rounded-xl p-4">
        <table className="w-full text-left border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Role</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={user.id || idx} className="hover:bg-gray-50">
                <td className="p-2 border">{idx + 1}</td>
                <td className="p-2 border">{user.name}</td>
                <td className="p-2 border">{user.email}</td>
                <td className="p-2 border">{user.role}</td>
                <td className="p-2 border">
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      user.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="p-2 border space-x-2">
                  <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded">
                    Edit
                  </button>
                  <button className="px-3 py-1 text-sm bg-red-500 text-white rounded">
                    Delete
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
