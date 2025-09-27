import customer from '../../assets/customer-top.png';

const testimonials = [
    {
        id: 1,
        name: "Donald Jackman",
        role: "SWE 1 @ Amazon",
        image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=100",
        review:
            "I've been using imagify for nearly two years, primarily for Instagram, and it has been incredibly user-friendly, making my work much easier.",
    },
    {
        id: 2,
        name: "Richard Nelson",
        role: "SWE 2 @ Amazon",
        image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100",
        review:
            "Imagify helped me streamline my workflow and save a lot of time. Highly recommended for professionals!",
    },
    {
        id: 3,
        name: "Sophia Lee",
        role: "Designer @ Google",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100",
        review:
            "This tool is a lifesaver! Simple, clean, and makes my design tasks way easier.",
    },
];

const Testimonial = () => {
    return (
        <div className="py-16 px-4 text-center">
            <div className="max-w-6xl mx-auto">
                {/* Top Heading */}
                <div className="mb-6">
                    <img
                        src={customer}
                        alt="customer testimonial"
                        className="mx-auto mb-4"
                    />
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">
                        What our customers are saying
                    </h2>
                    <p className="text-gray-600">
                        Enhance posture, mobility, and well-being effortlessly with Posture Pro.
                        Achieve proper alignment, reduce pain, and strengthen your body with ease!
                    </p>
                </div>

                {/* Cards Section */}
                < >
                    <style>{`
            @keyframes marqueeScroll {
                0% { transform: translateX(0%); }
                100% { transform: translateX(-50%); }
            }

            .marquee-inner {
                animation: marqueeScroll 25s linear infinite;
            }

            .marquee-reverse {
                animation-direction: reverse;
            }
        `}</style>

                </>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
                    {testimonials.map((t) => (
                        <div
                            key={t.id}
                            className="flex flex-col items-start border border-gray-200 p-5 rounded-lg bg-white shadow-sm hover:shadow-md transition"
                        >
                            {/* Quote Icon */}
                            <svg
                                width="44"
                                height="40"
                                viewBox="0 0 44 40"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M33.172 5.469q2.555 0 4.547 1.547a7.4 7.4 0 0 1 2.695 4.007q.47 1.711.469 3.61 0 2.883-1.125 5.86a22.8 22.8 0 0 1-3.094 5.577 33 33 0 0 1-4.57 4.922A35 35 0 0 1 26.539 35l-3.398-3.398q5.296-4.243 7.218-6.563 1.946-2.32 2.016-4.617-2.86-.329-4.781-2.461-1.923-2.133-1.922-4.992 0-3.117 2.18-5.297 2.202-2.203 5.32-2.203m-20.625 0q2.555 0 4.547 1.547a7.4 7.4 0 0 1 2.695 4.007q.47 1.711.469 3.61 0 2.883-1.125 5.86a22.8 22.8 0 0 1-3.094 5.577 33 33 0 0 1-4.57 4.922A35 35 0 0 1 5.914 35l-3.398-3.398q5.296-4.243 7.218-6.563 1.946-2.32 2.016-4.617-2.86-.329-4.781-2.461-1.922-2.133-1.922-4.992 0-3.117 2.18-5.297 2.202-2.203 5.32-2.203"
                                    fill="#2563EB"
                                />
                            </svg>

                            {/* Review */}
                            <p className="text-sm mt-3 text-gray-500">{t.review}</p>

                            {/* User */}
                            <div className="flex items-center gap-3 mt-4">
                                <img
                                    className="h-12 w-12 rounded-full"
                                    src={t.image}
                                    alt={t.name}
                                />
                                <div>
                                    <h2 className="text-lg text-gray-900 font-medium">{t.name}</h2>
                                    <p className="text-sm text-gray-500">{t.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Testimonial;
