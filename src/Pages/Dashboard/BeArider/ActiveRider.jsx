import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaSearch, FaUserSlash } from "react-icons/fa";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";


const ActiveRiders = () => {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRider, setSelectedRider] = useState(null);

  // Load Active Riders
  const { data: riders = [], isLoading, refetch } = useQuery({
    queryKey: ["activeRiders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders/active");
      return res.data;
    },
  });

  // Handle Deactivation
  const handleDeactivate = async (id) => {
    const confirm = await Swal.fire({
      title: "Deactivate this rider?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, deactivate",
      cancelButtonText: "Cancel",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axiosSecure.patch(`/riders/${id}/status`, { status: "deactivated" });
      Swal.fire("Done", "Rider has been deactivated", "success");
      refetch();
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to deactivate rider", "error");
    }
  };

  const filteredRiders = riders.filter((rider) =>
    rider.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <p>Loading active riders...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Active Riders</h2>

      <div className="mb-4 flex items-center gap-2">
        <FaSearch className="text-gray-500" />
        <input
          type="text"
          placeholder="Search by name"
          className="input input-bordered w-full max-w-xs"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

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
            {filteredRiders.map((rider, index) => (
              <tr key={rider._id} className="hover:bg-gray-100">
                <td>{index + 1}</td>
                <td>{rider.name}</td>
                <td>{rider.email}</td>
                <td>{rider.region}</td>
                <td>{rider.district}</td>
                <td>{rider.warehouse}</td>
                <td className="flex gap-2">
                  <label
                    htmlFor="rider-modal"
                    className="btn btn-sm btn-info"
                    onClick={() => setSelectedRider(rider)}
                  >
                    Details
                  </label>
                  <button
                    className="btn btn-sm btn-error flex items-center gap-1"
                    onClick={() => handleDeactivate(rider._id)}
                  >
                    <FaUserSlash /> Deactivate
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

export default ActiveRiders;
