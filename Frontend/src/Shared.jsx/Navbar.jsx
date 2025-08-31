import { Link, NavLink } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";

function NavBar() {

    // feature btn 
    const links = (
        <>
            <li>
                <NavLink to="/" className="hover:text-yellow-400">Home</NavLink>
            </li>
            <li>
                <NavLink to="/contact" className="hover:text-yellow-400">Products</NavLink>
            </li>
            <li>
                <NavLink to="/orders" className="hover:text-yellow-400">My Orders</NavLink>
            </li>
        </>
    );

    return (
        <div className="navbar fixed z-10 bg-[#15151580]  text-white shadow-sm">

            <div className="w-7xl mx-auto">
                {/* Left Section */}
                <div className="navbar-start ">
                    {/* Mobile Dropdown */}
                    <div className="dropdown">
                        <button tabIndex={0} className="btn btn-ghost lg:hidden">
                            <GiHamburgerMenu className="w-7 h-7" />
                        </button>
                        <ul
                            tabIndex={0}
                            className="menu dropdown-content rounded-box mt-3 w-52 p-2 shadow bg-[#D1A054] text-lg font-medium z-50"
                        >
                            {links}
                        </ul>
                    </div>
                    {/* Logo */}
                    <Link to="/" className=" text-xl  font-black uppercase">
                        Zoomit Shop
                    </Link>
                </div>

                {/* Right Section */}
                <div className="navbar-end gap-3 items-center">
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1 text-lg font-medium">
                            {links}
                        </ul>
                    </div>
                    {/* Cart */}
                    <Link to="/dashboard/cart">
                        <button className="relative flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 hover:bg-white/10 transition">
                            <IoCartOutline className="w-6 h-6" />
                            <div className="badge badge-sm bg-yellow-500 text-black absolute -top-1 -right-1">
                                10
                            </div>
                        </button>
                    </Link>

                    {/*Buttons */}
                    <Link
                        to="/login"
                        className="btn btn-sm rounded-full bg-yellow-500 hover:bg-yellow-600 text-white shadow-md transition"
                    >
                        Login
                    </Link>
                    <Link
                        to="/signUp"
                        className="btn btn-sm rounded-full bg-white text-black hover:bg-gray-200 shadow-md transition"
                    >
                        Sign Up
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default NavBar;
