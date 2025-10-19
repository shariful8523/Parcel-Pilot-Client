import React from 'react';
// Replaced react-icons with lucide-react for a more modern, clean look
import { ClipboardList, Banknote, Home, Building2 } from 'lucide-react';

// --- Data ---
// The data remains the same, but we will render the new icons.
const workSteps = [
  {
    icon: ClipboardList,
    title: "Booking Pick & Drop",
    description:
      "From personal packages to business shipments — we deliver on time, every time.",
  },
  {
    icon: Banknote,
    title: "Cash On Delivery",
    description:
      "Offer your customers the flexibility to pay upon receipt, ensuring trust and convenience.",
  },
  {
    icon: Home,
    title: "Delivery Hub",
    description:
      "Our strategically located hubs ensure your packages are processed and sorted efficiently.",
  },
  {
    icon: Building2,
    title: "Booking SME & Corporate",
    description:
      "Tailored logistics solutions for businesses of all sizes, from small enterprises to large corporations.",
  },
];

// --- The Component ---
const Worksection = () => {
  return (
    <section className="bg-gray-50 font-sans py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-24">
          <h2 className="text-base font-semibold text-indigo-600 uppercase tracking-wider">
            Our Process
          </h2>
          <h1 className="mt-2 text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            How It Works
          </h1>
        </div>

        {/* Steps Container */}
        <div className="relative">
          {/* Decorative connecting line - hidden on smaller screens */}
          <div
            className="hidden md:block absolute top-12 left-1/2 -ml-0.5 w-0.5 h-[calc(100%-6rem)] bg-indigo-200"
            aria-hidden="true"
          />

          <div className="space-y-16 lg:space-y-24">
            {workSteps.map((step, idx) => {
              const isEven = idx % 2 === 0;
              const IconComponent = step.icon;

              return (
                <div
                  key={step.title}
                  className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center"
                >
                  {/* Icon Column */}
                  <div
                    className={`flex justify-center ${
                      isEven ? "md:order-1" : "md:order-2"
                    }`}
                  >
                    <div className="relative bg-white p-8 lg:p-10 rounded-3xl shadow-lg border border-gray-100 w-64 h-64 flex items-center justify-center">
                       {/* Step Number Badge */}
                       <div className="absolute -top-5 -left-5 w-16 h-16 bg-indigo-600 text-white text-2xl font-bold rounded-full flex items-center justify-center shadow-md border-4 border-gray-50">
                        {idx + 1}
                      </div>
                      <IconComponent className="w-24 h-24 text-indigo-500" strokeWidth={1.5} />
                    </div>
                  </div>

                  {/* Text Column */}
                  <div
                    className={`text-center md:text-left ${
                      isEven ? "md:order-2" : "md:order-1"
                    }`}
                  >
                    <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Worksection;
