import React from "react";
import { FaShippingFast, FaGlobeAsia, FaWarehouse } from "react-icons/fa";
import { MdOutlineInventory2, MdOutlinePayments, MdOutlineAssignmentReturn } from "react-icons/md";

const services = [
  {
    title: "Express & Standard Delivery",
    description:
      "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
    icon: <FaShippingFast className="w-12 h-12 text-[#083E4B]" />,
  },
  {
    title: "Nationwide Delivery",
    description:
      "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
    icon: <FaGlobeAsia className="w-12 h-12 text-[#083E4B]" />,
  },
  {
    title: "Fulfillment Solution",
    description:
      "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
    icon: <MdOutlineInventory2 className="w-12 h-12 text-[#083E4B]" />,
  },
  {
    title: "Cash on Home Delivery",
    description:
      "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
    icon: <MdOutlinePayments className="w-12 h-12 text-[#083E4B]" />,
  },
  {
    title: "Corporate Service / Contract In Logistics",
    description:
      "Customized corporate services which includes warehouse and inventory management support.",
    icon: <FaWarehouse className="w-12 h-12 text-[#083E4B]" />,
  },
  {
    title: "Parcel Return",
    description:
      "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
    icon: <MdOutlineAssignmentReturn className="w-12 h-12 text-[#083E4B]" />,
  },
];

const OurServices = () => {
  return (
    <section className=" w-11/12 mx-auto  bg-[#083E4B]  py-16 px-6 md:px-12 rounded-3xl ">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Our Services
        </h2>
        <p className="text-gray-200 mt-3 max-w-2xl mx-auto">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>

        {/* Service Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="p-6 rounded-xl shadow-md bg-white hover:shadow-lg hover:scale-105 transition duration-300"
            >
              <div className="flex justify-center mb-4">{service.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900">
                {service.title}
              </h3>
              <p className="text-gray-600 mt-2 text-sm">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurServices;
