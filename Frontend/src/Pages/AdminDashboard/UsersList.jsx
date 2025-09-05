import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import AdminForm from "../../Componets/UserListAddAdmin/AdminForm";
import UserCard from "../../Componets/UserListAddAdmin/UserCard";

const UsersList = () => {
  const { token } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (token === null) return;
    if (!token) navigate("/login");
    else fetchUsers();
  }, [token, navigate]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const addAdmin = async ({ name, email, password, profileImage }) => {
    if (!profileImage || !name || !email || !password) {
      alert("All fields are required");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("profileImage", profileImage);

      const res = await axios.post("http://localhost:5000/add-admin", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert(res.data.message);
      setShowForm(false);
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add admin");
    }
  };

  const deleteAdmin = async (id) => {
    if (!window.confirm("Are you sure you want to delete this admin?")) return;
    try {
      await axios.delete(`http://localhost:5000/delete-admin/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete admin");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  const adminList = users.filter((u) => u.role === "admin");
  const userList = users.filter((u) => u.role !== "admin");

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h2>

        <button
          onClick={() => setShowForm(!showForm)}
          className="mb-6 bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-600 transition"
        >
          {showForm ? "Cancel" : "Add New Admin"}
        </button>

        {
          showForm && <AdminForm addAdmin={addAdmin} ></AdminForm>
        }

        <h3 className="text-xl font-semibold mb-4">Admins</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
          {
            adminList.map((u) => (
              <UserCard key={u._id} user={u} onDelete={deleteAdmin}></UserCard>
            ))
          }
        </div>

        <h3 className="text-xl font-semibold mb-4">Users</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {
            userList.map((u) => (
              <UserCard key={u._id} user={u}></UserCard>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default UsersList;
