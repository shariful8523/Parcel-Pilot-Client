import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import {
  FaClock,
  FaUsers,
  FaUserTie,
  FaBox,
  FaCheckCircle,
  FaHourglassHalf,
  FaMoneyBillWave,
  FaMotorcycle,
  FaUserShield,
  FaChartLine,
  FaTruck,
} from "react-icons/fa";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import Loading from "../../../components/Loading";
import { Title } from "react-head";

const COLORS = ["#F59E0B", "#3B82F6", "#10B981", "#EF4444"];

const SummaryCard = ({ icon, title, value, color }) => (
  <div
    className={`bg-white p-4 rounded-lg shadow flex flex-col items-center justify-center text-center hover:scale-105 transition-transform border-t-4 ${color === "green"
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

const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // ---------- Fetch Data ----------
  const {
    data: users = [],
    isLoading: usersLoading,
    refetch: refetchUsers,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => (await axiosSecure.get("/users")).data,
  });

  const {
    data: parcels = [],
    isLoading: parcelsLoading,
    refetch: refetchParcels,
  } = useQuery({
    queryKey: ["parcels"],
    queryFn: async () => (await axiosSecure.get("/parcels")).data,
  });

  const {
    data: payments = [],
    isLoading: paymentsLoading,
    refetch: refetchPayments,
  } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => (await axiosSecure.get("/payments")).data,
  });

  const {
    data: riders = [],
    isLoading: ridersLoading,
    refetch: refetchRiders,
  } = useQuery({
    queryKey: ["riders-active"],
    queryFn: async () => (await axiosSecure.get("/riders/active")).data,
  });

  // ---------- Auto Refresh Every 5s ----------
  useEffect(() => {
    const interval = setInterval(() => {
      refetchUsers();
      refetchParcels();
      refetchPayments();
      refetchRiders();
      setLastUpdated(new Date());
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // ---------- Loading ----------
  if (usersLoading || parcelsLoading || paymentsLoading || ridersLoading) {
    return (
      <Loading/>
    );
  }

  // ---------- Summary Calculations ----------
  const totalStaffs = users.filter((u) => u.role !== "user").length;
  const totalSenders = users.filter((u) => u.role === "user").length;
  const totalParcels = parcels.length;
  const totalDelivered = parcels.filter((p) => p.delivery_status === "delivered").length;
  const totalPending = parcels.filter((p) => p.delivery_status !== "delivered").length;
  const totalIncome = payments.reduce((sum, p) => sum + (p.amount || 0), 0);
  const totalRiders = riders.length;
  const totalExpense = totalIncome * 0.3;
  const totalDispatcher = riders.filter((r) => r.status === "active").length;
  const totalDrivers = totalDispatcher;

  const parcelStatusData = [
    { name: "Delivered", value: totalDelivered },
    { name: "Pending", value: totalPending },
  ];

  const incomeTrendData = payments.slice(-7).map((p) => ({
    date: new Date(p.paid_at).toLocaleDateString("en-GB"),
    amount: p.amount,
  }));

  const latestPayments = [...payments]
    .sort((a, b) => new Date(b.paid_at) - new Date(a.paid_at))
    .slice(0, 5);

  return (
    <>
    <Title> Parcel Pilot || Admin Dashboard </Title>
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <FaUserShield className="text-blue-600" /> Welcome, Admin{" "}
          <span className="text-gray-700">{user?.displayName || ""}</span>
        </h1>
        <p className="text-sm text-gray-500 flex items-center gap-1">
          <FaClock /> Last updated: {lastUpdated.toLocaleTimeString()}
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-4 mb-8">
        <SummaryCard icon={<FaUserTie />} title="Total Staffs" value={totalStaffs} color="blue" />
        <SummaryCard icon={<FaUsers />} title="Total User" value={totalSenders} color="green" />
        <SummaryCard icon={<FaBox />} title="Total Orders" value={totalParcels} color="yellow" />
        <SummaryCard icon={<FaCheckCircle />} title="Delivered" value={totalDelivered} color="green" />
        <SummaryCard icon={<FaHourglassHalf />} title="Pending" value={totalPending} color="yellow" />
        <SummaryCard icon={<FaMoneyBillWave />} title="Income (BDT)" value={totalIncome.toFixed(0)} color="blue" />
        <SummaryCard icon={<FaChartLine />} title="Expense (BDT)" value={totalExpense.toFixed(0)} color="purple" />
        <SummaryCard icon={<FaMotorcycle />} title="Riders" value={totalRiders} color="blue" />
        <SummaryCard icon={<FaUserShield />} title="Dispatchers" value={totalDispatcher} color="green" />
        <SummaryCard icon={<FaTruck />} title="Drivers" value={totalDrivers} color="gray" />
      </div>

      {/* Charts Section */}
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        {/* Parcel Status */}
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
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Income Trend */}
        <div className="bg-white rounded-lg p-5 shadow">
          <h2 className="text-lg font-semibold mb-3">Income (Last 7 Payments)</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={incomeTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="amount" fill="#9E9E9E" name="Income" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Latest Payments Table */}
      <div className="bg-white rounded-lg shadow p-5">
        <h2 className="text-lg font-semibold mb-3">Recent Payment Statements</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">User</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Transaction ID</th>
                <th className="px-4 py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {latestPayments.map((p, idx) => (
                <tr key={p._id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{idx + 1}</td>
                  <td className="px-4 py-2">{p.userName}</td>
                  <td className="px-4 py-2 font-semibold text-green-600">{p.amount}</td>
                  <td className="px-4 py-2">{p.transactionId}</td>
                  <td className="px-4 py-2">{new Date(p.paid_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </>
    
  );
};

export default AdminDashboard;
