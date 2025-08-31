import { useEffect } from "react";
import Banner from "./Banner";

function Home() {
  useEffect(() => {
    document.title = 'Zoom-Shop | Home';
  }, []);
  return (
    <div>
      <div className="w-full">
        <Banner></Banner>
      </div>
      <div className='w-7xl mx-auto'>

      </div>
    </div>
  )
}

export default Home