import React from 'react';
import { CheckCircle, Clock, MapPin, Shield, Headphones, ArrowRight } from 'lucide-react';

const Merchant = () => {
    const features = [
        {
            icon: Clock,
            text: '100% On-time Delivery'
        },
        {
            icon: MapPin,
            text: 'Real-time Tracking'
        },
        {
            icon: Shield,
            text: 'Secure Handling'
        },
        {
            icon: Headphones,
            text: '24/7 Support'
        }
    ];

    return (
        <div className=" bg-gradient-to-br from-blue-50 via-purple-50 to-blue-50 py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center relative overflow-hidden">
            {/* Animated Background Blobs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            <div className="max-w-6xl w-full relative z-10">
                {/* Main Card */}
                <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12 lg:p-16 border border-blue-100 relative overflow-hidden group hover:shadow-3xl transition-all duration-500">
                    {/* Shimmer Effect */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-blue-100/30 to-transparent"></div>
                    
                    {/* Decorative Glow */}
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-full blur-3xl"></div>

                    {/* Content */}
                    <div className="relative z-10">
                        {/* Heading */}
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center mb-6 leading-tight">
                            <span className="text-gray-900">Merchant and Customer</span>
                            <br />
                            <span className="text-gray-900">Satisfaction is Our </span>
                            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-gradient">
                                First Priority
                            </span>
                        </h2>

                        {/* Subtitle */}
                        <p className="text-gray-600 text-base sm:text-lg text-center max-w-3xl mx-auto mb-10">
                            We offer the fastest delivery packages with 100% reliability. Trust the experts for seamless delivery experience.
                        </p>

                        {/* Features Grid */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">
                            {features.map((feature, index) => (
                                <div 
                                    key={index}
                                    className="flex items-center gap-2 sm:gap-3 justify-center group/item"
                                >
                                    <div className="relative">
                                        <CheckCircle 
                                            className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500 group-hover/item:scale-110 transition-transform duration-300" 
                                            strokeWidth={2}
                                        />
                                        <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-md opacity-0 group-hover/item:opacity-100 transition-opacity"></div>
                                    </div>
                                    <span className="text-gray-700 text-sm sm:text-base font-medium group-hover/item:text-blue-600 transition-colors duration-300">
                                        {feature.text}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                            {/* Primary Button */}
                            <button className="group/btn relative px-8 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 rounded-full text-white font-bold text-base sm:text-lg shadow-2xl hover:shadow-blue-500/50 transform hover:scale-105 transition-all duration-300 overflow-hidden w-full sm:w-auto">
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    Become a Merchant
                                    <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-500 to-blue-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                            </button>

                            {/* Secondary Button */}
                            <button className="group/btn2 relative px-8 py-4 bg-white rounded-full text-gray-900 font-bold text-base sm:text-lg shadow-lg hover:shadow-xl border-2 border-gray-200 hover:border-blue-300 transform hover:scale-105 transition-all duration-300 w-full sm:w-auto">
                                <span className="relative z-10 group-hover/btn2:text-blue-600 transition-colors duration-300">
                                    Meet With Product Owner
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes gradient {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
                .animate-gradient {
                    background-size: 200% 200%;
                    animation: gradient 3s ease infinite;
                }
                .delay-1000 { animation-delay: 1000ms; }
            `}</style>
        </div>
    );
};

export default Merchant;