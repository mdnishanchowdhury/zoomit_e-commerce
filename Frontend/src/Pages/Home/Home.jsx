import { useContext, useEffect } from "react";
import { AuthContext } from "../../Providers/AuthProvider";

function Home() {
  const { user } = useContext(AuthContext);

  // console.log('User:',user)

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading user info...</p>
      </div>
    );
  }
  useEffect(() => {
    document.title = 'Zoom-Shop | Home';
  }, []);

  return (
     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4">User Dashboard</h2>
        {user.profileImage && (
          <img
            src={`http://localhost:5000${user.profileImage}`}
            alt="Profile"
            className="w-36 h-36 mx-auto rounded-full object-cover mb-4"
          />
        )}
        <p className="text-lg font-medium mb-2">Welcome, {user.name}!</p>
        <p className="text-lg font-medium mb-2">email {user.email}!</p>
        <p className="text-gray-600">Role: {user.role}</p>
      </div>
    </div>
  )
}

export default Home