import React, { useState } from 'react';
// Using lucide-react for a consistent, modern line-icon style
import { Package, Globe, Warehouse, Banknote, Building,Undo2 } from 'lucide-react';

const services = [
  {
    title: "Express & Standard Delivery",
    description:
      "We deliver parcels within 24–72 hours in key cities. Our express service in Dhaka guarantees delivery within 4–6 hours from pick-up to drop-off.",
    icon: Package,
  },
  {
    title: "Nationwide Delivery",
    description:
      "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
    icon: Globe,
  },
  {
    title: "Fulfillment Solution",
    description:
      "We offer customized service with inventory management support, online order processing, professional packaging, and dedicated after-sales support.",
    icon: Warehouse,
  },
  {
    title: "Cash on Home Delivery",
    description:
      "100% cash on delivery is available anywhere in Bangladesh, with guaranteed safety for your product and secure payment handling.",
    icon: Banknote,
  },
  {
    title: "Corporate & SME Logistics",
    description:
      "Customized corporate services which includes dedicated warehouse space and complete inventory management support for businesses of all sizes.",
    icon: Building,
  },
  {
    title: "Easy Parcel Return",
    description:
      "Our reverse logistics facility allows end-customers to easily return or exchange products with our online business merchants.",
    icon: Undo2,
  },
];

const OurServices = () => {
  // State to track the currently selected service index
  const [selectedService, setSelectedService] = useState(0);

  const ActiveIcon = services[selectedService].icon;

  return (
    <section className="bg-slate-50 py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-base font-semibold text-indigo-600 uppercase tracking-wider">
            What We Offer
          </h2>
          <h1 className="mt-2 text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Our Premier Services
          </h1>
          <p className="text-slate-500 mt-4 max-w-2xl mx-auto text-lg">
            Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. We handle the logistics so you can focus on your business.
          </p>
        </div>

        {/* Interactive Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left: Service Selection List */}
          <div className="lg:col-span-1 bg-white p-3 rounded-xl shadow-sm border border-slate-200 space-y-2">
            {services.map((service, index) => (
              <button
                key={index}
                onClick={() => setSelectedService(index)}
                className={`w-full text-left p-4 rounded-lg transition-colors duration-300 text-lg font-medium flex items-center gap-4
                  ${selectedService === index 
                    ? 'bg-indigo-600 text-white shadow' 
                    : 'text-slate-700 hover:bg-indigo-50'
                  }`}
              >
                <service.icon className="w-6 h-6 flex-shrink-0" />
                <span>{service.title}</span>
              </button>
            ))}
          </div>

          {/* Right: Service Details Display */}
          <div className="lg:col-span-2 bg-white p-8 md:p-12 rounded-xl shadow-sm border border-slate-200 min-h-[24rem] flex flex-col justify-center">
            {/* The 'key' prop is crucial here to force a re-render and trigger animations on change */}
            <div key={selectedService} className="animate-fade-in">
              <div className="flex items-center justify-center w-20 h-20 bg-indigo-100 rounded-2xl mb-6">
                <ActiveIcon className="w-12 h-12 text-indigo-600" strokeWidth={2} />
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-4">
                {services[selectedService].title}
              </h3>
              <p className="text-slate-600 text-lg leading-relaxed">
                {services[selectedService].description}
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default OurServices;

/* Add this to your CSS for the fade-in animation */
/* @keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fadeIn 0.5s ease-in-out;
}
*/
