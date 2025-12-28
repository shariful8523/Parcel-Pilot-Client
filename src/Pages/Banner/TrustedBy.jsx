import React from 'react';
import { Package, Shield, Headphones } from 'lucide-react';

const ServiceFeatures = () => {
  const features = [
    {
      icon: Package,
      title: "Live Parcel Tracking",
      description: "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Shield,
      title: "100% Safe Delivery",
      description: "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
      gradient: "from-emerald-500 to-teal-500"
    },
    {
      icon: Headphones,
      title: "24/7 Call Center Support",
      description: "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
      gradient: "from-purple-500 to-pink-500"
    }
  ];

  return (
    <div className=" bg-gradient-to-br from-gray-50 to-gray-100 py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8">
      <div className="w-10/12 mx-auto">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-3 sm:mb-4 px-4">
            Why Choose Our Service
          </h2>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4">
            Experience seamless delivery with our comprehensive features designed for your convenience
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1 sm:hover:-translate-y-2"
            >
              <div className={`h-1.5 sm:h-2 bg-gradient-to-r ${feature.gradient}`}></div>
              
              <div className="p-6 sm:p-8">
                <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg sm:rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">
                  {feature.title}
                </h3>

                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  {feature.description}
                </p>
              </div>

              <div className={`h-0.5 sm:h-1 bg-gradient-to-r ${feature.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}></div>
            </div>
          ))}
        </div>

        <div className="mt-12 sm:mt-16 text-center px-4">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-6 md:gap-8 bg-white rounded-2xl sm:rounded-full px-6 sm:px-8 py-6 sm:py-4 shadow-md w-full sm:w-auto max-w-lg sm:max-w-none">
            <div className="text-center min-w-[80px]">
              <p className="text-2xl sm:text-3xl font-bold text-gray-800">50K+</p>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">Deliveries</p>
            </div>
            <div className="w-full sm:w-px h-px sm:h-12 bg-gray-300"></div>
            <div className="text-center min-w-[80px]">
              <p className="text-2xl sm:text-3xl font-bold text-gray-800">98%</p>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">On-Time</p>
            </div>
            <div className="w-full sm:w-px h-px sm:h-12 bg-gray-300"></div>
            <div className="text-center min-w-[80px]">
              <p className="text-2xl sm:text-3xl font-bold text-gray-800">24/7</p>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">Support</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceFeatures;