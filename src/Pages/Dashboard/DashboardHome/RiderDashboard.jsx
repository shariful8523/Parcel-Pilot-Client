import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import {
    FaBox,
    FaCheckCircle,
    FaHourglassHalf,
    FaTruck,
    FaClock,
} from "react-icons/fa";
import { Title } from "react-head";

const COLORS = ["#F59E0B", "#3B82F6", "#10B981"]; // Yellow, Blue, Green

const RiderDashboard = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [lastUpdated, setLastUpdated] = useState(new Date());

    // Fetch rider-assigned parcels
    const { data: parcels = [], isLoading: parcelsLoading } = useQuery({
        queryKey: ["rider-parcels", user?.email],
        enabled: !!user?.email,
        queryFn: async () =>
            (await axiosSecure.get(`/parcels?assigned_rider_email=${user?.email}`)).data,
        refetchInterval: 5000,
    });

    // Update last updated timestamp every 5s
    useEffect(() => {
        const interval = setInterval(() => setLastUpdated(new Date()), 5000);
        return () => clearInterval(interval);
    }, []);

    if (parcelsLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-gray-500 text-lg animate-pulse">Loading...</p>
            </div>
        );
    }

    // Summary Calculations
    const totalAssigned = parcels.length;
    const pendingPickup = parcels.filter((p) => p.delivery_status === "rider_assigned").length;
    const inTransit = parcels.filter((p) => p.delivery_status === "in_transit").length;
    const delivered = parcels.filter((p) => p.delivery_status === "delivered").length;

    // Chart Data
    const statusData = [
        { name: "Rider Assigned", value: pendingPickup },
        { name: "In Transit", value: inTransit },
        { name: "Delivered", value: delivered },
    ].filter((item) => item.value > 0); // Hide zero values

    // Recent Parcels
    const recentParcels = [...parcels]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);

    const getStatusColor = (status) => {
        switch (status) {
            case "delivered":
                return "text-green-600";
            case "in_transit":
                return "text-blue-600";
            case "rider_assigned":
                return "text-yellow-600";
            default:
                return "text-gray-600";
        }
    };

    return (

        <>

        <Title> Parcel Pilot || Rider Dashboard </Title>
         <div className="p-6 bg-gray-50 min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">
                    🚴‍♂️ Welcome, {user?.displayName ? user.displayName : "Champion Rider"}! Ready for today's ride? Let's go! 🌟
                </h1>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                    <FaClock /> Last updated: {lastUpdated.toLocaleTimeString()}
                </p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <SummaryCard icon={<FaBox />} color="gray" title="Total Assigned" value={totalAssigned} />
                <SummaryCard icon={<FaHourglassHalf />} color="yellow" title="Pending Pickup" value={pendingPickup} />
                <SummaryCard icon={<FaTruck />} color="blue" title="In Transit" value={inTransit} />
                <SummaryCard icon={<FaCheckCircle />} color="green" title="Delivered" value={delivered} />
            </div>

            {/* Charts & Recent Parcels */}
            <div className="grid md:grid-cols-2 gap-6 mb-10">
                {/* Delivery Status Overview */}
                <div className="bg-white rounded-lg p-5 shadow">
                    <h2 className="text-lg font-semibold mb-3">Delivery Status Overview</h2>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie
                                data={statusData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                label
                            >
                                {statusData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Recent Parcels */}
                <div className="bg-white rounded-lg p-5 shadow">
                    <h2 className="text-lg font-semibold mb-3">Recent Assigned Parcels</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                                <tr>
                                    <th className="px-4 py-2">#</th>
                                    <th className="px-4 py-2">Tracking ID</th>
                                    <th className="px-4 py-2">Receiver</th>
                                    <th className="px-4 py-2">Parcel</th>
                                    <th className="px-4 py-2">Status</th>
                                    <th className="px-4 py-2">Created</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentParcels.map((p, idx) => (
                                    <tr key={p._id} className="border-b hover:bg-gray-50">
                                        <td className="px-4 py-2">{idx + 1}</td>
                                        <td className="px-4 py-2 font-mono text-xs">{p.tracking_id}</td>
                                        <td className="px-4 py-2">{p.receiverName}</td>
                                        <td className="px-4 py-2">{p.parcelName}</td>
                                        <td className={`px-4 py-2 font-semibold ${getStatusColor(p.delivery_status)}`}>
                                            {p.delivery_status.replace("_", " ")}
                                        </td>
                                        <td className="px-4 py-2 text-xs">
                                            {new Date(p.createdAt).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                                {recentParcels.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="px-4 py-2 text-center text-gray-500">
                                            No assigned parcels
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        </>
       
    );
};

// Summary Card Component
const SummaryCard = ({ icon, title, value, color }) => (
    <div className={`bg-white p-4 rounded-lg shadow flex flex-col items-center justify-center text-center hover:scale-105 transition-transform border-t-4 ${color === "green"
            ? "border-green-500"
            : color === "yellow"
                ? "border-yellow-500"
                : color === "blue"
                    ? "border-blue-500"
                    : "border-gray-500"
        }`}>
        <div
            className={`text-3xl mb-2 ${color === "green"
                    ? "text-green-500"
                    : color === "yellow"
                        ? "text-yellow-500"
                        : color === "blue"
                            ? "text-blue-500"
                            : "text-gray-500"
                }`}
        >
            {icon}
        </div>
        <h3 className="text-sm text-gray-500 mb-1">{title}</h3>
        <span className="text-xl font-bold">{value}</span>
    </div>
);

export default RiderDashboard;