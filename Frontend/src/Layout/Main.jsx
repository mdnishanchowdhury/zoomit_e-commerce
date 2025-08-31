import { Outlet } from 'react-router-dom'
import Navbar from '../Shared.jsx/Navbar'

function Main() {
  return (
    <div >
      <aside className=''>
        <Navbar></Navbar>
      </aside>

      <Outlet></Outlet>
    </div>
  )
}

export default Main