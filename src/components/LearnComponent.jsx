export default function LearnComponent() {
    const learnCards = [
        {
            image: "/images/Rectangle 40442.png",
            title: "چرا مشتری‌ها برنمی‌گردند و راه حل آن چیست؟",
            description: "دلایل اصلی ترک مشتری بعد از اولین خرید و اینکه چطور با وفادارسازی هوشمند می‌توانید آن‌ها را برگردانید.",
            link: "مشاهده بیشتر"
        },
        {
            image: "/images/Rectangle 40464.png",
            title: "چطور بدون تبلیغات، مشتری جدید جذب کنیم؟",
            description: "با اشتراک‌گذاری هوشمند مشتریان در شبکه سنجاب، بدون هزینه تبلیغات به مخاطب هدفمند دسترسی پیدا کنید.",
            link: "مشاهده بیشتر"
        },
        {
            image: "/images/Rectangle 40466.png",
            title: "نقش وفادارسازی در افزایش فروش کسب‌وکارها",
            description: "چگونه کش‌بک و طرح‌های تشویقی باعث تکرار خرید و رشد پایدار فروش می‌شوند.",
            link: "مشاهده بیشتر"
        }
    ];

    return (
        <section id="learn" className="relative w-full bg-white mt-16 scroll-mt-24">
            <div className="container max-w-[1150px] mx-auto px-5 lg:px-0">
                <div className="text-center mb-12 lg:mb-16">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <span className="text-[16px] text-[#313033] font-light normal whitespace-nowrap">
                            مقالات و آموزش
                        </span>
                        <img src="/images/Line 65.png" alt="Vector" />
                    </div>

                    <h2 className="text-[30px] font-bold text-[#313033] leading-[1.3]">
                        از این مسیر بیشتر با سنجاب آشنا شوید
                    </h2>
                </div>

                <div className="flex flex-nowrap lg:grid lg:grid-cols-3 gap-6 lg:gap-8 mb-8 overflow-x-auto lg:overflow-x-visible scrollbar-hide pb-4 lg:pb-0 -mx-5 lg:mx-0 px-5 lg:px-0">
                    {learnCards.map((card, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-[20px] border-[#E4E7F0] border overflow-hidden hover:shadow-xl transition-shadow flex-shrink-0 w-[85vw] sm:w-[400px] lg:w-auto"
                        >
                            <div className="w-full h-[215px] overflow-hidden p-[10px] rounded-[20px]">
                                <img
                                    src={card.image}
                                    alt={card.title}
                                    className="w-full h-full object-cover rounded-[20px]"
                                />
                            </div>

                            <div className="p-6 lg:p-8">
                                <h3 className="text-[18px] font-bold text-[#313033] mb-3 lg:mb-4 leading-[1.5] text-right">
                                    {card.title}
                                </h3>

                                <p className="text-[16px] text-[#313033] font-regular leading-relaxed mb-4 lg:mb-5 text-right" style={{ direction: 'rtl' }}>
                                    {card.description}
                                </p>

                                <a
                                    href="#"
                                    className="flex justify-start items-center gap-1 text-[14px] text-[#FFAD64] transition-colors text-right font-normal mt-2"
                                    style={{ direction: 'rtl' }}
                                >
                                    {card.link}
                                    <span className="text-[#FFAD64] text-[14px] font-normal">)</span>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
