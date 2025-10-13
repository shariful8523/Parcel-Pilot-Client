import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { format } from "date-fns";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const MyParcel = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    // Fetch parcels
    const { data: parcels = [], isLoading } = useQuery({
        queryKey: ["my-parcels", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email, // wait for user email
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

    if (isLoading) return <p className="text-center mt-10">Loading...</p>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">
                My Parcels ({parcels.length})
            </h2>

            <div className="overflow-x-auto shadow-lg rounded-lg">
                <table className="table w-full">
                    <thead className="bg-gray-200 text-gray-700">
                        <tr>
                            <th>SR</th>
                            <th>Parcel Type</th>
                            <th>Created At</th>
                            <th>Sender Address</th>
                            <th>Receiver Address</th>
                            <th>Cost</th>
                            <th>Payment Status</th>
                            <th>Payment Option</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {parcels.map((parcel, index) => (
                            <tr key={parcel._id} className="hover:bg-gray-50">
                                <td>{index + 1}</td>
                                <td>{parcel.parcelType}</td>
                                <td>{format(new Date(parcel.creation_date), "PPp")}</td>
                                <td className="max-w-[200px] truncate">{parcel.senderAddress}</td>
                                <td className="max-w-[200px] truncate">{parcel.receiverAddress}</td>
                                <td>৳ {parcel.deliveryCost}</td>
                                <td>
                                    <span
                                        className={`px-2 py-1 rounded-full text-sm font-semibold ${parcel.payment_status === "paid"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-600"
                                            }`}
                                    >
                                        {parcel.payment_status}
                                    </span>
                                </td>
                                <td>
                                    {parcel.payment_status === "paid" ? "Online Payment" : "Not Paid"}
                                </td>
                                <td className="space-x-2">
                                    <button className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600">
                                        View
                                    </button>
                                    {parcel.payment_status === "unpaid" && (
                                        <button
                                            onClick={() => handlePay(parcel._id)}
                                            className="bg-green-500 text-white px-3 py-1 rounded-md text-sm hover:bg-green-600"
                                        >
                                            Pay
                                        </button>
                                    )}
                                    <button
                                        className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600"
                                        onClick={() => handleDelete(parcel._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyParcel;
