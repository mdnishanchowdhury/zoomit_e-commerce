import { useEffect } from 'react';
import { Link } from 'react-router-dom';

function Login() {
    useEffect(() => {
        document.title = 'Zoomit Shop | Login';
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
            {/* Login Card */}
            <div className="card bg-base-100 w-full max-w-md p-8 shadow-2xl rounded-lg">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">Login</h2>
                <form className="space-y-4">
                    <div className="form-control">
                        <label className="label font-semibold">Email</label>
                        <input
                            name="email"
                            type="email"
                            className="input input-bordered w-full"
                            placeholder="Email"
                            required
                        />
                    </div>

                    <div className="form-control">
                        <label className="label font-semibold">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="input input-bordered w-full"
                            placeholder="Password"
                            required
                        />
                    </div>

                    <div className="form-control mt-4">
                        <input
                            className="btn btn-neutral bg-[#D1A054] w-full"
                            type="submit"
                            value="Login"
                        />
                    </div>
                </form>

                <p className="text-center mt-6 text-[#D1A054] font-semibold">
                    <span className="font-normal">New here? </span>
                    <Link to="/signUp" className="underline">Create a New Account</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
