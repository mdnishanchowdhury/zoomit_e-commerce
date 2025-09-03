import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";

function SignUp() {
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, loading } = useContext(AuthContext);
    const navigate = useNavigate();

    // submit function
    const onSubmit = async (data) => {
        try {
            const res = await createUser(data);
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your account has been created successfully!",
                showConfirmButton: false,
                timer: 1500
            });
            navigate("/login");
        } catch (err) {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: err.response?.data?.message || "SignUp failed",
                showConfirmButton: false,
                timer: 1500
            });
        }
    };

    useEffect(() => { document.title = 'Zoom-Shop | SignUp' }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
            <div className="card bg-base-100 w-full max-w-md p-8 shadow-2xl rounded-lg">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">Sign Up</h2>
                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>

                    {/* Name */}
                    <div className="form-control">
                        <label className="label font-semibold">Name</label>
                        <input {...register("name", { required: true })} type="text" className="input input-bordered w-full" placeholder="Name" />
                        {
                            errors.name && <span className="text-red-600">Name is required</span>
                        }
                    </div>

                    {/* Profile Photo */}
                    <div className="form-control">
                        <label className="label font-semibold">Profile Photo</label>
                        <input type="file" {...register("photo")} className="file-input file-input-ghost w-full" />
                    </div>

                    {/* Email */}
                    <div className="form-control">
                        <label className="label font-semibold">Email</label>
                        <input {...register("email", { required: true })} type="email" className="input input-bordered w-full" placeholder="Email" />
                        {
                            errors.email && <span className="text-red-600">Email is required</span>
                        }
                    </div>

                    {/* Password */}
                    <div className="form-control relative">
                        <label className="label font-semibold">Password</label>
                        <input
                            {
                            ...register("password", {
                                required: true,
                                minLength: 6,
                                maxLength: 20,
                                pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{6,}$/
                            })
                            }
                            type={showPassword ? "text" : "password"}
                            className="input input-bordered w-full pr-10"
                            placeholder="Password"
                        />
                        <span
                            className="absolute right-3 top-[38px] cursor-pointer text-gray-600"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>

                        {
                            errors.password?.type === 'minLength' && <span className="text-red-600">Min 6 chars</span>
                        }
                        {
                            errors.password?.type === 'maxLength' && <span className="text-red-600">Max 20 chars</span>
                        }
                        {
                            errors.password?.type === 'pattern' && <span className="text-red-600">Must include uppercase, lowercase & number</span>
                        }
                    </div>

                    {/* Submit */}
                    <div className="form-control mt-4">
                        <input
                            className="btn btn-neutral bg-[#D1A054] w-full"
                            type="submit"
                            value={loading ? "Signing Up..." : "Sign Up"}
                            disabled={loading}
                        />
                    </div>

                </form>
                {/* Go to Login */}
                <p className="text-center mt-6 text-[#D1A054] font-semibold">
                    <span className="font-normal">Already registered? </span>
                    <Link to="/login" className="underline">Go to Login</Link>
                </p>
            </div>
        </div>
    );
}
export default SignUp;
