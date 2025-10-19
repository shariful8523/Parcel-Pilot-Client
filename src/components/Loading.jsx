import React from "react";
import Lottie from "lottie-react";
import deliveryLoading from "../../public/Fast Delivery.json";

const Loading = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-lime-50">
            {/* Animation */}
            <Lottie
                animationData={deliveryLoading}
                loop={true}
                className="w-32 h-32"
            />

            {/* Text */}
            <div className="text-center mt-4">
                <h2 className="text-2xl font-bold text-gray-700 tracking-wide">
                    Delivering your parcel...
                </h2>
                <p className="text-lime-600 font-medium mt-2 animate-pulse">
                    Please wait a moment 🚀
                </p>
            </div>

            {/* Little line animation */}
            <div className="mt-6 w-40 h-1 bg-lime-400 rounded-full animate-pulse"></div>
        </div>
    );
};

export default Loading;
