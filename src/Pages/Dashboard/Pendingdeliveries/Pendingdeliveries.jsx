import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import useTrackingLogger from "../../../Hooks/useTrackingLogger";
import {
  FaTruck,
  FaMapMarkerAlt,
  FaUser,
  FaMoneyBillWave,
  FaClipboardCheck,
} from "react-icons/fa";
import Loading from "../../../components/Loading";

const PendingDeliveries = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { logTracking } = useTrackingLogger();
  const { user } = useAuth();

  // Load parcels assigned to the current rider
  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ["riderParcels"],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/rider/parcels?email=${user.email}`);
      return res.data;
    },
  });

  // Mutation for updating parcel status
  const { mutateAsync: updateStatus } = useMutation({
    mutationFn: async ({ parcel, status }) => {
      const res = await axiosSecure.patch(`/parcels/${parcel._id}/status`, {
        status,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["riderParcels"]);
    },
  });

  const handleStatusUpdate = (parcel, newStatus) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Mark parcel as ${newStatus.replace("_", " ")}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, update",
    }).then((result) => {
      if (result.isConfirmed) {
        updateStatus({ parcel, status: newStatus })
          .then(async () => {
            Swal.fire("Updated!", "Parcel status updated.", "success");

            let trackDetails = `Picked up by ${user.displayName}`;
            if (newStatus === "delivered") {
              trackDetails = `Delivered by ${user.displayName}`;
            }
            await logTracking({
              tracking_id: parcel.tracking_id,
              status: newStatus,
              details: trackDetails,
              updated_by: user.email,
            });
          })
          .catch(() => {
            Swal.fire("Error!", "Failed to update status.", "error");
          });
      }
    });
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-6 flex items-center gap-3">
        <FaTruck className="text-blue-600" />
        Pending Deliveries
      </h2>

      {isLoading ? (
        
          <Loading/>
        
      ) : parcels.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No assigned deliveries yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {parcels.map((parcel) => (
            <div
              key={parcel._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 border border-gray-100 p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-semibold bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                    {parcel.parcelType}
                  </span>
                  <span className="text-sm font-medium text-gray-500">
                    #{parcel.tracking_id}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {parcel.parcelName}
                </h3>

                <div className="space-y-2 text-sm text-gray-600">
                  <p className="flex items-center gap-2">
                    <FaUser className="text-gray-400" />{" "}
                    <span>
                      <b>Receiver:</b> {parcel.receiverName}
                    </span>
                  </p>
                  <p className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-gray-400" />{" "}
                    <span>
                      <b>Destination:</b> {parcel.receiverCoveredArea},{" "}
                      {parcel.receiverRegion}
                    </span>
                  </p>
                  <p className="flex items-center gap-2">
                    <FaMoneyBillWave className="text-gray-400" />{" "}
                    <span>
                      <b>Cost:</b> ৳{parcel.deliveryCost}
                    </span>
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    parcel.delivery_status === "rider_assigned"
                      ? "bg-yellow-100 text-yellow-700"
                      : parcel.delivery_status === "in_transit"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {parcel.delivery_status.replace("_", " ")}
                </span>

                {parcel.delivery_status === "rider_assigned" && (
                  <button
                    onClick={() => handleStatusUpdate(parcel, "in_transit")}
                    className="btn btn-sm bg-blue-600 hover:bg-blue-700 text-white border-none rounded-lg transition"
                  >
                    <FaClipboardCheck className="mr-1" /> Picked Up
                  </button>
                )}
                {parcel.delivery_status === "in_transit" && (
                  <button
                    onClick={() => handleStatusUpdate(parcel, "delivered")}
                    className="btn btn-sm bg-green-600 hover:bg-green-700 text-white border-none rounded-lg transition"
                  >
                    <FaClipboardCheck className="mr-1" /> Delivered
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PendingDeliveries;
