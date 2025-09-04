import { useContext, useEffect } from "react";
import Banner from "./Banner";
import { AuthContext } from "../../Providers/AuthProvider";

function Home() {
  const { user } = useContext(AuthContext);
  useEffect(() => {
    document.title = 'Zoom-Shop | Home';
  }, []);

  return (
    <div>
      <div className="w-full">
        <Banner></Banner>
        {
          <div>
            <h2>{user?.email}</h2>
            <img src={user?.photo ? `http://localhost:5000/uploads/${user.photo}` : '/default-avatar.png'} alt="Profile" />
          </div>
        }
      </div>
      <div className='w-7xl mx-auto'>

      </div>
    </div>
  )
}

export default Home