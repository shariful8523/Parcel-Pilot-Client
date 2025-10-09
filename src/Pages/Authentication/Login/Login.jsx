import { Link, useNavigate } from 'react-router';
import Bannerimg from '../../../assets/authImage.png';
import Logo from '../../../assets/logo2.png';
import { useForm } from 'react-hook-form';
import useAuth from '../../../Hooks/useAuth';
import SocialLogin from '../socialLogin/socialLogin'
const Login = () => {


    const { register, handleSubmit, reset } = useForm();
    const { signIn } = useAuth();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        
        signIn(data.email, data.password)
            .then((result) => {
                console.log('User logged in:', result.user);
                reset();
                navigate("/");
            })
            .catch((error) => {
                console.error('Login error:', error.message);
            });
    };


    return (
        <div className="min-h-screen flex flex-col lg:flex-row">
            {/* Left Section - Login Form */}
            <div className="flex-1 flex items-center justify-center bg-white px-6 py-10">
                <div className="w-full max-w-md space-y-6">
                    <div className="absolute top-6 left-8">
                        <Link to="/" className="flex items-center gap-2">
                            <img src={Logo} alt="Logo" className="object-contain" />
                        </Link>
                    </div>

                    {/* Heading */}
                    <h2 className="text-3xl font-bold text-gray-800 mt-20">Welcome Back</h2>
                    <p className="text-gray-500">Login with Parcel Pilot</p>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                {...register('email')}
                                placeholder="Email"
                                className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                {...register('password')}
                                placeholder="Password"
                                className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
                            />
                            <Link className="mt-5 block text-sm text-lime-600 hover:underline">
                                Forgot Password ?
                            </Link>
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            className="w-full bg-lime-500 text-white py-2 rounded-md hover:bg-lime-600 transition"
                        >
                            Login
                        </button>
                    </form>

                    {/* Register */}
                    <p className="text-sm text-gray-600">
                        Don’t have any account?{' '}
                        <Link to="/signup" className="text-lime-600 font-medium hover:underline">
                            Register
                        </Link>
                    </p>

                    {/* Divider */}
                    <div className="flex items-center">
                        <div className="flex-grow h-px bg-gray-300"></div>
                        <span className="px-3 text-gray-400 text-sm">Or</span>
                        <div className="flex-grow h-px bg-gray-300"></div>
                    </div>

                    {/* Google Login */}
                    <SocialLogin/>
                </div>
            </div>

            {/* Right Section - Illustration */}
            <div className="flex-1 bg-lime-50 flex items-center justify-center p-6">
                <img src={Bannerimg} alt="Login Illustration" className="max-w-xs lg:max-w-md w-full" />
            </div>
        </div>
    );
};

export default Login;
