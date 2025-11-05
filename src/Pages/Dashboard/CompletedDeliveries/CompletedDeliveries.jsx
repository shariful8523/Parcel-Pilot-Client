import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaUser, FaMapMarkerAlt, FaPhoneAlt, FaBox, FaTruck, FaClock, FaMoneyBillWave } from "react-icons/fa";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { Title } from "react-head";

const CompletedDeliveries = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const email = user?.email;

  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ["completedDeliveries", email],
    enabled: !!email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/rider/completed-parcels?email=${email}`);
      return res.data;
    },
  });

  const calculateEarning = (parcel) => {
    const cost = Number(parcel.deliveryCost || parcel.cost);
    if (parcel.senderCoveredArea === parcel.receiverCoveredArea) {
      return cost * 0.8;
    } else {
      return cost * 0.3;
    }
  };

  const { mutateAsync: cashout } = useMutation({
    mutationFn: async (parcelId) => {
      const res = await axiosSecure.patch(`/parcels/${parcelId}/cashout`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["completedDeliveries"]);
    },
  });

  const handleCashout = (parcelId) => {
    Swal.fire({
      title: "Confirm Cashout",
      text: "You are about to cash out this delivery.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Cash Out",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        cashout(parcelId)
          .then(() => Swal.fire("Success", "Cashout completed.", "success"))
          .catch(() => Swal.fire("Error", "Failed to cash out. Try again.", "error"));
      }
    });
  };

  return (

    <>
    <Title> Parcel Pilot || Completed Deliveries </Title>
     <div className="p-6 space-y-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">✅ Completed Deliveries</h2>

      {isLoading ? (
        <p className="text-gray-500">Loading...</p>
      ) : parcels.length === 0 ? (
        <p className="text-gray-500">No deliveries completed yet.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {parcels.map((parcel) => (
            <div key={parcel._id} className="bg-white shadow-lg rounded-2xl p-5 border border-gray-100 hover:shadow-2xl transition-all">
              
              {/* Header */}
              <div className="flex items-center gap-2 mb-3">
                <FaBox className="text-2xl text-blue-500" />
                <h3 className="text-xl font-bold text-gray-800">{parcel.parcelName}</h3>
              </div>
              <p className="text-sm text-gray-500 mb-3">Tracking ID: {parcel.tracking_id}</p>

              {/* Sender & Receiver */}
              <div className="space-y-2 mb-3">
                <p className="text-blue-600 font-semibold flex items-center gap-2">
                  <FaUser /> Sender: {parcel.senderName} ({parcel.senderCoveredArea})
                </p>
                <p className="text-green-600 font-semibold flex items-center gap-2">
                  <FaUser /> Receiver: {parcel.receiverName} ({parcel.receiverCoveredArea})
                </p>
              </div>

              {/* Addresses & Contacts */}
              <div className="text-gray-700 text-sm space-y-1 mb-3">
                <p className="flex items-center gap-2"><FaMapMarkerAlt className="text-blue-400" /> {parcel.senderAddress}</p>
                <p className="flex items-center gap-2"><FaPhoneAlt className="text-green-400" /> {parcel.senderContact}</p>
                <p className="flex items-center gap-2"><FaMapMarkerAlt className="text-green-400" /> {parcel.receiverAddress}</p>
                <p className="flex items-center gap-2"><FaPhoneAlt className="text-blue-400" /> {parcel.receiverContact}</p>
              </div>

              {/* Delivery Info */}
              <div className="flex flex-col gap-1 mb-3 text-gray-600 text-sm">
                <p className="flex items-center gap-2"><FaTruck /> Type: {parcel.parcelType}</p>
                <p className="flex items-center gap-2"><FaTruck /> Weight: {parcel.parcelWeight} kg</p>
                <p className="flex items-center gap-2"><FaMoneyBillWave /> Cost: ৳{parcel.deliveryCost}</p>
                <p className="flex items-center gap-2"><FaClock /> Picked At: {new Date(parcel.picked_at).toLocaleString()}</p>
                <p className="flex items-center gap-2"><FaClock /> Delivered At: {new Date(parcel.delivered_at).toLocaleString()}</p>
              </div>

              {/* Rider Info */}
              <div className="text-gray-800 text-sm mb-3">
                <p className="font-semibold">Rider Assigned:</p>
                <p>{parcel.assigned_rider_name} ({parcel.assigned_rider_email})</p>
              </div>

              {/* Earning & Cashout */}
              <div className="flex justify-between items-center mt-3">
                <p className="text-green-600 font-bold text-lg">Your Earning: ৳{calculateEarning(parcel).toFixed(2)}</p>
                {parcel.cashout_status === "cashed_out" ? (
                  <span className="badge badge-success text-xs px-3 py-1">Cashed Out</span>
                ) : (
                  <button
                    onClick={() => handleCashout(parcel._id)}
                    className="bg-yellow-400 text-black px-3 py-1 rounded-lg text-sm font-semibold hover:bg-yellow-500 transition"
                  >
                    Cashout
                  </button>
                )}
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
    </>
   
  );
};

export default CompletedDeliveries;
