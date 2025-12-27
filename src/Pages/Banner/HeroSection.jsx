import React from 'react';
import { Package, MapPin, CheckCircle, TrendingUp, Clock, Truck } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className=" bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 md:w-96 md:h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 md:w-96 md:h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div>
      
      <div className="w-10/12 mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 relative">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 sm:px-5 py-2 sm:py-2.5 shadow-sm border border-slate-200">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-xs sm:text-sm font-medium text-slate-700">Real-time Tracking Available</span>
            </div>

            {/* Main Heading */}
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-3 sm:mb-4">
                Advanced
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Tracking</span>
                <br />
                System
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Real-time updates. Total peace of mind. Experience next-generation parcel tracking with 3D visualization.
              </p>
            </div>

            {/* CTA Buttons */}
           <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <a href="/dashboard/track" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 text-sm sm:text-base">
                Track Your Parcel
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <button className="bg-white hover:bg-slate-50 text-slate-700 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold border border-slate-200 hover:border-slate-300 transition-all duration-200 text-sm sm:text-base">
                Learn More
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 lg:gap-8 pt-6 sm:pt-8">
              <div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-1">99.9%</div>
                <div className="text-xs sm:text-sm text-slate-600 font-medium">Delivery Rate</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-1">50K+</div>
                <div className="text-xs sm:text-sm text-slate-600 font-medium">Daily Parcels</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-1">24/7</div>
                <div className="text-xs sm:text-sm text-slate-600 font-medium">Support</div>
              </div>
            </div>
          </div>

          {/* Right Content - Tracking Cards (Responsive) */}
          <div className="relative h-[500px] sm:h-[550px] lg:h-[600px] mt-8 lg:mt-0">
            {/* Delivered Card - Top Left */}
            <div className="absolute top-0 left-0 sm:left-4 lg:left-0 bg-white rounded-xl sm:rounded-2xl shadow-lg p-3 sm:p-4 flex items-center gap-2 sm:gap-3 z-30 animate-float scale-90 sm:scale-100" style={{animationDelay: '0s'}}>
              <div className="bg-green-100 rounded-lg sm:rounded-xl p-2 sm:p-2.5">
                <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
              </div>
              <div>
                <div className="font-semibold text-slate-900 text-xs sm:text-sm">Delivered</div>
                <div className="text-[10px] sm:text-xs text-slate-500">12 packages today</div>
              </div>
            </div>

            {/* Truck Icon - Top Right */}
            <div className="absolute top-8 sm:top-10 right-0 sm:right-4 lg:right-0 bg-white rounded-full p-3 sm:p-4 shadow-lg z-20 animate-bounce-slow scale-90 sm:scale-100">
              <Truck className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" />
            </div>

            {/* Main Tracking Card - Center */}
            <div className="absolute top-24 sm:top-28 lg:top-32 left-1/2 transform -translate-x-1/2 bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 w-[280px] sm:w-[320px] lg:w-80 z-20">
              {/* Header */}
              <div className="flex items-center justify-between mb-6 sm:mb-8">
                <span className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider">Tracking</span>
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-green-500 rounded-full"></div>
              </div>

              {/* Package Icon with subtle line */}
              <div className="relative mb-6 sm:mb-8">
                <svg className="absolute top-0 left-4 sm:left-8 w-32 sm:w-40 h-16 sm:h-20" viewBox="0 0 160 80">
                  <path d="M 0 40 Q 80 0, 160 40" stroke="#e2e8f0" strokeWidth="2" fill="none" strokeDasharray="5,5" />
                </svg>
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex items-center justify-center relative z-10 mx-auto w-24 h-24 sm:w-32 sm:h-32">
                  <Package className="w-10 h-10 sm:w-14 sm:h-14 text-white" strokeWidth={2} />
                </div>
              </div>

              {/* Tracking Number */}
              <div className="text-center mb-6 sm:mb-8">
                <div className="text-lg sm:text-xl font-bold text-slate-900 mb-1 sm:mb-2">PKG-2024-7842</div>
                <div className="text-slate-500 font-medium text-xs sm:text-sm">In Transit</div>
              </div>

              {/* Status Items */}
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center gap-2 sm:gap-3">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                  <span className="text-xs sm:text-sm text-slate-700">Picked up from origin</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="bg-blue-100 rounded p-1">
                    <Truck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-600" />
                  </div>
                  <span className="text-xs sm:text-sm text-slate-700">On the way to hub</span>
                </div>
              </div>
            </div>

            {/* New York Hub Card - Bottom Right */}
            <div className="absolute bottom-4 sm:bottom-8 right-0 sm:right-4 lg:right-0 bg-white rounded-xl sm:rounded-2xl shadow-lg p-3 sm:p-4 flex items-center gap-2 sm:gap-3 z-30 animate-float scale-90 sm:scale-100" style={{animationDelay: '1s'}}>
              <div className="bg-blue-100 rounded-lg sm:rounded-xl p-2 sm:p-2.5">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
              </div>
              <div>
                <div className="font-semibold text-slate-900 text-xs sm:text-sm">New York Hub</div>
                <div className="text-[10px] sm:text-xs text-slate-500">Processing...</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-12px);
          }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 2.5s ease-in-out infinite;
        }
        
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @media (max-width: 640px) {
          .animate-float {
            animation: float-mobile 3s ease-in-out infinite;
          }
          
          @keyframes float-mobile {
            0%, 100% {
              transform: translateY(0px) scale(0.9);
            }
            50% {
              transform: translateY(-8px) scale(0.9);
            }
          }
        }
      `}</style>
    </div>
  );
};

export default HeroSection;