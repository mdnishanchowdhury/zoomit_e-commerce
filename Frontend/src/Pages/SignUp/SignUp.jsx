import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";

export default function SignUp() {
  const { registerUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    if (!data.photo[0]) {
      setMessage("Profile photo is required!");
      return;
    }
    setLoading(true);
    setMessage("");
    try {
      await registerUser(data);
      setMessage("Registration successful!");
      reset();
      navigate("/login");
    } catch (err) {
      setMessage(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="card bg-base-100 w-full max-w-md p-8 shadow-2xl rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-6">Sign Up</h2>
        {message && <p className="text-red-500 text-center mb-4">{message}</p>}

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control">
            <label className="label font-semibold">Name</label>
            <input {...register("name", { required: "Name is required" })} type="text" className="input input-bordered w-full" />
            {errors.name && <span className="text-red-600">{errors.name.message}</span>}
          </div>

          <div className="form-control">
            <label className="label font-semibold">Profile Photo</label>
            <input type="file" {...register("photo", { required: "Profile photo is required" })} className="file-input file-input-ghost w-full" />
            {errors.photo && <span className="text-red-600">{errors.photo.message}</span>}
          </div>

          <div className="form-control">
            <label className="label font-semibold">Email</label>
            <input {...register("email", { required: "Email is required" })} type="email" className="input input-bordered w-full" />
            {errors.email && <span className="text-red-600">{errors.email.message}</span>}
          </div>

          <div className="form-control relative">
            <label className="label font-semibold">Password</label>
            <input {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Min 6 chars" },
              maxLength: { value: 20, message: "Max 20 chars" },
              pattern: { value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{6,}$/, message: "Must include uppercase, lowercase & number" }
            })}
              type={showPassword ? "text" : "password"}
              className="input input-bordered w-full pr-10"
            />
            <span className="absolute right-3 top-[38px] cursor-pointer text-gray-600" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
            {errors.password && <span className="text-red-600">{errors.password.message}</span>}
          </div>

          <div className="form-control mt-4">
            <input
              type="submit"
              className={`btn btn-neutral w-full ${loading ? "cursor-not-allowed" : ""}`}
              value={loading ? "Signing Up..." : "Sign Up"}
              disabled={loading}
            />
          </div>
        </form>

        <p className="text-center mt-6 text-[#D1A054] font-semibold">
          <span className="font-normal">Already registered? </span>
          <Link to="/login" className="underline">Go to Login</Link>
        </p>
      </div>
    </div>
  );
}