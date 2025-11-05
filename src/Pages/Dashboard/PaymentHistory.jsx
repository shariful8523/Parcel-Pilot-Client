import React from 'react';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Title } from 'react-head';

const formatDate = (iso) => new Date(iso).toLocaleString();

const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { isLoading, data: payments = [] } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?email=${user.email}`);
            return res.data;
        },
    });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-gray-500 text-lg animate-pulse">Loading payments...</p>
            </div>
        );
    }

    return (
        <>

            <Title> Parcel Pilot || Payment History </Title>
            <div className="p-6 bg-gray-50 min-h-screen">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">
                    💳 Payment History ({payments.length})
                </h2>

                <div className="overflow-x-auto shadow-lg rounded-xl bg-white">
                    <table className="w-full table-auto border-collapse text-sm md:text-base">
                        <thead className="bg-gray-100 text-gray-600 uppercase text-xs md:text-sm">
                            <tr>
                                <th className="px-4 py-3">SR</th>
                                <th className="px-4 py-3">Parcel ID</th>
                                <th className="px-4 py-3">User Name</th>
                                <th className="px-4 py-3">Email</th>
                                <th className="px-4 py-3">Amount</th>
                                <th className="px-4 py-3">Payment Method</th>
                                <th className="px-4 py-3">Transaction ID</th>
                                <th className="px-4 py-3">Date</th>
                            </tr>
                        </thead>

                        <tbody>
                            {payments.map((payment, index) => (
                                <tr
                                    key={payment.transactionId}
                                    className="hover:bg-gray-50 transition-colors"
                                >
                                    <td className="px-4 py-3">{index + 1}</td>
                                    <td className="px-4 py-3 font-mono">{payment.parcelId}</td>
                                    <td className="px-4 py-3">{payment.userName}</td>
                                    <td className="px-4 py-3 truncate max-w-[150px]">{payment.email}</td>
                                    <td className="px-4 py-3 font-semibold text-green-600">৳ {payment.amount}</td>
                                    <td className="px-4 py-3 capitalize">{payment.paymentMethod}</td>
                                    <td className="px-4 py-3 font-mono truncate max-w-[150px]">{payment.transactionId}</td>
                                    <td className="px-4 py-3">{formatDate(payment.createdAt || new Date())}</td>
                                </tr>
                            ))}
                            {payments.length === 0 && (
                                <tr>
                                    <td colSpan={8} className="px-4 py-3 text-center text-gray-500">
                                        No payment records found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>

    );
};

export default PaymentHistory;
