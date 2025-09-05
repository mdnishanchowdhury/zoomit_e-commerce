import { Link, NavLink, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { useContext } from "react";
import CartButton from "../Componets/Navbar/CartButton";
import { AuthContext } from "../Providers/AuthProvider";

function NavBar() {
    const navigate = useNavigate();
    const { user, token, logoutUser } = useContext(AuthContext);

    // Logout + redirect function
    const handleLogout = () => {
        logoutUser(); // context এর logout function
        navigate("/login"); // login page এ redirect
    };

    const links = (
        <>
            <li>
                <NavLink to="/" className="hover:text-yellow-400">Home</NavLink>
            </li>

            {token && user.role === "user" && (
                <li>
                    <NavLink to="/products" className="hover:text-yellow-400">Products</NavLink>
                </li>
            )}

            {token && user.role === "user" && (
                <li>
                    <NavLink to="/myorders" className="hover:text-yellow-400">My Orders</NavLink>
                </li>
            )}

            {token && user.role === "admin" && (
                <li>
                    <NavLink to="/auth" className="hover:text-yellow-400">Admin Dashboard</NavLink>
                </li>
            )}
        </>
    );

    return (
        <div className="navbar fixed z-10 bg-[#15151580] text-white shadow-sm">
            <div className="w-7xl mx-auto items-center">
                {/* Left Section */}
                <div className="navbar-start items-center">
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
                    <Link to="/" className="text-[16px] md:text-xl font-black uppercase">
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


                    {
                        token && user.role === "user" && (
                            <CartButton />
                        )
                    }
                    {/* Buttons */}
                    {!user ? (
                        <>
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
                        </>
                    ) : (
                        <button
                            onClick={handleLogout}
                            className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
                        >
                            Logout
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default NavBar;
