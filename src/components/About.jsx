import React from "react";
import { FaShippingFast, FaUsers, FaHeadset } from "react-icons/fa";

const About = () => {
  return (
    <section className="bg-gray-50 py-20 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">About Us</h2>
        <p className="text-gray-600 text-lg mb-12">
          We provide fast, reliable, and secure parcel delivery services tailored for your convenience. Our team ensures your parcels reach safely and on time.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition duration-300">
            <FaShippingFast className="text-green-500 text-4xl mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
            <p className="text-gray-600">
              Get your parcels delivered quickly across all regions with our efficient service.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition duration-300">
            <FaUsers className="text-green-500 text-4xl mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">Trusted Team</h3>
            <p className="text-gray-600">
              Our dedicated team of professionals ensures that your parcels are handled with care.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition duration-300">
            <FaHeadset className="text-green-500 text-4xl mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
            <p className="text-gray-600">
              We are always available to answer your queries and assist you with tracking and delivery concerns.
            </p>
          </div>
        </div>

        <div className="mt-12">
          <p className="text-gray-600 text-lg">
            Our mission is to make parcel delivery simple, fast, and reliable for everyone. Experience seamless delivery with our advanced tracking and dedicated customer support.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
