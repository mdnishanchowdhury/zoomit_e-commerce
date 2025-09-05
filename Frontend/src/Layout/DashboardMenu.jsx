import { useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { MdAddToHomeScreen } from "react-icons/md";
import { MdStreetview } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";

function DashboardMenu() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();

    const links = [
        { to: "/auth", icon: <MdStreetview className="w-6 h-6" />, label: "Overview" },
        { to: "/auth/usersList", icon: <FaUsers className="w-6 h-6" />, label: "Users" },
        { to: "/auth/addproduct", icon: <MdOutlineProductionQuantityLimits className="w-6 h-6" />, label: "Products" },
        { to: "/auth/orderslist", icon: <IoCartOutline className="w-6 h-6" />, label: "Orders" },
        { to: "/", icon: <MdAddToHomeScreen className="w-6 h-6" />, label: "Home" },
    ];

    return (
        <div className="flex min-h-screen">

            <button
                onClick={() => setSidebarOpen(true)}
                className="fixed top-4 left-4 z-50 md:hidden text-3xl text-[#D1A054]"
            >
                <GiHamburgerMenu />
            </button>

            <div
                className={`fixed top-0 left-0 bg-[#D1A054] w-[280px] min-h-screen p-4 transform transition-transform duration-300
          md:relative md:translate-x-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} z-40`}
            >
                <button
                    onClick={() => setSidebarOpen(false)}
                    className="absolute top-4 right-4 text-white text-3xl md:hidden"
                >
                    <IoClose />
                </button>

                <ul className="flex flex-col gap-4 mt-12">
                    {
                        links.map((link) => (
                            <li key={link.to} className="uppercase">
                                <NavLink
                                    to={link.to}
                                    className={({ isActive }) => {
                                        if (link.to === "/auth") {
                                            return location.pathname === "/auth"
                                                ? "flex items-center gap-2 px-3 py-2 rounded bg-gray-300 text-black"
                                                : "flex items-center gap-2 px-3 py-2 rounded text-white";
                                        }
                                        return `flex items-center gap-2 px-3 py-2 rounded ${isActive ? "bg-gray-300 text-black" : "text-white"
                                            }`;
                                    }}
                                    onClick={() => setSidebarOpen(false)}
                                >
                                    {link.icon} {link.label}
                                </NavLink>
                            </li>
                        ))
                    }
                </ul>
            </div>

            {
                sidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                )
            }

            <div className="flex-1 p-8 bg-gray-100">
                <Outlet />
            </div>
        </div>
    );
}

export default DashboardMenu;
