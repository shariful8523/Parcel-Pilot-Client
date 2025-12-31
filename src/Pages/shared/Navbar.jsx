import React, { useState, useEffect } from "react";
import useAuth from "../../Hooks/useAuth";
import { useNavigate, Link, NavLink } from "react-router";
import { IoMdArrowForward } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import logo from "../../assets/logo2.png";
import useUserRole from "../../Hooks/useUserRole";


const Navbar = () => {
  const { user, logOut } = useAuth();
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();
  const { role, roleLoading, refetchUserRole } = useUserRole();

  // 🚀 Always refetch role when user changes
  useEffect(() => {
    if (user) {
      refetchUserRole();
    }
  }, [user, refetchUserRole]);

  // Logout Handler
  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#22c55e",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout",
    }).then((result) => {
      if (result.isConfirmed) {
        logOut().then(() => {
          Swal.fire({
            icon: "success",
            title: "Logged Out Successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/");
        });
      }
    });
  };

  // Menu Items Based on Role
  const navItems = (
  <>
    <li><NavLink to="/">Home</NavLink></li>
    <li><NavLink to="/coverage">Coverage</NavLink></li>

    {/* Send Parcel only for USER */}
    {!roleLoading && user && role === "user" && (
      <li><NavLink to="/sendparcel">Send A Parcel</NavLink></li>
    )}

    {/* Dashboards condition */}
    {!roleLoading && user && role === "user" && (
      <li><NavLink to="/dashboard">Dashboard</NavLink></li>
    )}

    {!roleLoading && user && role === "rider" && (
      <li><NavLink to="/dashboard"> Dashboard</NavLink></li>
    )}

    {!roleLoading && user && role === "admin" && (
      <li><NavLink to="/dashboard"> Dashboard</NavLink></li>
    )}

    <li><NavLink to="/about">About Us</NavLink></li>
  </>
);


  return (
    <div className="navbar bg-white backdrop-blur-md shadow-sm rounded-2xl w-11/12 mx-auto mt-3 sticky top-0 z-50 border border-white/20">

      {/* Left */}
      <div className="navbar-start">
        {/* Mobile Menu */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            ☰
          </div>
          <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-56 p-2 shadow">
            {navItems}
          </ul>
        </div>
        <img src={logo} alt="logo" className="w-32 hidden lg:flex" />
      </div>

      {/* Center Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navItems}</ul>
      </div>

      {/* Right Side */}
      <div className="navbar-end gap-3 mr-4 hidden md:flex">
        {user ? (
          <div className="relative">
            <FaUserCircle size={36}
              className="cursor-pointer text-gray-600 hover:text-lime-500 transition"
              onClick={() => setOpenMenu(!openMenu)}
            />
            {openMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg border rounded-xl p-4">
                <p className="font-semibold truncate">{user.displayName}</p>
                <p className="text-sm text-gray-500 truncate mb-3">{user.email}</p>
                <button
                  onClick={handleLogout}
                  className="w-full py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login">
            <button className="border w-28 h-10 rounded-xl hover:bg-lime-500 hover:text-white transition">
              Sign In
            </button>
          </Link>
        )}

        {/* Always visible */}
        <Link to="/beArider">
          <button className="bg-[#CAEB66] w-32 h-10 rounded-xl">
            Be a Rider
          </button>
        </Link>

        <button className="bg-black -rotate-45 text-lime-300 w-12 h-12 rounded-full flex items-center justify-center">
          <IoMdArrowForward size={28} />
        </button>
      </div>

      <img src={logo} alt="" className="w-24 md:hidden" />
    </div>
  );
};

export default Navbar;
