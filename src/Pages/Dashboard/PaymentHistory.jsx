import React from 'react';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

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
            <p className="text-center mt-10 text-lg font-semibold">
                Loading...
            </p>
        );
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">
                Payment History ({payments.length})
            </h2>

            <div className="overflow-x-auto shadow-lg rounded-lg">
                <table className="table w-full">
                    <thead className="bg-gray-200 text-gray-700">
                        <tr>
                            <th>SR</th>
                            <th>Parcel ID</th>
                            <th>User Name</th>
                            <th>Email</th>
                            <th>Amount</th>
                            <th>Payment Method</th>
                            <th>Transaction ID</th>
                            <th>Date</th>
                        </tr>
                    </thead>

                    <tbody>
                        {payments.map((payment, index) => (
                            <tr key={payment.transactionId} className="hover:bg-gray-50">
                                <td>{index + 1}</td>
                                <td>{payment.parcelId}</td>
                                <td>{payment.userName}</td>
                                <td>{payment.email}</td>
                                <td>৳ {payment.amount}</td>
                                <td>{payment.paymentMethod}</td>
                                <td>{payment.transactionId}</td>
                                <td>{formatDate(payment.createdAt || payment._id?.getTimestamp?.() || new Date())}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;
