import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Send, ArrowRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl"></div>
      </div>

      <div className="relative w-11/12  mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 sm:py-16 md:py-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Company Info */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <img 
                  src="/logo.png" 
                  alt="Parcel Pilot Logo" 
                  className="w-12 h-12 object-contain"
                />
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Parcel Pilot
                </h3>
              </div>
              <p className="text-gray-400 leading-relaxed text-sm">
                Your trusted partner in fast and reliable delivery services. We ensure your parcels reach their destination safely and on time, every time.
              </p>
              <div className="flex gap-3">
                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-10 h-10 bg-slate-800 hover:bg-gradient-to-br hover:from-blue-500 hover:to-cyan-500 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:rotate-6"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-white">Quick Links</h4>
              <ul className="space-y-3">
                {['About Us', 'Our Services', 'Track Parcel', 'Pricing', 'Careers', 'Blog'].map((link, i) => (
                  <li key={i}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 flex items-center gap-2 group text-sm"
                    >
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-white">Support</h4>
              <ul className="space-y-3">
                {['Help Center', 'Terms of Service', 'Privacy Policy', 'FAQs', 'Shipping Info', 'Returns'].map((link, i) => (
                  <li key={i}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 flex items-center gap-2 group text-sm"
                    >
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact & Newsletter */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-white">Get In Touch</h4>
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3 text-gray-400 text-sm">
                  <MapPin className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span>123 Delivery Street, Dhaka 1212, Bangladesh</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400 text-sm">
                  <Phone className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                  <span>+880 1234-567890</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400 text-sm">
                  <Mail className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                  <span>support@parcelpilot.com</span>
                </div>
              </div>

              {/* Newsletter */}
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700">
                <h5 className="text-sm font-semibold mb-3 text-white">Subscribe to Newsletter</h5>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                  <button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 p-2 rounded-lg transition-all duration-300 transform hover:scale-105">
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center sm:text-left">
              © 2026 Parcel Pilot. All rights reserved. 
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                Privacy
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                Terms
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;