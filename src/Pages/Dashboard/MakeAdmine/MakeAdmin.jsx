import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FaSearch, FaUserShield, FaUserTimes } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const MakeAdmin = () => {
  const axiosSecure = useAxiosSecure();
  const [emailQuery, setEmailQuery] = useState("");
  const [searching, setSearching] = useState(false);

  const {
    data: users = [],
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["users", emailQuery],
    queryFn: async () => {
      if (emailQuery.trim()) {
        setSearching(true);
        const res = await axiosSecure.get(`/users/search?email=${emailQuery}`);
        setSearching(false);
        return res.data;
      } else {
        const res = await axiosSecure.get("/users");
        return res.data;
      }
    },
  });

  const { mutateAsync: updateRole } = useMutation({
    mutationFn: async ({ id, role }) =>
      await axiosSecure.patch(`/users/${id}/role`, { role }),
    onSuccess: () => refetch(),
  });

  const handleRoleChange = async (id, currentRole) => {
    const action = currentRole === "admin" ? "Remove admin" : "Make admin";
    const newRole = currentRole === "admin" ? "user" : "admin";

    const confirm = await Swal.fire({
      title: `${action}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
    });

    if (!confirm.isConfirmed) return;

    try {
      await updateRole({ id, role: newRole });
      Swal.fire("Success", `${action} successful`, "success");
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "Failed to update user role", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 p-6">
      <div className=" mx-auto bg-white shadow-lg rounded-2xl p-6">
        {/* Header */}
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          👥 Manage User Roles
        </h2>

        {/* Search Bar */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center w-full max-w-lg bg-gray-100 rounded-full px-4 py-2 shadow-sm border border-gray-200 focus-within:ring-2 focus-within:ring-green-400">
            <FaSearch className="text-gray-500 mr-3" />
            <input
              type="text"
              className="w-full bg-transparent outline-none text-gray-700"
              placeholder="Search user by email..."
              value={emailQuery}
              onChange={(e) => setEmailQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Loading */}
        {(isFetching || searching) && (
          <p className="text-center text-gray-500 font-medium animate-pulse">
            Loading users...
          </p>
        )}

        {/* No Users */}
        {!isFetching && users.length === 0 && (
          <p className="text-center text-gray-500 font-medium">
            No users found 😔
          </p>
        )}

        {/* User Table */}
        {users.length > 0 && (
          <div className="overflow-x-auto">
            <table className="table w-full border border-gray-200 rounded-xl shadow-sm">
              <thead className="bg-green-100 text-gray-700 text-sm uppercase">
                <tr>
                  <th className="py-3 px-4 text-left">Email</th>
                  <th className="py-3 px-4 text-left">Created At</th>
                  <th className="py-3 px-4 text-left">Role</th>
                  <th className="py-3 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr
                    key={u._id}
                    className="hover:bg-green-50 transition-all duration-200"
                  >
                    <td className="py-3 px-4">{u.email}</td>
                    <td className="py-3 px-4">
                      {new Date(u.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          u.role === "admin"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {u.role || "user"}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() =>
                          handleRoleChange(u._id, u.role || "user")
                        }
                        className={`btn btn-sm rounded-full px-4 ${
                          u.role === "admin"
                            ? "bg-red-500 hover:bg-red-600 text-white"
                            : "bg-green-500 hover:bg-green-600 text-white"
                        }`}
                      >
                        {u.role === "admin" ? (
                          <>
                            <FaUserTimes className="mr-1" />
                            Remove
                          </>
                        ) : (
                          <>
                            <FaUserShield className="mr-1" />
                            Make Admin
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MakeAdmin;
