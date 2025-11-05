import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { format } from "date-fns";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { FaTimes } from "react-icons/fa";
import Loading from "../../components/Loading";
import { Title } from "react-head";

const MyParcel = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const [selectedParcel, setSelectedParcel] = useState(null); // For modal

    // Fetch parcels
    const { data: parcels = [], isLoading } = useQuery({
        queryKey: ["my-parcels", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    // Delete parcel
    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        });

        if (result.isConfirmed) {
            try {
                const res = await axiosSecure.delete(`/parcels/${id}`);
                if (res.data.message) {
                    await queryClient.invalidateQueries(["my-parcels", user?.email]);
                    Swal.fire({
                        title: "Deleted!",
                        text: "Parcel has been deleted.",
                        icon: "success",
                        timer: 1500,
                        showConfirmButton: false,
                    });
                }
            } catch (error) {
                Swal.fire({
                    title: "Error!",
                    text: "Failed to delete parcel.",
                    icon: "error",
                });
                console.log(error);
            }
        }
    };

    // Navigate to payment page
    const handlePay = (id) => {
        navigate(`/dashboard/payment/${id}`);
    };

    if (isLoading)
        return <Loading />;

    return (
        <>

            <Title> Parcel Pilot || My Parcel </Title>
            <div className="p-6 bg-gray-50 min-h-screen">
                <h2 className="text-2xl font-bold mb-6">My Parcels ({parcels.length})</h2>

                <div className="overflow-x-auto shadow-lg rounded-xl bg-white">
                    <table className="w-full table-auto">
                        <thead className="bg-gray-100 text-gray-600 uppercase text-xs md:text-sm">
                            <tr>
                                <th className="px-4 py-3">SR</th>
                                <th className="px-4 py-3">Parcel Type</th>
                                <th className="px-4 py-3">Created At</th>
                                <th className="px-4 py-3">Sender Address</th>
                                <th className="px-4 py-3">Receiver Address</th>
                                <th className="px-4 py-3">Cost</th>
                                <th className="px-4 py-3">Payment Status</th>
                                <th className="px-4 py-3">Payment Option</th>
                                <th className="px-4 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {parcels.map((parcel, index) => (
                                <tr
                                    key={parcel._id}
                                    className="hover:bg-gray-50 transition-colors"
                                >
                                    <td className="px-4 py-3">{index + 1}</td>
                                    <td className="px-4 py-3">{parcel.parcelType}</td>
                                    <td className="px-4 py-3">{format(new Date(parcel.creation_date), "PPp")}</td>
                                    <td className="px-4 py-3 max-w-[150px] truncate">{parcel.senderAddress}</td>
                                    <td className="px-4 py-3 max-w-[150px] truncate">{parcel.receiverAddress}</td>
                                    <td className="px-4 py-3">৳ {parcel.deliveryCost}</td>
                                    <td className="px-4 py-3">
                                        <span
                                            className={`px-2 py-1 rounded-full text-sm font-semibold ${parcel.payment_status === "paid"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-600"
                                                }`}
                                        >
                                            {parcel.payment_status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        {parcel.payment_status === "paid" ? "Online Payment" : "Not Paid"}
                                    </td>
                                    <td className="px-4 py-3 space-x-2 flex flex-wrap">
                                        <button
                                            onClick={() => setSelectedParcel(parcel)}
                                            className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600 transition"
                                        >
                                            View
                                        </button>
                                        {parcel.payment_status === "unpaid" && (
                                            <button
                                                onClick={() => handlePay(parcel._id)}
                                                className="bg-green-500 text-white px-3 py-1 rounded-md text-sm hover:bg-green-600 transition"
                                            >
                                                Pay
                                            </button>
                                        )}
                                        <button
                                            onClick={() => handleDelete(parcel._id)}
                                            className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600 transition"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Modal */}
                {selectedParcel && (
                    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
                        <div className="bg-white/90 backdrop-blur-md rounded-xl w-11/12 md:w-2/3 lg:w-1/2 p-6 relative shadow-lg border border-gray-200">
                            <button
                                onClick={() => setSelectedParcel(null)}
                                className="absolute top-4 right-4 text-gray-700 hover:text-gray-900 text-lg"
                            >
                                <FaTimes />
                            </button>
                            <h3 className="text-xl font-bold mb-4">Parcel Details</h3>
                            <div className="space-y-2">
                                <p><strong>Parcel Type:</strong> {selectedParcel.parcelType}</p>
                                <p><strong>Parcel Name:</strong> {selectedParcel.parcelName}</p>
                                <p><strong>Sender:</strong> {selectedParcel.senderName}, {selectedParcel.senderAddress}</p>
                                <p><strong>Receiver:</strong> {selectedParcel.receiverName}, {selectedParcel.receiverAddress}</p>
                                <p><strong>Delivery Status:</strong> {selectedParcel.delivery_status}</p>
                                <p><strong>Payment Status:</strong> {selectedParcel.payment_status}</p>
                                <p><strong>Delivery Cost:</strong> ৳ {selectedParcel.deliveryCost}</p>
                                <p><strong>Tracking ID:</strong> {selectedParcel.tracking_id}</p>
                                <p><strong>Created At:</strong> {format(new Date(selectedParcel.creation_date), "PPp")}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>

    );
};

export default MyParcel;
