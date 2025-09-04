import { useState } from "react";
import { NavLink, Outlet } from 'react-router-dom';
import { FaCalendar, FaHome } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { IoIosAddCircle } from "react-icons/io"; // fixed
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdContact } from "react-icons/io";
import { FaBookmark } from "react-icons/fa6";
import { MdOutlinePayment } from "react-icons/md";


function DashboardUI() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex">

            {/* Hamburger button */}
            <button
                onClick={() => setSidebarOpen(true)}
                className="fixed top-4 left-4 z-50 md:hidden text-3xl text-[#D1A054]"
            >
                <GiHamburgerMenu />
            </button>

            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 bg-[#D1A054] w-[280px] min-h-screen flex justify-center
                  transform transition-transform duration-300
                  md:relative md:translate-x-0
                  ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                  z-40
                `}
            >
                <button
                    onClick={() => setSidebarOpen(false)}
                    className="absolute top-4 right-4 text-white text-3xl md:hidden"
                >
                    ×
                </button>

                <ul className="menu min-h-full w-[233px] p-4 gap-4 text-white">
                    <li className="uppercase">
                        <NavLink to="/dashboard" className={({ isActive }) => isActive ? "text-yellow-300" : ""}>
                            <FaHome className="w-8 h-8" /> Overview
                        </NavLink>
                    </li>
                    <li className="uppercase">
                        <NavLink to="/dashboard/usersList">
                            <FaCalendar className="w-8 h-8" /> Users
                        </NavLink>
                    </li>
                    <li className="uppercase">
                        <NavLink to="/dashboard/addproduct">
                            <MdOutlinePayment className="w-8 h-8" /> Products
                        </NavLink>
                    </li>
                    <li className="uppercase">
                        <NavLink to="/dashboard/orderslist">
                            <IoCartOutline className="w-8 h-8" /> Orders
                        </NavLink>
                    </li>
                   
                </ul>
            </div>

            {/* Overlay */}
            {sidebarOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden" onClick={() => setSidebarOpen(false)}></div>}

            {/* Main content */}
            <div className="flex-1 p-8">
                <Outlet />
            </div>
        </div>
    );
}

export default DashboardUI;
