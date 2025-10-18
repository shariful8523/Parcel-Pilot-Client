import { NavLink, Outlet } from 'react-router';
import { Link } from 'react-router';
import logoImg from '../assets/logo2.png';
import { AiFillHome, AiOutlineDashboard } from 'react-icons/ai';
import { MdOutlineInventory2 } from 'react-icons/md';
import { RiHistoryLine } from 'react-icons/ri';
import { FaCheckCircle, FaClock, FaSearchLocation, FaWallet } from 'react-icons/fa';
import { FaMotorcycle, FaHourglassHalf, FaUserShield, FaUserPlus } from "react-icons/fa";
import useUserRole from '../Hooks/useUserRole';

const DashboardLayout = () => {
    const { role, roleLoading } = useUserRole();

    const menuItems = [
        { to: '/dashboard', label: 'Dashboard', icon: <AiOutlineDashboard /> },

    ];

    if (!roleLoading && role === 'user') {
        menuItems.push(
            { to: '/dashboard/myParcel', label: 'My Parcels', icon: <MdOutlineInventory2 /> },
            { to: '/dashboard/paymentHistory', label: 'Payment History', icon: <RiHistoryLine /> },
            { to: '/dashboard/track', label: 'Track a Package', icon: <FaSearchLocation /> },
        )
    }

    if (!roleLoading && role === 'rider') {
        menuItems.push(
            { to: '/dashboard/pending-deliveries', label: 'Pending Deliveries', icon: <FaClock /> },
            { to: '/dashboard/completed-deliveries', label: 'Completed Deliveries', icon: <FaCheckCircle /> },
            { to: '/dashboard/my-earnings', label: 'My Earnings', icon: <FaWallet /> },
        );
    }

    if (!roleLoading && role === 'admin') {
        menuItems.push(
            { to: '/dashboard/makeadmin', label: 'Make Admin', icon: <FaUserShield /> },
            { to: '/dashboard/activeRiders', label: 'Active Riders', icon: <FaMotorcycle /> },
            { to: '/dashboard/pendingRiders', label: 'Pending Riders', icon: <FaHourglassHalf /> },
            { to: '/dashboard/pending-riders', label: 'Assign Rider', icon: <FaUserPlus /> },
        );
    }

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                <div className="navbar bg-base-300 w-full lg:hidden">
                    <div className="flex-none">
                        <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-6 w-6 stroke-current">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </label>
                    </div>
                    <div className="mx-2 flex-1 px-2 font-semibold">Dashboard</div>
                </div>
                <Outlet />
            </div>

            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 space-y-2">
                    <img src={logoImg} alt="Logo" className="w-full mb-4" />

                    {/* Dashboard + other sidebar buttons */}
                    {menuItems.map((item) => (
                        <li key={item.to}>
                            <NavLink
                                to={item.to}
                                end={item.to === '/dashboard'}
                                className={({ isActive }) =>
                                    `flex items-center gap-2 px-3 py-2 rounded-md transition-colors
                                    ${isActive ? 'bg-blue-500 text-white font-semibold' : 'text-gray-700 hover:bg-gray-100 hover:text-blue-500'}`
                                }
                            >
                                {item.icon}
                                <span>{item.label}</span>
                            </NavLink>
                        </li>
                    ))}

                    {/* Website Home Button */}
                    <li>
                        <Link
                            to="/"
                            className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-blue-500"
                        >
                            <AiFillHome />
                            <span>Website Home</span>
                        </Link>
                    </li>

                </ul>
            </div>
        </div>
    );
};

export default DashboardLayout;
