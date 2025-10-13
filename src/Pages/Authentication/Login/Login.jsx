import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import Bannerimg from "../../../assets/authImage.png";
import Logo from "../../../assets/logo2.png";
import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import SocialLogin from "../socialLogin/socialLogin";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // 👈 Added icons

const Login = () => {
    const { register, handleSubmit, reset } = useForm();
    const { signIn } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [showPassword, setShowPassword] = useState(false); // 👈 State for password visibility

    const from = location.state?.from || "/";

    const onSubmit = (data) => {
        signIn(data.email, data.password)
            .then(() => {
                Swal.fire({
                    icon: "success",
                    title: "Login Successful!",
                    showConfirmButton: false,
                    timer: 1500,
                });
                reset();
                navigate(from);
            })
            .catch((error) => {
                Swal.fire("Error", error.message, "error");
            });
    };

    return (
        <div className="min-h-screen flex flex-col lg:flex-row">
            {/* Left Section */}
            <div className="flex-1 flex items-center justify-center bg-white px-6 py-10">
                <div className="w-full max-w-md space-y-6 relative">
                    <div className="absolute top-6 left-8">
                        <Link to="/" className="flex items-center gap-2">
                            <img src={Logo} alt="Logo" className="object-contain w-32" />
                        </Link>
                    </div>

                    <h2 className="text-3xl font-bold text-gray-800 mt-20">Welcome Back</h2>
                    <p className="text-gray-500">Login with Parcel Pilot</p>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        {/* Email Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                {...register("email")}
                                placeholder="Email"
                                className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
                                required
                            />
                        </div>

                        {/* Password Input with Show/Hide */}
                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                {...register("password")}
                                placeholder="Password"
                                className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
                                required
                            />
                            <div
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-9 cursor-pointer text-gray-500"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-lime-500 text-white py-2 rounded-md hover:bg-lime-600 transition"
                        >
                            Login
                        </button>
                    </form>

                    <p className="text-sm text-gray-600">
                        Don’t have an account?{" "}
                        <Link to="/signup" className="text-lime-600 font-medium hover:underline">
                            Register
                        </Link>
                    </p>

                    <div className="flex items-center">
                        <div className="flex-grow h-px bg-gray-300"></div>
                        <span className="px-3 text-gray-400 text-sm">Or</span>
                        <div className="flex-grow h-px bg-gray-300"></div>
                    </div>

                    <SocialLogin />
                </div>
            </div>

            <div className="flex-1 bg-lime-50 flex items-center justify-center p-6">
                <img src={Bannerimg} alt="Login" className="max-w-xs lg:max-w-md w-full" />
            </div>
        </div>
    );
};

export default Login;
