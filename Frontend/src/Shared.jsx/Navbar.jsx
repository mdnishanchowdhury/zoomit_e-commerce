import { Link, NavLink, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import Swal from "sweetalert2";
// import useCart from "../Hook/useCart";
import CartButton from "../Componets/Navbar/CartButton";

function NavBar() {
    const { user, userLogOut } = useContext(AuthContext);
    const navigate = useNavigate();
    // const [cart, refetch] = useCart();

    const handleLogout = async () => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You will be logged out from your account!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, logout!",
            cancelButtonText: "Cancel"
        });

        if (result.isConfirmed) {
            try {
                await userLogOut();
                //   await refetch(); // cart refresh

                Swal.fire({
                    title: "Logged Out!",
                    text: "You have been successfully logged out.",
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false
                });

                navigate("/login", { replace: true });
            } catch (err) {
                Swal.fire({
                    icon: "error",
                    title: "Logout failed",
                    text: err.response?.data?.message || "Something went wrong!"
                });
            }
        }
    };



    // btn 
    const links = (
        <>
            <li>
                <NavLink to="/" className="hover:text-yellow-400">Home</NavLink>
            </li>
            <li>
                <NavLink to="/products" className="hover:text-yellow-400">Products</NavLink>
            </li>
            <li>
                <NavLink to="/orders" className="hover:text-yellow-400">My Orders</NavLink>
            </li>
            <li>
                <NavLink to="/dashboard" className="hover:text-yellow-400">Admin Dashboard</NavLink>
            </li>
        </>
    );

    return (
        <div className="navbar fixed z-10 bg-[#15151580]  text-white shadow-sm">

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
                    <Link to="/" className=" text-[16px] md:text-xl  font-black uppercase">
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
                    {/* Cart
                    <Link to="/cart">
                        <button className="relative flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 hover:bg-white/10 transition">
                            <IoCartOutline className="w-6 h-6" />
                            <div className="badge badge-sm bg-yellow-500 text-black absolute -top-1 -right-1">
                                {cart.length}
                            </div>
                        </button>
                    </Link> */}
                    {/* cart={cart} */}
                    <CartButton ></CartButton>

                    {/*Buttons */}
                    {
                        !user ? <>
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
                            :
                            <>
                                <button onClick={handleLogout} className="btn btn-error">Logout</button>
                            </>
                    }
                </div>
            </div>
        </div>
    );
}

export default NavBar;
