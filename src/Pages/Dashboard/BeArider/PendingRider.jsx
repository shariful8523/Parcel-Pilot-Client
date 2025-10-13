import { useState } from "react";
import Swal from "sweetalert2";
import { FaEye } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const PendingRiders = () => {
    const [selectedRider, setSelectedRider] = useState(null);
    const axiosSecure = useAxiosSecure();

    // Fetch pending riders with React Query
    const { isLoading, data: riders = [], refetch } = useQuery({
        queryKey: ["pending-riders"],
        queryFn: async () => {
            const res = await axiosSecure.get("/riders/pending");
            return res.data;
        },
    });

    if (isLoading) return <p>Loading pending riders...</p>;

    // Approve or Reject rider
    const handleDecision = async (id, action) => {
        const confirm = await Swal.fire({
            title: `${action === "approve" ? "Approve" : "Reject"} Application?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "Cancel",
        });

        if (!confirm.isConfirmed) return;

        try {
            await axiosSecure.patch(`/riders/${id}/status`, {
                status: action === "approve" ? "active" : "rejected",
            });

            Swal.fire("Success", `Rider ${action}d successfully`, "success");
            refetch(); // refresh pending riders
        } catch (err) {
            Swal.fire("Error", "Could not update rider status", "error");
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Pending Riders</h2>

            <div className="overflow-x-auto border rounded-lg shadow-lg">
                <table className="table table-zebra w-full text-sm text-gray-700">
                    <thead className="bg-gray-200 text-gray-800 uppercase text-xs">
                        <tr>
                            <th>SR</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Region</th>
                            <th>District</th>
                            <th>Warehouse</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {riders.map((rider, index) => (
                            <tr key={rider._id} className="hover:bg-gray-100">
                                <td>{index + 1}</td>
                                <td>{rider.name}</td>
                                <td>{rider.email}</td>
                                <td>{rider.region}</td>
                                <td>{rider.district}</td>
                                <td>{rider.warehouse}</td>
                                <td className="flex gap-2">
                                    <button
                                        className="btn btn-sm btn-success"
                                        onClick={() => handleDecision(rider._id, "approve")}
                                    >
                                        Approve
                                    </button>
                                    <label
                                        htmlFor="rider-modal"
                                        className="btn btn-sm btn-info"
                                        onClick={() => setSelectedRider(rider)}
                                    >
                                        <FaEye /> Details
                                    </label>
                                    <button
                                        className="btn btn-sm btn-error"
                                        onClick={() => handleDecision(rider._id, "reject")}
                                    >
                                        Reject
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Rider Details Modal */}
            {selectedRider && <input type="checkbox" id="rider-modal" className="modal-toggle" />}
            <div className="modal">
                <div className="modal-box relative">
                    <label
                        htmlFor="rider-modal"
                        className="btn btn-sm btn-circle absolute right-2 top-2"
                        onClick={() => setSelectedRider(null)}
                    >
                        ✕
                    </label>
                    <h3 className="text-lg font-bold mb-4">Rider Details</h3>
                    {selectedRider && (
                        <div className="space-y-2 text-gray-700">
                            <p><strong>Name:</strong> {selectedRider.name}</p>
                            <p><strong>Email:</strong> {selectedRider.email}</p>
                            <p><strong>Region:</strong> {selectedRider.region}</p>
                            <p><strong>District:</strong> {selectedRider.district}</p>
                            <p><strong>Warehouse:</strong> {selectedRider.warehouse}</p>
                            <p><strong>NID:</strong> {selectedRider.nid}</p>
                            <p><strong>Contact:</strong> {selectedRider.contact}</p>
                            <p><strong>Status:</strong> {selectedRider.status}</p>
                            <p>
                                <strong>Applied At:</strong>{" "}
                                {new Date(selectedRider.created_at).toLocaleString()}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PendingRiders;
