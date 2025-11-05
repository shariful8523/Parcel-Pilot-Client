import { useQuery } from "@tanstack/react-query";
import { startOfDay, startOfWeek, startOfMonth, startOfYear, isAfter } from "date-fns";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { FaWallet, FaMoneyBillWave, FaClock } from "react-icons/fa";
import Loading from "../../../components/Loading";
import { Title } from "react-head";

const MyEarnings = () => {
    const axiosSecure = useAxiosSecure();
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

    //  earning calculation fixed
    const calculateEarning = (parcel) => {
        const cost = Number(parcel.deliveryCost);
        return parcel.senderWarehouse === parcel.receiverWarehouse ? cost * 0.8 : cost * 0.3;
    };

    //  date filters
    const now = new Date();
    const todayStart = startOfDay(now);
    const weekStart = startOfWeek(now, { weekStartsOn: 1 });
    const monthStart = startOfMonth(now);
    const yearStart = startOfYear(now);

    let total = 0,
        totalCashedOut = 0,
        totalPending = 0,
        today = 0,
        week = 0,
        month = 0,
        year = 0;

    parcels.forEach((p) => {
        const earning = calculateEarning(p);
        const deliveredAt = new Date(p.delivered_at);

        total += earning;
        if (p.cashout_status === "cashed_out") totalCashedOut += earning;
        else totalPending += earning;

        if (isAfter(deliveredAt, todayStart)) today += earning;
        if (isAfter(deliveredAt, weekStart)) week += earning;
        if (isAfter(deliveredAt, monthStart)) month += earning;
        if (isAfter(deliveredAt, yearStart)) year += earning;
    });

    return (

        <>

            <Title> Parcel Pilot || My Earnings </Title>
            <div className="p-6 space-y-8">
                <h2 className="text-3xl font-bold flex items-center gap-3 text-gray-800">
                    <FaWallet className="text-green-600" /> My Earnings
                </h2>

                {isLoading ? (
                    <Loading />
                ) : (
                    <>
                        {/* === Main Earning Summary === */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-gradient-to-r from-green-100 to-green-50 p-6 rounded-2xl shadow-lg border border-green-200">
                                <p className="text-lg font-semibold text-gray-700">Total Earnings</p>
                                <p className="text-3xl font-bold text-green-700 flex items-center gap-2 mt-2">
                                    <FaMoneyBillWave /> ৳{total.toFixed(2)}
                                </p>
                            </div>

                            <div className="bg-gradient-to-r from-blue-100 to-blue-50 p-6 rounded-2xl shadow-lg border border-blue-200">
                                <p className="text-lg font-semibold text-gray-700">Cashed Out</p>
                                <p className="text-3xl font-bold text-blue-700 flex items-center gap-2 mt-2">
                                    <FaWallet /> ৳{totalCashedOut.toFixed(2)}
                                </p>
                            </div>

                            <div className="bg-gradient-to-r from-yellow-100 to-yellow-50 p-6 rounded-2xl shadow-lg border border-yellow-200">
                                <p className="text-lg font-semibold text-gray-700">Pending</p>
                                <p className="text-3xl font-bold text-yellow-700 flex items-center gap-2 mt-2">
                                    <FaClock /> ৳{totalPending.toFixed(2)}
                                </p>
                            </div>
                        </div>

                        {/* === Time-based Summary === */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
                            <div className="bg-white p-4 rounded-xl shadow-md border-l-4 border-green-500">
                                <p className="text-sm text-gray-500">Today</p>
                                <p className="text-2xl font-bold text-green-600 mt-1">৳{today.toFixed(2)}</p>
                            </div>
                            <div className="bg-white p-4 rounded-xl shadow-md border-l-4 border-green-500">
                                <p className="text-sm text-gray-500">This Week</p>
                                <p className="text-2xl font-bold text-green-600 mt-1">৳{week.toFixed(2)}</p>
                            </div>
                            <div className="bg-white p-4 rounded-xl shadow-md border-l-4 border-green-500">
                                <p className="text-sm text-gray-500">This Month</p>
                                <p className="text-2xl font-bold text-green-600 mt-1">৳{month.toFixed(2)}</p>
                            </div>
                            <div className="bg-white p-4 rounded-xl shadow-md border-l-4 border-green-500">
                                <p className="text-sm text-gray-500">This Year</p>
                                <p className="text-2xl font-bold text-green-600 mt-1">৳{year.toFixed(2)}</p>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>

    );
};

export default MyEarnings;
