import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const { userSignIn, loading } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    // submit handler
    const onSubmit = async (data) => {
        try {
            await userSignIn(data);
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Login Successful!",
                showConfirmButton: false,
                timer: 1500
            });
            navigate("/");
        } catch (err) {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: err.response?.data?.message || "SignIn failed",
                showConfirmButton: false,
                timer: 1500
            });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
            <div className="card bg-base-100 w-full max-w-md p-8 shadow-2xl rounded-lg">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
                    Login
                </h2>

                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    {/* Email */}
                    <div className="form-control">
                        <label className="label font-semibold">Email</label>
                        <input
                            {...register("email", { required: "Email is required" })}
                            type="email"
                            className="input input-bordered w-full"
                            placeholder="Email"
                            autoComplete="username" 
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                        )}
                    </div>

                    {/* Password with toggle */}
                    <div className="form-control relative">
                        <label className="label font-semibold">Password</label>
                        <input
                            {...register("password", { required: "Password is required" })}
                            type={showPassword ? "text" : "password"}
                            className="input input-bordered w-full pr-10"
                            placeholder="Password"
                            autoComplete="current-password" 
                        />
                        <span
                            className="absolute right-3 top-[38px] cursor-pointer text-gray-600"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                        )}
                    </div>

                    {/* Submit */}
                    <div className="form-control mt-4">
                        <input
                            className="btn btn-neutral bg-[#D1A054] w-full"
                            type="submit"
                            value={loading ? "Logging in..." : "Login"}
                            disabled={loading}
                        />
                    </div>
                </form>

                {/* Create Account */}
                <p className="text-center mt-6 text-[#D1A054] font-semibold">
                    <span className="font-normal">New here? </span>
                    <Link to="/signUp" className="underline">
                        Create Account
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
