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
  FaMoneyBillWave,
  FaClock,
} from "react-icons/fa";

const COLORS = ["#10B981", "#3B82F6", "#F59E0B", "#EF4444"];

const UserDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // ---------- Fetch user-related parcels ----------
  const { data: parcels = [], isLoading: parcelsLoading } = useQuery({
    queryKey: ["user-parcels", user?.email],
    enabled: !!user?.email,
    queryFn: async () =>
      (await axiosSecure.get(`/parcels?email=${user?.email}`)).data,
    refetchInterval: 5000,
  });

  // ---------- Fetch user-related payments ----------
  const { data: payments = [], isLoading: paymentsLoading } = useQuery({
    queryKey: ["user-payments", user?.email],
    enabled: !!user?.email,
    queryFn: async () =>
      (await axiosSecure.get(`/payments?email=${user?.email}`)).data,
    refetchInterval: 5000,
  });

  // Update last updated timestamp every 5s
  useEffect(() => {
    const interval = setInterval(() => setLastUpdated(new Date()), 5000);
    return () => clearInterval(interval);
  }, []);

  if (parcelsLoading || paymentsLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500 text-lg animate-pulse">Loading...</p>
      </div>
    );
  }

  // ---------- Summary Calculations ----------
  const totalParcels = parcels?.length || 0;
  const totalDelivered =
    parcels?.filter((p) => p.delivery_status === "delivered")?.length || 0;
  const totalPending =
    parcels?.filter((p) => p.delivery_status !== "delivered")?.length || 0;
  const totalPaid = payments?.reduce((sum, p) => sum + (p.amount || 0), 0) || 0;

  // ---------- Chart Data ----------
  const parcelStatusData = [
    { name: "Delivered", value: totalDelivered },
    { name: "Pending", value: totalPending },
  ];

  // ---------- Last 5 Parcels ----------
  const lastParcels = [...parcels]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          Welcome, {user?.displayName || "User"}
        </h1>
        <p className="text-sm text-gray-500 flex items-center gap-1">
          <FaClock /> Last updated: {lastUpdated.toLocaleTimeString()}
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2   md:grid-cols-4 lg:grid-cols-4 gap-4 mb-8">
        <SummaryCard icon={<FaBox />} color="gray" title="Total Parcels" value={totalParcels} />
        <SummaryCard
          icon={<FaCheckCircle />}
          title="Delivered"
          value={totalDelivered}
          color="green"
        />
        <SummaryCard
          icon={<FaHourglassHalf />}
          title="Pending"
          value={totalPending}
          color="yellow"
        />
        <SummaryCard
          icon={<FaMoneyBillWave />}
          title="Total Paid (BDT)"
          value={totalPaid.toFixed(0)}
          color="blue"
        />
      </div>

      {/* Charts & Last Parcels */}
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        {/* Parcel Status Overview */}
        <div className="bg-white rounded-lg p-5 shadow">
          <h2 className="text-lg font-semibold mb-3">Parcel Status Overview</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={parcelStatusData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {parcelStatusData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Last 5 Parcels */}
        <div className="bg-white rounded-lg p-5 shadow">
          <h2 className="text-lg font-semibold mb-3">Last 5 Parcels</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                <tr>
                  <th className="px-4 py-2">#</th>
                  <th className="px-4 py-2">Parcel ID</th>
                  <th className="px-4 py-2">Created At</th>
                  <th className="px-4 py-2">Delivery Status</th>
                  <th className="px-4 py-2">Paid Amount</th>
                  <th className="px-4 py-2">Payment Status</th>
                </tr>
              </thead>
              <tbody>
                {lastParcels.map((p, idx) => (
                  <tr key={p._id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">{idx + 1}</td>
                    <td className="px-4 py-2">{p._id}</td>
                    <td className="px-4 py-2">
                      {new Date(p.createdAt).toLocaleString()}
                    </td>
                    <td className="px-4 py-2 font-semibold text-blue-600">
                      {p.delivery_status}
                    </td>
                    <td className="px-4 py-2 font-semibold text-green-600">
                      {p.payment_status === "paid"
                        ? payments.find(pay => pay.parcelId === p._id)?.amount || 0
                        : 0}
                    </td>
                    <td className="px-4 py-2 capitalize">
                      {p.payment_status || "unpaid"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

// ---------- Summary Card Component ----------
const SummaryCard = ({ icon, title, value, color }) => (
  <div
    className={`bg-white p-4 rounded-lg shadow flex flex-col items-center justify-center text-center hover:scale-105 transition-transform border-t-4 ${
      color === "green"
        ? "border-green-500"
        : color === "yellow"
        ? "border-yellow-500"
        : color === "blue"
        ? "border-blue-500"
        : color === "purple"
        ? "border-purple-500"
        : color === "gray"
        ? "border-gray-500"
        : "border-transparent"
    }`}
  >
    <div className="text-3xl text-blue-500 mb-2">{icon}</div>
    <h3 className="text-sm text-gray-500 mb-1">{title}</h3>
    <span className="text-xl font-bold">{value}</span>
  </div>
);

export default UserDashboard;
