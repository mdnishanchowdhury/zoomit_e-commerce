// import { useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { Link } from "react-router-dom";
// function SignUp() {
//     const { register, formState: { errors } } = useForm();

//     useEffect(() => {
//         document.title = 'Zoom-Shop | SignUp';
//     }, []);
//     return (
//         <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
//             {/* SignUp Card */}
//             <div className="card bg-base-100 w-full max-w-md p-8 shadow-2xl rounded-lg">
//                 <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">Sign Up</h2>
//                 <form className="space-y-4">
//                     {/* Name */}
//                     <div className="form-control">
//                         <label className="label font-semibold">Name</label>
//                         <input
//                             name="name"
//                             {...register("name")}
//                             type="text"
//                             className="input input-bordered w-full"
//                             placeholder="Name"
//                         />
//                         {errors.name && <span className="text-red-600">Name is required</span>}
//                     </div>

//                     {/* Photo URL */}
//                     <div className="form-control">
//                         <label className="label font-semibold">Profile Photo</label>
//                         <input type="file" className="file-input file-input-ghost" />
//                         {errors.PhotoURl && <span className="text-red-600">Photo URL is required</span>}
//                     </div>

//                     {/* Email */}
//                     <div className="form-control">
//                         <label className="label font-semibold">Email</label>
//                         <input
//                             name="email"
//                             {...register("email", { required: true })}
//                             type="email"
//                             className="input input-bordered w-full"
//                             placeholder="Email"
//                         />
//                         {errors.email && <span className="text-red-600">Email is required</span>}
//                     </div>

//                     {/* Password */}
//                     <div className="form-control">
//                         <label className="label font-semibold">Password</label>
//                         <input
//                             type="password"
//                             {...register("password", {
//                                 required: true,
//                                 minLength: 6,
//                                 maxLength: 20,
//                                 pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{6,}$/
//                             })}
//                             name="password"
//                             className="input input-bordered w-full"
//                             placeholder="Password"
//                         />
//                         {errors.password?.type === 'minLength' && <span className="text-red-600">Password must be at least 6 characters</span>}
//                         {errors.password?.type === 'maxLength' && <span className="text-red-600">Password must be less than 20 characters</span>}
//                         {errors.password?.type === 'pattern' && <span className="text-red-600">Password must have one uppercase, one lowercase & one number</span>}
//                     </div>

//                     {/* Submit Button */}
//                     <div className="form-control mt-4">
//                         <input
//                             className="btn btn-neutral bg-[#D1A054] w-full"
//                             type="submit"
//                             value="Sign Up"
//                         />
//                     </div>
//                 </form>

//                 {/* Footer Link */}
//                 <p className="text-center mt-6 text-[#D1A054] font-semibold">
//                     <span className="font-normal">Already registered? </span>
//                     <Link to="/login" className="underline">Go to Login</Link>
//                 </p>
//             </div>
//         </div>
//     )
// }

// export default SignUp;