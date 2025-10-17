import { NavLink, Outlet } from 'react-router';
import logoImg from '../assets/logo2.png';
import { AiFillHome } from 'react-icons/ai';
import { MdOutlineInventory2 } from 'react-icons/md';
import { RiHistoryLine } from 'react-icons/ri';
import { FaSearchLocation } from 'react-icons/fa';
import { FaMotorcycle, FaHourglassHalf } from "react-icons/fa";
import useUserRole from '../Hooks/useUserRole';
import { FaUserShield } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa";


const DashboardLayout = () => {

    const { role, roleLoading } = useUserRole();



    // Basic menu items
    const menuItems = [
        { to: '/', label: 'Home', icon: <AiFillHome /> },
        { to: '/dashboard/myParcel', label: 'My Parcels', icon: <MdOutlineInventory2 /> },
        { to: '/dashboard/paymentHistory', label: 'Payment History', icon: <RiHistoryLine /> },
        { to: '/dashboard/track', label: 'Track a Package', icon: <FaSearchLocation /> },
    ];

    // Add admin items dynamically (if role = admin)
    if (!roleLoading && role === 'admin') {
        menuItems.push(
            { to: '/dashboard/activeRiders', label: 'Active Riders', icon: <FaMotorcycle /> },
            { to: '/dashboard/pendingRiders', label: 'Pending Riders', icon: <FaHourglassHalf /> },
            { to: '/dashboard/makeadmin', label: 'Make Admin', icon: <FaUserShield /> },
            { to: '/dashboard/pending-riders', label: 'Assign Rider', icon: <FaUserPlus /> },
        );
    }

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">

                {/* Navbar for mobile */}
                <div className="navbar bg-base-300 w-full lg:hidden">
                    <div className="flex-none">
                        <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-6 w-6 stroke-current">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </label>
                    </div>
                    <div className="mx-2 flex-1 px-2 lg:hidden font-semibold">Dashboard</div>
                </div>

                {/* Page content */}
                <Outlet />
            </div>

            {/* Sidebar */}
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 space-y-2">
                    <img src={logoImg} alt="Logo" className="w-full mb-4" />
                    {menuItems.map((item) => (
                        <li key={item.to}>
                            <NavLink
                                to={item.to}
                                className={({ isActive }) =>
                                    `flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${isActive ? 'bg-blue-100 text-blue-600 font-semibold' : 'hover:bg-gray-100 hover:text-blue-500'
                                    }`
                                }
                            >
                                {item.icon}
                                <span>{item.label}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default DashboardLayout;
