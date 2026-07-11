export default function CommentsComponent() {
    const testimonials = [
        {
            image: "/images/Ellipse 94.png",
            quote: "سنجاب باعث شد مشتری‌هایی که فکر می‌کردیم از دست رفتن، دوباره برگردن",
            gradient: "from-gray-100 to-gray-200"
        },
        {
            image: "/images/Ellipse 94.png",
            quote: "با کش‌بک سنجاب، مشتریان دفعات بیشتری به فروشگاه ما برگشتند",
            gradient: "from-orange-100 to-orange-200"
        },
        {
            image: "/images/Ellipse 94.png",
            quote: "اشتراک‌گذاری سنجاب هزینه تبلیغات ما را کم کرد و بازخورد بهتری آورد",
            gradient: "from-gray-300 to-gray-400"
        },
        {
            image: "/images/Ellipse 94.png",
            quote: "گزارش‌ها و تحلیل‌های دقیق، دید خوبی برای افزایش فروش به ما داد",
            gradient: "from-gray-100 to-gray-200"
        }
    ];

    return (
        <section className="relative w-full bg-white py-12 lg:py-20">
            <div className="container max-w-[1150px] mx-auto px-5 lg:px-0">
                <div className="text-center mb-12 lg:mb-16">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <span className="text-[16px] text-[#313033] font-light normal whitespace-nowrap">نظرات مشتریان ما</span>
                        <img src="/images/Line 65.png" alt="Vector" />
                    </div>

                    <h2 className="text-[30px] font-bold text-[#313033] leading-[1.3]">
                        کسب‌وکارها درباره سنجاب چه می‌گویند؟
                    </h2>
                </div>

                <div className="flex flex-nowrap lg:grid lg:grid-cols-4 gap-5 overflow-x-auto lg:overflow-x-visible scrollbar-hide pb-4 lg:pb-0 -mx-5 lg:mx-0 px-5 lg:px-0">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className={`bg-gradient-to-b ${testimonial.gradient} rounded-[2rem] shadow-lg overflow-hidden p-6 lg:p-8 relative h-[350px] flex-shrink-0 w-[70vw] sm:w-[400px] lg:w-auto`}
                        >
                            <img
                                src={testimonial.image}
                                alt="Customer"
                                className="w-full h-full object-cover absolute inset-0"
                            />

                            <div className="absolute bottom-4 left-5 right-5 z-10">
                                <div className="mb-4 lg:mb-6 pr-0 pt-4 flex flex-col items-end gap-2 justify-center">
                                    <img src="/images/Qoute.svg" alt="Quote" />
                                    <p className="text-[18px] text-[#fff] font-medium normal text-right" style={{ direction: 'rtl' }}>
                                        {testimonial.quote}
                                    </p>
                                </div>

                                <div className="flex items-center justify-end gap-3">
                                    <span className="text-[14px] text-[#fff] font-light normal whitespace-nowrap">
                                        مشاهده ویدئو
                                    </span>
                                    <button className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white flex items-center justify-center shadow-md hover:shadow-lg transition-shadow">
                                        <svg
                                            className="w-4 h-4 lg:w-5 lg:h-5 text-black ml-0.5"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
