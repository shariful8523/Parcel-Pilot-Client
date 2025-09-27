import React from 'react';
import { IoMdArrowForward } from "react-icons/io";



const FAQSection = () => {
    const [openIndex, setOpenIndex] = React.useState(null);

    const faqsData = [
        {
            question: 'How does this posture corrector work?',
            answer:
                'A posture corrector works by gently aligning your shoulders, back, and spine. It provides support that encourages you to sit and stand in a natural, upright position. Over time, this helps train your muscles and improves your posture even without wearing the device.',
        },
        {
            question: 'Is it suitable for all ages and body types?',
            answer:
                'Yes, the posture corrector is designed to be adjustable and flexible, making it suitable for different ages, heights, and body types. However, children under 12 or people with specific medical conditions should consult a doctor before use.',
        },
        {
            question: 'Does it really help with back pain and posture improvement?',
            answer:
                'Absolutely! Consistent use of a posture corrector can relieve muscle strain, reduce back and neck pain, and improve posture. It works best when combined with stretching exercises and a healthy sitting or standing routine.',
        },
        {
            question: 'Does it have smart features like vibration alerts?',
            answer:
                'Yes, some models come with smart vibration alerts that gently remind you whenever you slouch. This makes it easier to stay aware of your posture throughout the day without constantly thinking about it.',
        },
        {
            question: 'How will I be notified when the product is back in stock?',
            answer:
                'You can sign up with your email on our product page. Once the posture corrector is back in stock, you’ll receive an instant notification in your inbox. We also provide optional SMS alerts for quicker updates.',
        },
    ];

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        * {
          font-family: 'Poppins', sans-serif;
        }
      `}</style>

            <div className="flex flex-col items-center text-center text-slate-800 px-3">
                <h1 className="text-3xl md:text-4xl font-semibold mt-2">
                    Frequently Asked Questions
                </h1>
                <p className="text-sm text-slate-500 mt-4 max-w-4xl">
                    Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!
                </p>

                <div className="max-w-xl w-full mt-6 flex flex-col gap-4 items-start text-left">
                    {faqsData.map((faq, index) => (
                        <div key={index} className="flex flex-col items-start w-full">
                            <div
                                className="flex items-center justify-between w-full cursor-pointer bg-gradient-to-r from-indigo-50 to-white border border-indigo-100 p-4 rounded"
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            >
                                <h2 className="text-sm font-medium">{faq.question}</h2>
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 18 18"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={`${openIndex === index ? 'rotate-180' : ''
                                        } transition-all duration-500 ease-in-out`}
                                >
                                    <path
                                        d="m4.5 7.2 3.793 3.793a1 1 0 0 0 1.414 0L13.5 7.2"
                                        stroke="#1D293D"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                            <p
                                className={`text-sm text-slate-500 px-4 transition-all duration-500 ease-in-out ${openIndex === index
                                    ? 'opacity-100 max-h-[300px] translate-y-0 pt-4'
                                    : 'opacity-0 max-h-0 -translate-y-2'
                                    }`}
                            >
                                {faq.answer}
                            </p>
                        </div>
                    ))}
                </div>
                <div className="mt-10 flex flex-row w-2xs gap-2 md:gap-3 items-center justify-center px-4">
                    {/* FAQ Button */}
                    <button className="bg-[#CAEB66] flex-1 h-14 rounded-xl text-black font-medium">
                        See More FAQ’s
                    </button>

                    {/* Arrow Button */}
                    <button className="bg-black -rotate-45 text-lime-300 w-12 h-12 rounded-full flex items-center justify-center">
                        <IoMdArrowForward size={28} />
                    </button>
                </div>




            </div>
        </>
    );
};

export default FAQSection;
