import React from 'react';
import { ClipboardCheck, QrCode, Truck, Building2, Sparkles } from 'lucide-react';

const HowItWorks = () => {
    const steps = [
        {
            id: '01',
            icon: ClipboardCheck,
            title: 'Booking Pick & Drop',
            description: "Schedule your pickup with just a few clicks. We'll handle the rest.",
            gradient: 'from-blue-500 to-blue-600',
            bgGlow: 'bg-blue-500/20',
            iconBg: 'bg-blue-50'
        },
        {
            id: '02',
            icon: QrCode,
            title: 'Cash On Delivery',
            description: 'Offer your customers flexibility with COD payment options.',
            gradient: 'from-purple-500 to-purple-600',
            bgGlow: 'bg-purple-500/20',
            iconBg: 'bg-purple-50'
        },
        {
            id: '03',
            icon: Truck,
            title: 'Delivery Hub',
            description: 'Our advanced hub network ensures fast and efficient routing.',
            gradient: 'from-indigo-500 to-indigo-600',
            bgGlow: 'bg-indigo-500/20',
            iconBg: 'bg-indigo-50'
        },
        {
            id: '04',
            icon: Building2,
            title: 'SME & Corporate',
            description: 'Tailored solutions for businesses of all sizes.',
            gradient: 'from-cyan-500 to-cyan-600',
            bgGlow: 'bg-cyan-500/20',
            iconBg: 'bg-cyan-50'
        }
    ];

    return (
        <div className=" bg-[#f3f8fe] py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl animate-pulse delay-500"></div>
            </div>

            <div className="w-10/12 mx-auto relative z-10">
                {/* Header with Animation */}
                <div className="text-center mb-16 sm:mb-20">
                    <div className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full text-sm font-medium tracking-wider mb-6 shadow-lg border border-blue-100">
                        <Sparkles className="w-4 h-4 text-blue-500 animate-pulse" />
                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            OUR PROCESS
                        </span>
                    </div>
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4">
                        <span className="text-gray-900">
                            How It 
                        </span>
                        <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-gradient">
                            {' '}Works
                        </span>
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Experience seamless delivery with our innovative four-step process
                    </p>
                </div>

                {/* Steps Grid with Enhanced Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 relative">
                    {/* Animated Connecting Path */}
                    <div className="hidden lg:block absolute top-12 left-0 right-0 h-1 overflow-hidden" 
                         style={{ width: 'calc(100% - 8rem)', marginLeft: '4rem' }}>
                        <div className="h-full bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 opacity-30 animate-pulse rounded-full"></div>
                    </div>
                    
                    {steps.map((step, index) => (
                        <div key={step.id} className="relative group">
                            {/* Glowing Background Effect */}
                            <div className={`absolute inset-0 ${step.bgGlow} rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform group-hover:scale-110`}></div>
                            
                            {/* Step Number Badge with Glow */}
                            <div className="absolute -top-4 left-6 z-20">
                                <div className={`w-14 h-14 bg-gradient-to-br ${step.gradient} rounded-2xl flex items-center justify-center shadow-2xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 relative`}>
                                    <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} rounded-2xl blur-lg opacity-50 group-hover:opacity-100 transition-opacity`}></div>
                                    <span className="text-white font-bold text-lg relative z-10">{step.id}</span>
                                </div>
                            </div>

                            {/* Card with Glass Effect */}
                            <div className="relative bg-white rounded-3xl p-8 pt-14 border border-gray-100 hover:border-blue-200 transition-all duration-500 h-full group-hover:transform group-hover:-translate-y-2 shadow-xl hover:shadow-2xl overflow-hidden">
                                {/* Shimmer Effect */}
                                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-blue-100/50 to-transparent"></div>
                                
                                {/* Icon Container with Animation */}
                                <div className={`w-20 h-20 ${step.iconBg} rounded-3xl flex items-center justify-center mb-6 transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 relative shadow-lg`}>
                                    <step.icon className={`w-10 h-10 bg-gradient-to-br ${step.gradient} bg-clip-text text-transparent relative z-10`} strokeWidth={2} style={{stroke: `url(#${step.id}-gradient)`}} />
                                    <svg width="0" height="0">
                                        <defs>
                                            <linearGradient id={`${step.id}-gradient`} x1="0%" y1="0%" x2="100%" y2="100%">
                                                <stop offset="0%" stopColor={index === 0 ? '#3b82f6' : index === 1 ? '#a855f7' : index === 2 ? '#6366f1' : '#06b6d4'} />
                                                <stop offset="100%" stopColor={index === 0 ? '#2563eb' : index === 1 ? '#9333ea' : index === 2 ? '#4f46e5' : '#0891b2'} />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                </div>

                                {/* Content */}
                                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                                    {step.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                                    {step.description}
                                </p>

                                {/* Bottom Accent Line */}
                                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${step.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-3xl`}></div>
                            </div>

                            {/* Floating Particles Effect */}
                            <div className="absolute -z-10 inset-0">
                                <div className={`absolute top-1/4 right-1/4 w-3 h-3 bg-gradient-to-r ${step.gradient} rounded-full opacity-0 group-hover:opacity-60 group-hover:animate-ping`}></div>
                                <div className={`absolute bottom-1/4 left-1/4 w-3 h-3 bg-gradient-to-r ${step.gradient} rounded-full opacity-0 group-hover:opacity-60 group-hover:animate-ping delay-100`}></div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Call to Action */}
                {/* <div className="text-center mt-16">
                    <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 rounded-full text-white font-bold text-lg shadow-2xl hover:shadow-blue-500/50 transform hover:scale-105 transition-all duration-300 overflow-hidden">
                        <span className="relative z-10">Get Started Today</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                </div> */}
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
                .delay-100 { animation-delay: 100ms; }
                .delay-500 { animation-delay: 500ms; }
                .delay-1000 { animation-delay: 1000ms; }
            `}</style>
        </div>
    );
};

export default HowItWorks;