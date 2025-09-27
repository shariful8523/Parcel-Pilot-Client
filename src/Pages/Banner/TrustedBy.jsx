import React from "react";
import Casio from "../../assets/brands/casio.png";
import Amazon from "../../assets/brands/amazon_vector.png";
import Moonstar from "../../assets/brands/moonstar.png";
import Star from "../../assets/brands/start.png";
import StartPeople from "../../assets/brands/start-people 1.png";
import Randstad from "../../assets/brands/randstad.png";

import TrackingImg from "../../assets/live-tracking.png";
import SafeImg from "../../assets/safe-delivery.png";
import SupportImg from "../../assets/safe-delivery.png";

const logos = [Casio, Amazon, Moonstar, Star, StartPeople, Randstad];

const features = [
  {
    title: "Live Parcel Tracking",
    description:
      "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
    image: TrackingImg,
  },
  {
    title: "100% Safe Delivery",
    description:
      "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
    image: SafeImg,
  },
  {
    title: "24/7 Call Center Support",
    description:
      "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
    image: SupportImg,
  },
];

const TrustedBy = () => {
  return (
    <section className="w-10/12 mx-auto py-16">
      <div className="w-11/12 mx-auto text-center">
        {/* Logos */}
        <h2 className="text-2xl mb-15 font-semibold text-gray-800">
          We’ve helped thousands of sales teams
        </h2>
        <div className="flex flex-wrap justify-center items-center mb-32 gap-8 mt-6">
          {logos.map((logo, index) => (
            <img
              key={index}
              src={logo}
              alt="brand"
              className="w-52 max-w-[120px] object-contain sm:w-40"
            />
          ))}
        </div>

        <hr className="border-dashed border-t-2 border-gray-300 my-12" />

        {/* Feature Cards */}
        <div className="flex flex-col gap-6 mt-12">
          {features.map((item, index) => (
            <div
              key={index}
              className="w-11/12 mx-auto flex flex-col md:flex-row items-start md:items-center gap-6 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition"
            >
              {/* Left Image */}
              <div className="flex-shrink-0 mx-auto md:mx-0">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-28 h-28 object-contain"
                />
              </div>

              {/* Vertical Divider */}
              <div className="hidden md:block h-28 border-l-2 border-dashed border-gray-300 mx-4"></div>

              {/* Right Content */}
              <div className="text-left flex-1 mt-4 md:mt-0">
                <h3 className="text-lg font-bold text-[#083E4B] mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed break-words">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <hr className="border-dashed border-t-2 border-gray-300 my-12" />
      </div>
    </section>
  );
};

export default TrustedBy;
