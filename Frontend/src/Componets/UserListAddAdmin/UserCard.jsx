const UserCard = ({ user, onDelete }) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow flex flex-col items-center">
            <img
                src={`http://localhost:5000${user.profileImage}`}
                alt={user.name}
                className="w-24 h-24 rounded-full object-cover mb-4"
            />
            <p className="font-semibold text-gray-800">{user.name}</p>
            <p className="text-gray-500 text-sm">{user.email}</p>
            <span
                className={`mt-2 px-3 py-1 text-xs rounded-full ${user.role === "admin"
                        ? "bg-green-200 text-green-800"
                        : "bg-gray-200 text-gray-800"
                    }`}
            >
                {user.role}
            </span>
            {
                user.role === "admin" && onDelete && (
                    <button
                        onClick={() => onDelete(user._id)}
                        className="mt-3 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition text-sm"
                    >
                        Delete
                    </button>
                )
            }
        </div>
    );
};

export default UserCard;
