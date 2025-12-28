import React from 'react';
import { Truck, Users, Headphones, Zap, Shield, Clock } from 'lucide-react';

const AboutUs = () => {
  const features = [
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Get your parcels delivered quickly across all regions with our efficient service.",
      color: "from-green-400 to-emerald-500"
    },
    {
      icon: Users,
      title: "Trusted Team",
      description: "Our dedicated team of professionals ensures that your parcels are handled with care.",
      color: "from-blue-400 to-cyan-500"
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "We are always available to answer your queries and assist you with tracking and delivery concerns.",
      color: "from-purple-400 to-pink-500"
    }
  ];

  return (
    <div className=" bg-gradient-to-b from-gray-50 to-white py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="w-10/11 mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            About Us
          </h2>
          <p className="text-gray-600 text-base sm:text-lg md:text-xl max-w-4xl mx-auto leading-relaxed px-4">
            We provide fast, reliable, and secure parcel delivery services tailored for your convenience. Our team ensures your parcels reach safely and on time.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16 md:mb-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-6 sm:p-8 transform hover:-translate-y-1 sm:hover:-translate-y-2 border border-gray-100 hover:border-transparent relative overflow-hidden"
            >
              {/* Gradient background on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
              
              <div className="relative z-10">
                {/* Icon */}
                <div className={`w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 mx-auto mb-4 sm:mb-6 rounded-xl sm:rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                  <feature.icon className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 text-center group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-600 group-hover:bg-clip-text transition-all duration-300">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed text-center">
                  {feature.description}
                </p>
              </div>

              {/* Decorative corner accent */}
              <div className={`absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br ${feature.color} opacity-10 rounded-bl-full transform translate-x-8 sm:translate-x-10 -translate-y-8 sm:-translate-y-10 group-hover:scale-150 transition-transform duration-500`}></div>
            </div>
          ))}
        </div>

        {/* Mission Statement */}
        <div className="relative px-4 sm:px-0">
          <div className="bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 md:p-12 lg:p-16 text-white relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-40 h-40 sm:w-64 sm:h-64 bg-white opacity-5 rounded-full -translate-y-20 sm:-translate-y-32 translate-x-20 sm:translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 sm:w-48 sm:h-48 bg-white opacity-5 rounded-full translate-y-16 sm:translate-y-24 -translate-x-16 sm:-translate-x-24"></div>
            
            <div className="relative z-10 text-center max-w-4xl mx-auto">
              <div className="flex justify-center mb-4 sm:mb-6">
                <div className="flex gap-2 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-sm rounded-lg sm:rounded-xl flex items-center justify-center">
                    <Zap className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-sm rounded-lg sm:rounded-xl flex items-center justify-center">
                    <Shield className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-sm rounded-lg sm:rounded-xl flex items-center justify-center">
                    <Clock className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">
                Our Mission
              </h3>
              <p className="text-base sm:text-lg md:text-xl leading-relaxed text-white/90 px-4">
                Our mission is to make parcel delivery simple, fast, and reliable for everyone. Experience seamless delivery with our advanced tracking and dedicated customer support.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-8 mt-8 sm:mt-10 md:mt-12">
                <div className="text-center">
                  <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-1 sm:mb-2">10K+</p>
                  <p className="text-xs sm:text-sm md:text-base text-white/80">Happy Customers</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-1 sm:mb-2">50K+</p>
                  <p className="text-xs sm:text-sm md:text-base text-white/80">Deliveries Made</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-1 sm:mb-2">99%</p>
                  <p className="text-xs sm:text-sm md:text-base text-white/80">Success Rate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;