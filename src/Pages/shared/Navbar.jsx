import { IoMdArrowForward } from "react-icons/io";
import logo from '../../assets/logo2.png'

const Navbar = () => {

    const navItems =
        <>
            <li><a >Home </a> </li>
            <li><a >Services</a></li>
            <li><a >Coverage</a></li>
            <li><a >About Us</a></li>
            <li><a >Pricing</a></li>
            <li><a >Be a Rider</a></li>
        </>

    return (
        <div className="navbar bg-[#FFFFFF]  shadow-sm rounded-2xl w-11/12 mx-auto mt-3  ">

            {/* Left side */}
            <div className="navbar-start">
                {/* Mobile dropdown */}
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow">
                        {navItems}
                    </ul>
                </div>

                {/* Logo */}
                <section className=' md:flex lg:flex  items-center gap-3 hidden  '>
                    <img src={logo} alt="logo" />
                </section>
            </div>

            {/* Middle nav (desktop) */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 ">
                    {navItems}
                </ul>
            </div>

            {/* Right side buttons */}
            <div className="navbar-end gap-3 mr-4 hidden md:flex">
                <button className='border w-28 h-10 rounded-xl  '>Sign In</button>

                <button className='bg-[#CAEB66] w-32 h-10 rounded-xl'>Be a Rider</button>

                <button className="bg-black -rotate-45 text-lime-300 w-12 h-12 rounded-full flex items-center justify-center">
                    <IoMdArrowForward size={28} />
                </button>
            </div>

            {/* Mobile section logo */}

            <section className="md:hidden lg:hidden">
                <img src={logo} alt="" />
            </section>

        </div>
    );
};

export default Navbar;