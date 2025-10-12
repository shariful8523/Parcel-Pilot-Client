import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useParams } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [processing, setProcessing] = useState(false);
    const { parcelId } = useParams();
    const axiosSecure = useAxiosSecure("");

    //  Fetch parcel info by ID
    const {
        isPending,
        data: parcelInfo = {},
    } = useQuery({
        queryKey: ["parcels", parcelId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/${parcelId}`);
            return res.data;
        },
    });

    if (isPending) {
        return <p className="text-center mt-10 text-lg font-semibold">Loading...</p>;
    }

    const amount = parcelInfo?.deliveryCost || 0;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);
        if (!stripe || !elements) return;

        const card = elements.getElement(CardElement);
        if (!card) return;

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card,
            billing_details: {
                name: e.target.full_name.value,
            },
        });

        if (error) {
            setError(error.message);
            setSuccess("");
        } else {
            setError("");
            setSuccess(" Payment method created successfully!");
            // এখানে backend-এ call করে PaymentIntent তৈরি করতে পারো
            // await axiosSecure.post("/create-payment-intent", { amount });
        }

        setProcessing(false);
    };

    return (
        <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
            <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                <div className="mx-auto max-w-5xl">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl mb-6">
                        Payment for {parcelInfo?.parcelType || "Parcel"}
                    </h2>

                    <div className="lg:flex lg:items-start lg:gap-12">
                        {/* Payment Form */}
                        <form
                            onSubmit={handleSubmit}
                            className="w-full rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6 lg:max-w-xl lg:p-8 space-y-4"
                        >
                            <label className="block text-sm font-medium text-gray-900 dark:text-white">
                                Name on Card*
                            </label>
                            <input
                                type="text"
                                name="full_name"
                                placeholder="John Doe"
                                required
                                className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            />

                            <label className="block text-sm font-medium text-gray-900 dark:text-white">
                                Card Details*
                            </label>
                            <div className="p-4 border border-gray-300 rounded-lg bg-gray-50 dark:border-gray-600 dark:bg-gray-700">
                                <CardElement
                                    options={{
                                        style: {
                                            base: {
                                                fontSize: "16px",
                                                color: "#1f2937",
                                                "::placeholder": { color: "#9ca3af" },
                                            },
                                            invalid: { color: "#e53e3e" },
                                        },
                                    }}
                                />
                            </div>

                            {/*  Amount Display */}
                            <input
                                type="text"
                                value={`৳ ${amount}`}
                                disabled
                                className="w-full rounded-lg border border-gray-300 bg-gray-100 p-2.5 text-sm text-gray-900 cursor-not-allowed dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            />

                            {error && <p className="text-red-500 text-sm">{error}</p>}
                            {success && <p className="text-green-500 text-sm">{success}</p>}

                            <button
                                type="submit"
                                disabled={!stripe || processing}
                                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg transition duration-300"
                            >
                                {processing ? "Processing..." : "Pay Now"}
                            </button>
                        </form>


                    </div>
                </div>
            </div>
        </section>
    );
};

export default PaymentForm;
