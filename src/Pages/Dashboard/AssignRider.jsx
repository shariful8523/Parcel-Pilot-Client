import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  FaMotorcycle,
  FaUserTie,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaBoxOpen,
  FaUserAlt,
} from "react-icons/fa";
import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useTrackingLogger from "../../Hooks/useTrackingLogger";
import useAuth from "../../Hooks/useAuth";

const AssignRider = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [selectedRider, setSelectedRider] = useState(null);
  const [riders, setRiders] = useState([]);
  const [loadingRiders, setLoadingRiders] = useState(false);
  const queryClient = useQueryClient();
  const { logTracking } = useTrackingLogger();
  const {user} = useAuth();

  //  Fetch parcels that are paid & not yet collected
  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ["assignableParcels"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        "/parcels?payment_status=paid&delivery_status=not_collected"
      );
      return res.data.sort(
        (a, b) => new Date(a.creation_date) - new Date(b.creation_date)
      );
    },
  });

  //  Assign Rider mutation
  const { mutateAsync: assignRider } = useMutation({
    mutationFn: async ({ parcelId, rider }) => {
      setSelectedRider(rider);
      const res = await axiosSecure.patch(`/parcels/${parcelId}/assign`, {
        riderId: rider._id,
        riderEmail: rider.email,
        riderName: rider.name,
      });
      return res.data;
    },
    onSuccess: async () => {
      queryClient.invalidateQueries(["assignableParcels"]);
      Swal.fire(" Success", "Rider assigned successfully!", "success");

      // track rider assigned

      await logTracking({
        tracking_id: selectedParcel.tracking_id,
        status: "rider_assigned",
        details: `Assigned to  ${selectedRider.name}`,
        updated_by: user.email,
      });

      document.getElementById("assignModal").close();
    },
    onError: () => {
      Swal.fire("❌ Error", "Failed to assign rider", "error");
    },
  });

  //  Open modal and load riders
  const openAssignModal = async (parcel) => {
    setSelectedParcel(parcel);
    setLoadingRiders(true);
    setRiders([]);

    try {
      const res = await axiosSecure.get("/riders/available", {
        params: { district: parcel.senderRegion },
      });
      setRiders(res.data);
    } catch (error) {
      Swal.fire("Error", "Failed to load riders", "error");
      console.log(error);
    } finally {
      setLoadingRiders(false);
      document.getElementById("assignModal").showModal();
    }
  };

  if (isLoading)
    return <p className="text-center py-10 text-gray-600">Loading parcels...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-5 flex items-center gap-2 text-indigo-700">
        <FaMotorcycle /> Assign Rider
      </h2>

      {/*  Parcels Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="table w-full text-left">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th>Tracking ID</th>
              <th>Parcel</th>
              <th>Sender Info</th>
              <th>Receiver Info</th>
              <th>Cost</th>
              <th>Assign</th>
            </tr>
          </thead>
          <tbody>
            {parcels.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-5 text-gray-500">
                  No pending parcels to assign
                </td>
              </tr>
            ) : (
              parcels.map((parcel) => (
                <tr key={parcel._id} className="hover:bg-gray-100 transition">
                  <td className="font-semibold">{parcel.tracking_id}</td>
                  <td>
                    <div className="flex flex-col">
                      <span className="font-medium">{parcel.parcelName}</span>
                      <span className="text-sm text-gray-500 flex items-center gap-1">
                        <FaBoxOpen className="text-indigo-500" />
                        {parcel.parcelType}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="text-sm text-gray-700">
                      <p className="font-semibold flex items-center gap-1">
                        <FaUserAlt className="text-indigo-500" />{" "}
                        {parcel.senderName}
                      </p>
                      <p className="flex items-center gap-1">
                        <FaMapMarkerAlt className="text-gray-500" />{" "}
                        {parcel.senderRegion}, {parcel.senderWarehouse}
                      </p>
                      <p className="flex items-center gap-1">
                        <FaPhoneAlt className="text-gray-500" />{" "}
                        {parcel.senderContact}
                      </p>
                    </div>
                  </td>
                  <td>
                    <div className="text-sm text-gray-700">
                      <p className="font-semibold flex items-center gap-1">
                        <FaUserAlt className="text-indigo-500" />{" "}
                        {parcel.receiverName}
                      </p>
                      <p className="flex items-center gap-1">
                        <FaMapMarkerAlt className="text-gray-500" />{" "}
                        {parcel.receiverRegion}, {parcel.receiverWarehouse}
                      </p>
                      <p className="flex items-center gap-1">
                        <FaPhoneAlt className="text-gray-500" />{" "}
                        {parcel.receiverContact}
                      </p>
                    </div>
                  </td>
                  <td className="font-semibold text-indigo-600">
                    ৳{parcel.deliveryCost}
                  </td>
                  <td>
                    <button
                      onClick={() => openAssignModal(parcel)}
                      className="btn btn-sm bg-indigo-600 hover:bg-indigo-700 text-white"
                    >
                      Assign
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* 🚴 Assign Rider Modal */}
      <dialog id="assignModal" className="modal">
        <div className="modal-box max-w-lg">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-indigo-700">
            <FaUserTie /> Assign Rider
          </h3>

          {loadingRiders ? (
            <p className="text-center py-4 text-gray-500">Loading riders...</p>
          ) : riders.length === 0 ? (
            <p className="text-center py-4 text-red-500">
              No available riders in this area!
            </p>
          ) : (
            <div className="grid gap-4">
              {riders.map((rider) => (
                <div
                  key={rider._id}
                  className={`border rounded-lg p-4 flex justify-between items-center transition ${rider.status === "rejected"
                      ? "bg-gray-100 opacity-60 cursor-not-allowed"
                      : "hover:bg-indigo-100 cursor-pointer"
                    }`}
                  onClick={() =>
                    rider.status !== "rejected" &&
                    assignRider({ parcelId: selectedParcel._id, rider })
                  }
                >
                  <div>
                    <p className="font-semibold text-indigo-700">
                      {rider.name}
                    </p>
                    <p className="text-sm text-gray-600 flex items-center gap-1">
                      <FaMapMarkerAlt className="text-gray-500" />{" "}
                      {rider.district}, {rider.warehouse}
                    </p>
                    <p className="text-sm text-gray-600 flex items-center gap-1">
                      <FaPhoneAlt className="text-gray-500" /> {rider.contact}
                    </p>
                  </div>
                  <span
                    className={`font-semibold px-3 py-1 rounded-full text-sm ${rider.status === "rejected"
                        ? "bg-red-100 text-red-600"
                        : "bg-green-100 text-green-700"
                      }`}
                  >
                    {rider.status}
                  </span>
                </div>
              ))}
            </div>
          )}

          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AssignRider;
