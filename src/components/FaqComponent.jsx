import { useState } from 'react';

export default function FaqComponent() {
    const [openIndex, setOpenIndex] = useState(1);
    const [currentTestimonial, setCurrentTestimonial] = useState(0);

    const testimonials = [
        {
            text: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.",
            name: "حسین ابراهیمی",
            title: "مدیر توسعه ایرانسل",
            image: "/images/Ellipse 94.png"
        },
        {
            text: "سامانه سنجاب به ما کمک کرد تا ارتباط بهتری با مشتریان خود برقرار کنیم و رضایت آن‌ها را افزایش دهیم. استفاده از این سیستم بسیار ساده و کارآمد است.",
            name: "علی محمدی",
            title: "مدیر فروش",
            image: "/images/Ellipse 94.png"
        }
    ];

    const faqs = [
        {
            question: "سنجاب به درد چه مشاغلی میخوره؟",
            answer: ""
        },
        {
            question: "چقدر طول میکشه راه اندازی شه؟",
            answer: "باشگاه مشتریان نرم افزاری است که هدف اصلی آن ارتباط با مشتریان افزایش رضایت مشتریان و تبدیل مشتریان عادی به مشتریان وفادار است."
        },
        {
            question: "اگه مشتری گوشی هوشمند نداشته باشه؟",
            answer: ""
        },
        {
            question: "طرح ها رو خودم طراحی میکنم؟",
            answer: ""
        },
        {
            question: "هزینه ارسال پیامک چقدر است؟",
            answer: ""
        }
    ];

    const toggleFaq = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const nextTestimonial = () => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const currentTest = testimonials[currentTestimonial];

    return (
        <section className="relative w-full bg-white p-5 py-12 lg:py-20">
            <div className="container max-w-[1150px] mx-auto">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Section - Testimonials */}
                    <div className="w-full lg:w-1/2 ">
                        <div className='flex flex-row'>
                            {/* Desktop Arrows - Top Left */}
                            <div className="hidden lg:flex items-center gap-3">
                                <button
                                    onClick={prevTestimonial}
                                    className="w-10 h-10 rounded-[10px] bg-white border border-[#92A2C4] flex items-center justify-center hover:bg-light-beige transition-colors shadow-sm"
                                >
                                    <svg
                                        className="w-5 h-5 text-text-dark"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2.5}
                                            d="M15 19l-7-7 7-7"
                                        />
                                    </svg>
                                </button>
                                <button
                                    onClick={nextTestimonial}
                                    className="w-10 h-10 rounded-[10px] bg-white border border-[#92A2C4] flex items-center justify-center hover:bg-light-beige transition-colors shadow-sm"
                                >
                                    <svg
                                        className="w-5 h-5 text-text-dark"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2.5}
                                            d="M9 5l7 7-7 7"
                                        />
                                    </svg>
                                </button>
                            </div>
                            {/* Top Section - Headings */}
                            <div className="mb-8 lg:mb-10 relative text-right w-full">
                                {/* Top Label */}
                                <div className="flex items-center gap-3 mb-4 lg:pl-12 justify-center lg:justify-end">
                                    <span className="text-[16px] text-[#313033] font-light normal whitespace-nowrap">
                                        نظرات کاربران
                                    </span>
                                    <img src="/images/Line 65.png" alt="Line" />
                                </div>

                                {/* Main Heading */}
                                <h2 className="text-[25px] font-bold text-[#313033] leading-[1.3] text-center lg:text-right">
                                    داستانهای موفقیت و تجربیات کاربران
                                </h2>
                            </div>
                        </div>

                        {/* Testimonial Card */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8 relative" style={{ boxShadow: '0px 0px 50px 0px #2A293B0D' }}>
                            {/* Quote Icon - Top Right */}
                            <div className="flex justify-center items-center">
                                <img src="/images/Qoute.svg" alt="Quote" />
                            </div>

                            {/* Testimonial Text */}
                            <div className="pt-4 lg:pt-6 mb-6 lg:mb-8 pr-0">
                                <p className="text-[14px] text-[#313033] font-normal leading-relaxed text-center" style={{ direction: 'rtl' }}>
                                    {currentTest.text}
                                </p>
                            </div>

                            {/* Author Information */}
                            <div className="flex items-center justify-center gap-4">
                                <div className="text-right">
                                    <h4 className="text-[14px] text-[#313033] font-bold mb-1">
                                        {currentTest.name}
                                    </h4>
                                    <p className="text-[14px] text-[#313033] font-normal">
                                        {currentTest.title}
                                    </p>
                                </div>
                                <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-[10px] overflow-hidden flex-shrink-0 border-2 border-decorative-gray/30">
                                    <img
                                        src={currentTest.image}
                                        alt={currentTest.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Mobile Navigation Buttons - Outside Box */}
                        <div className="flex lg:hidden items-center justify-center gap-3 mt-6">
                            <button
                                onClick={prevTestimonial}
                                className="w-10 h-10 rounded-[10px] bg-white border border-[#92A2C4] flex items-center justify-center hover:bg-light-beige transition-colors shadow-sm"
                            >
                                <svg
                                    className="w-5 h-5 text-text-dark"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2.5}
                                        d="M15 19l-7-7 7-7"
                                    />
                                </svg>
                            </button>
                            <button
                                onClick={nextTestimonial}
                                className="w-10 h-10 rounded-[10px] bg-white border border-[#92A2C4] flex items-center justify-center hover:bg-light-beige transition-colors shadow-sm"
                            >
                                <svg
                                    className="w-5 h-5 text-text-dark"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2.5}
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Right Section - FAQ */}
                    <div className="w-full lg:w-1/2">
                        {/* Top Section - Headings */}
                        <div className="mb-8 lg:mb-10 text-center sm:text-right">
                            {/* Top Label */}
                            <div className="flex items-center justify-center sm:justify-end gap-3 mb-4">

                                <span className="text-[16px] text-[#313033] font-light normal whitespace-nowrap">
                                    سوالات پرتکرار
                                </span>
                                <img src="/images/Line 65.png" alt="Line" />
                            </div>

                            {/* Main Heading */}
                            <h2 className="text-[25px] font-bold text-[#313033] leading-[1.3]">
                                بیشتر بخوانید، بیشتر بدانید
                            </h2>
                        </div>

                        {/* FAQ Accordion */}
                        <div className="space-y-0">
                            {faqs.map((faq, index) => (
                                <div key={index} className="border-b border-decorative-gray">
                                    <button
                                        onClick={() => toggleFaq(index)}
                                        className="w-full py-5 lg:py-6 flex items-center justify-between gap-4 hover:opacity-80 transition-opacity text-right"
                                    >
                                        {openIndex === index ? (
                                            <img src="/images/Arrows Button Down.svg" alt="Arrow" />
                                        ) :
                                            <img src="/images/Arrows Button Up.svg" alt="Arrow" />
                                        }
                                        <span className={`text-[15px] text-[#313033] flex-1 font-normal
                                            }`}>
                                            {faq.question}
                                        </span>

                                    </button>

                                    {openIndex === index && faq.answer && (
                                        <div className="pb-5 lg:pb-6">
                                            <p className="text-[15px] text-[#313033] font-normal leading-relaxed pr-0" style={{ direction: 'rtl' }}>
                                                {faq.answer}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
