import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { FaClock, FaCheckCircle, FaTruck, FaHourglassHalf } from "react-icons/fa";
import Loading from "../../components/Loading";
import { Title } from "react-head";

const TrackParcel = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [lastUpdated, setLastUpdated] = useState(new Date());

    // Fetch user-related parcels
    const { data: parcels = [], isLoading, isError } = useQuery({
        queryKey: ["user-parcels", user?.email],
        enabled: !!user?.email,
        queryFn: async () =>
            (await axiosSecure.get(`/parcels?email=${user?.email}`)).data,
        refetchInterval: 5000,
    });

    useEffect(() => {
        const interval = setInterval(() => setLastUpdated(new Date()), 5000);
        return () => clearInterval(interval);
    }, []);

    const getStatusClass = (status) => {
        switch (status) {
            case "delivered":
                return "bg-green-100 text-green-800  ";
            case "in_transit":
                return "bg-blue-100 text-blue-800";
            case "rider_assigned":
            case "pending":
                return "bg-yellow-100 text-yellow-800";
            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case "delivered":
                return <FaCheckCircle className="inline mr-1" />;
            case "in_transit":
                return <FaTruck className="inline mr-1" />;
            case "rider_assigned":
            case "pending":
                return <FaHourglassHalf className="inline mr-1" />;
            default:
                return null;
        }
    };

    if (isLoading)
        return (
            <Loading />
        );

    if (isError)
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-red-500 text-lg">Error fetching parcels!</p>
            </div>
        );

    return (
        <>

            <Title> Parcel Pilot || Track Parcel </Title>
            <div className="p-6 bg-gray-50 min-h-screen">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                    <h1 className="text-2xl md:text-3xl font-bold mb-2 md:mb-0">📦 My Parcels</h1>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                        <FaClock /> Last updated: {lastUpdated.toLocaleTimeString()}
                    </p>
                </div>

                <div className="overflow-x-auto">
                    <div className="min-w-[600px] bg-white rounded-xl shadow-lg p-4">
                        <table className="w-full text-left text-sm md:text-base border-separate border-spacing-y-2">
                            <thead className="bg-gray-100 text-gray-600 uppercase text-xs md:text-sm rounded-t-lg">
                                <tr>
                                    <th className="px-4 py-3">#</th>
                                    <th className="px-4 py-3">Parcel Name</th>
                                    <th className="px-4 py-3">Tracking ID</th>
                                    <th className="px-4 py-3">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {parcels.length > 0 ? (
                                    parcels
                                        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                                        .map((parcel, idx) => (
                                            <tr
                                                key={parcel._id}
                                                className="bg-gray-50 hover:bg-gray-100 transition-colors rounded-md"
                                            >
                                                <td className="px-4 py-3">{idx + 1}</td>
                                                <td className="px-4 py-3 font-medium">{parcel.parcelName}</td>
                                                <td className="px-4 py-3 font-mono">{parcel.tracking_id}</td>
                                                <td className="px-4 py-3">
                                                    <span
                                                        className={`px-2 py-1 rounded-full text-xs font-semibold flex items-center ${getStatusClass(
                                                            parcel.delivery_status
                                                        )}`}
                                                    >
                                                        {getStatusIcon(parcel.delivery_status)}
                                                        {parcel.delivery_status.replace("_", " ")}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                ) : (
                                    <tr>
                                        <td colSpan={4} className="px-4 py-4 text-center text-gray-500">
                                            No parcels found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>

    );
};

export default TrackParcel;
