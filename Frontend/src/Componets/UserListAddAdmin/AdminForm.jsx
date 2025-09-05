import { useState } from "react";

const AdminForm = ({ addAdmin }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [profileImage, setProfileImage] = useState(null);

    const handleSubmit = () => {
        addAdmin({ name, email, password, profileImage });
        setName("");
        setEmail("");
        setPassword("");
        setProfileImage(null);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow mb-8">
            <h3 className="text-xl font-semibold mb-4">New Admin Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setProfileImage(e.target.files[0])}
                    className="p-2 border rounded"
                />
            </div>
            <button
                onClick={handleSubmit}
                className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
            >
                Submit
            </button>
        </div>
    );
};

export default AdminForm;
