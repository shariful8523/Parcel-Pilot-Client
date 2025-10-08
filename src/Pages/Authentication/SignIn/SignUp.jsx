import React from "react";
import Bannerimg from "../../../assets/authImage.png";
import Logo from "../../../assets/logo2.png";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import  useAuth  from "../../../Hooks/useAuth"

const SignUp = () => {

  const { createUser } = useAuth()
  const { register, handleSubmit } = useForm();



  const onSubmit = (data) => {
    createUser(data.email, data.password, data.name)
      .then(result => {
        console.log(result.user)
      })
      .catch(error => {
        console.log(error.error)
      })
  };





  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Section - Form */}
      <div className="flex-1 flex flex-col justify-center bg-white px-8 py-10 relative">
        {/* Logo */}
        <div className="absolute top-6 left-8">
          <Link to="/" className="flex items-center gap-2">
            <img src={Logo} alt="Logo" className="object-contain" />
          </Link>
        </div>

        {/* Form Content */}
        <div className="w-full max-w-md space-y-6 mx-auto mt-20">
          <h2 className="text-3xl font-bold text-gray-800">
            Create an Account
          </h2>
          <p className="text-gray-500">Register with Parcel Pilot</p>

          {/* Avatar */}
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 1115 0v.75H4.5v-.75z"
                />
              </svg>
            </div>
          </div>

          {/*  Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                {...register("name")}
                placeholder="Name"
                className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                {...register("email")}
                placeholder="Email"
                className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                {...register("password")}
                placeholder="Password"
                className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
              />
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="w-full bg-lime-500 text-white py-2 rounded-md hover:bg-lime-600 transition"
            >
              Register
            </button>
          </form>

          {/* Login Link */}
          <p className="text-sm text-gray-600 text-center">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-lime-600 font-medium hover:underline"
            >
              Login
            </Link>
          </p>

          {/* Divider */}
          <div className="flex items-center">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="px-3 text-gray-400 text-sm">Or</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>

          {/* Google Signup */}
          <button className="w-full flex items-center justify-center gap-2 border py-2 rounded-md hover:bg-gray-100 transition">
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="google"
              className="w-5 h-5"
            />
            Register with Google
          </button>
        </div>
      </div>

      {/* Right Section - Illustration */}
      <div className="flex-1 bg-lime-50 flex items-center justify-center p-6">
        <img
          src={Bannerimg}
          alt="Sign Up Illustration"
          className="max-w-xs lg:max-w-md w-full"
        />
      </div>
    </div>
  );
};

export default SignUp;
