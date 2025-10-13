import React, { useState } from "react";
import Bannerimg from "../../../assets/authImage.png";
import Logo from "../../../assets/logo2.png";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import SocialLogin from "../socialLogin/socialLogin";
import { updateProfile } from "firebase/auth";
import useAxios from "../../../Hooks/useAxios";
import Swal from "sweetalert2";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";





const SignUp = () => {
  const { createUser, logOut } = useAuth();
  const { register, handleSubmit, reset } = useForm();
  const axiosInstance = useAxios();
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);

  const onSubmit = async (data) => {
    try {
      //  Password Validation
      if (data.password.length < 6) {
        Swal.fire("Weak Password", "Password must be at least 6 characters!", "warning");
        return;
      }

      //  Create Firebase User
      const result = await createUser(data.email, data.password);
      const user = result.user;

      //  Update Firebase display name
      await updateProfile(user, { displayName: data.name });

      // Prepare MongoDB user object
      const userInfo = {
        name: data.name,
        email: data.email,
        role: "user",
        created_at: new Date().toISOString(),
        last_log_in: new Date().toISOString(),
        photoURL: user.photoURL || "",
      };

      //  Save to backend
      await axiosInstance.post("/users", userInfo);

      //  Logout instantly
      await logOut();

      Swal.fire({
        icon: "success",
        title: "Account Created!",
        text: "Please login to continue.",
        confirmButtonColor: "#84cc16",
      }).then(() => {
        navigate("/login");
      });

      reset();
    } catch (error) {
      console.error("Signup error:", error);
      if (error.code === "auth/email-already-in-use") {
        Swal.fire("Error", "This email is already registered!", "error");
      } else {
        Swal.fire("Error", error.message, "error");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Section */}
      <div className="flex-1 flex flex-col justify-center bg-white px-8 py-10 relative">
        <div className="absolute top-6 left-8">
          <Link to="/" className="flex items-center gap-2">
            <img src={Logo} alt="Logo" className="object-contain w-32" />
          </Link>
        </div>

        <div className="w-full max-w-md space-y-6 mx-auto mt-20">
          <h2 className="text-3xl font-bold text-gray-800">Create an Account</h2>
          <p className="text-gray-500">Register with Parcel Pilot</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                {...register("name", { required: true })}
                placeholder="Your name"
                className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                {...register("email", { required: true })}
                placeholder="Your email"
                className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type={showPass ? "text" : "password"}
                {...register("password", { required: true })}
                placeholder="Password"
                className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-9 text-gray-500"
              >
                {showPass ? (
                  <AiOutlineEyeInvisible className="w-5 h-5" />
                ) : (
                  <AiOutlineEye className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="w-full bg-lime-500 text-white py-2 rounded-md hover:bg-lime-600 transition"
            >
              Register
            </button>
          </form>

          <p className="text-sm text-gray-600 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-lime-600 font-medium hover:underline">
              Login
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

      {/* Right Section */}
      <div className="flex-1 bg-lime-50 flex items-center justify-center p-6">
        <img src={Bannerimg} alt="Sign Up" className="max-w-xs lg:max-w-md w-full" />
      </div>
    </div>
  );
};

export default SignUp;
