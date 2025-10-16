import React, { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import {  useNavigate, Link, NavLink } from "react-router";
import { IoMdArrowForward } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import logo from "../../assets/logo2.png";


const Navbar = () => {
    const { user, logOut } = useAuth();
    const [openMenu, setOpenMenu] = useState(false);
    const navigate = useNavigate();

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
                logOut()
                    .then(() => {
                        Swal.fire({
                            icon: "success",
                            title: "Logged Out Successfully!",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                        navigate("/");
                    })
                    .catch((error) => {
                        Swal.fire("Error", error.message, "error");
                    });
            }
        });
    };

    // Navbar items
    const navItems = (
        <>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/services">Services</NavLink></li>
            <li><NavLink to="/coverage">Coverage</NavLink></li>
            <li><NavLink to="/sendparcel">Send A Parcel</NavLink></li>
            {user && <li><NavLink to="/dashboard">Dashboard</NavLink></li>}
            <li><NavLink to="/pricing">Pricing</NavLink></li>
            <li><NavLink to="/about">About Us</NavLink></li>
        </>
    );

    return (
        <div className="navbar bg-white backdrop-blur-md shadow-sm rounded-2xl w-11/12 mx-auto mt-3 sticky top-0 z-50 border border-white/20">
            {/* Left side */}
            <div className="navbar-start">
                {/* Mobile dropdown */}
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                    </div>

                    {/* Dropdown menu content */}
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-56 p-2 shadow"
                    >
                        {navItems}

                        {/* If user logged in, show info bottom */}
                        {user && (
                            <div className="border-t mt-2 pt-2 text-sm text-gray-600">
                                <p className="font-semibold truncate">{user.displayName}</p>
                                <p className="truncate max-w-[180px]">{user.email}</p> {/* 👈 truncate added */}
                                <button
                                    onClick={handleLogout}
                                    className="mt-2 text-red-500 font-semibold"
                                >
                                    Logout
                                </button>
                            </div>
                        )}

                        {/* If NOT logged in, show Sign In + Be a Rider */}
                        {!user && (
                            <div className="border-t mt-2 pt-3 flex flex-col gap-2">
                                <Link to="/login">
                                    <button className="border w-full py-2 rounded-xl text-sm hover:bg-lime-500 hover:text-white hover:border-lime-500 transition">
                                        Sign In
                                    </button>
                                </Link>
                                <Link to="/beArider">
                                    <button className="bg-[#CAEB66] w-full py-2 rounded-xl text-sm font-medium">
                                        Be a Rider
                                    </button>
                                </Link>
                            </div>
                        )}
                    </ul>
                </div>

                {/* Logo */}
                <section className="md:flex lg:flex items-center gap-3 hidden">
                    <img src={logo} alt="logo" className="w-32" />
                </section>
            </div>

            {/* Middle nav (desktop) */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">{navItems}</ul>
            </div>

            {/* Right side (Desktop only) */}
            <div className="navbar-end gap-3 mr-4 hidden md:flex">
                {user ? (
                    <div className="relative">
                        <FaUserCircle
                            size={36}
                            className="cursor-pointer text-gray-600 hover:text-lime-500 transition"
                            onClick={() => setOpenMenu(!openMenu)}
                        />
                        {openMenu && (
                            <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg border rounded-xl p-4">
                                <p className="font-semibold truncate">{user.displayName}</p>
                                <p className="text-sm text-gray-500 truncate max-w-[200px] mb-3">
                                    {user.email}
                                </p>
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
                        <button className="border w-28 h-10 rounded-xl transition hover:bg-lime-500 hover:text-white hover:border-lime-500">
                            Sign In
                        </button>
                    </Link>
                )}

                <Link to="/beArider">
                    <button className="bg-[#CAEB66] w-32 h-10 rounded-xl">
                        Be a Rider
                    </button>
                </Link>

                <button className="bg-black -rotate-45 text-lime-300 w-12 h-12 rounded-full flex items-center justify-center">
                    <IoMdArrowForward size={28} />
                </button>
            </div>

            {/* Mobile logo */}
            <section className="md:hidden lg:hidden">
                <img src={logo} alt="" className="w-24" />
            </section>
        </div>
    );
};

export default Navbar;
