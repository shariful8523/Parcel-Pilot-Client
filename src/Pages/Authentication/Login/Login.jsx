import Bannerimg from '../../../assets/authImage.png'

import Logo from '../../../assets/logo2.png'

const Login = () => {
    return (
        <div className="min-h-screen flex flex-col lg:flex-row">
            {/* Left Section - Login Form */}
            <div className="flex-1 flex items-center justify-center bg-white px-6 py-10">
                <div className="w-full max-w-md space-y-6">
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <img
                            src={Logo}
                            alt=" Logo"
                            
                        />
                    
                    </div>

                    {/* Heading */}
                    <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
                    <p className="text-gray-500">Login with Profast</p>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            placeholder="Email"
                            className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            placeholder="Password"
                            className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
                        />
                        <a href="#" className="text-sm text-lime-600 hover:underline">
                            Forgot Password?
                        </a>
                    </div>

                    {/* Login Button */}
                    <button className="w-full bg-lime-500 text-white py-2 rounded-md hover:bg-lime-600 transition">
                        Login
                    </button>

                    {/* Register */}
                    <p className="text-sm text-gray-600">
                        Don’t have any account?{" "}
                        <a href="#" className="text-lime-600 font-medium hover:underline">
                            Register
                        </a>
                    </p>

                    {/* Divider */}
                    <div className="flex items-center">
                        <div className="flex-grow h-px bg-gray-300"></div>
                        <span className="px-3 text-gray-400 text-sm">Or</span>
                        <div className="flex-grow h-px bg-gray-300"></div>
                    </div>

                    {/* Google Login */}
                    <button className="w-full flex items-center justify-center gap-2 border py-2 rounded-md hover:bg-gray-100 transition">
                        <img
                            src="https://www.svgrepo.com/show/355037/google.svg"
                            alt="google"
                            className="w-5 h-5"
                        />
                        Login with Google
                    </button>
                </div>
            </div>

            {/* Right Section - Illustration */}
            <div className="flex-1 bg-lime-50 flex items-center justify-center p-6">
                <img
                    src={Bannerimg}
                    alt="Login Illustration"
                    className="max-w-xs lg:max-w-md w-full"
                />
            </div>
        </div>
    );
};

export default Login;
