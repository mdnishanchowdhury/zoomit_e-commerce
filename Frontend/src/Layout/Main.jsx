import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../Shared.jsx/Navbar'

function Main() {
   const location = useLocation();
  const noHeaderFooter =location.pathname.includes('login') ||location.pathname.includes('signUp')
  return (
    <div >
      <aside className=''>
        {
          noHeaderFooter || <Navbar></Navbar>
        }
      </aside>

      <Outlet></Outlet>
    </div>
  )
}

export default Main