export default function LearnComponent() {
    const learnCards = [
        {
            image: "/images/Rectangle 40442.png",
            title: "پلتفرم «اثر» برای ایجاد ارتباط مستقیم میان کسب و کارها و اینفلوئنسرها و تسهیل ....",
            description: "رویداد اثر با حضور اینفلوئنسرهای اینستاگرام و فعالان و متخصصان این حوزه برگزار شد در این رویداد با هدف ایجاد ارتباط مستقیم میان کسب و کار و اینفلوئنسرها",
            link: "مشاهده بیشتر"
        },
        {
            image: "/images/Rectangle 40464.png",
            title: "زیپاد امکان در کمپین هر دقیقه یک برنده به کاربران سقف ۵ میلیون تومان جایزه میدهد",
            description: "حساب دیجیتالی کودک و نوجوان بانک پاسارگاد برای تثبیت شعار کمپین پیشین خود با عنوان هر دقیقه یک برنده کمپین جدیدی را برای مخاطبانش طراحی و اجرا کرده است.",
            link: "مشاهده بیشتر"
        },
        {
            image: "/images/Rectangle 40466.png",
            title: "اسنپ مارکت به فروشندگان برتر تا سقف ۱۰ میلیارد تومان تسهیلات میدهد",
            description: "مدیران اسنپ مارکت در گردهمایی اخیر این مجموعه ضمن تقدیر از فروشگاه های برتر از برنامه های خود برای رشد اقتصادی و توسعه بازار آنلاین رونمایی کردند.",
            link: "مشاهده بیشتر"
        }
    ];

    return (
        <section className="relative w-full bg-white mt-16">
            <div className="container max-w-[1150px] mx-auto px-5 lg:px-0">
                {/* Heading Section */}
                <div className="text-center mb-12 lg:mb-16">
                    {/* Top Line */}
                    <div className="flex items-center justify-center gap-3 mb-4">

                        <span className="text-[16px] text-[#313033] font-light normal whitespace-nowrap">
                            آموزشهای مهارت شما
                        </span>
                        <img src="/images/Line 65.png" alt="Vector" />
                    </div>

                    {/* Main Heading */}
                    <h2 className="text-[30px] font-bold text-[#313033] leading-[1.3]">
                        از این مسیر بیشتر بدانید
                    </h2>
                </div>

                {/* Three Content Cards */}
                <div className="flex flex-nowrap lg:grid lg:grid-cols-3 gap-6 lg:gap-8 mb-8 overflow-x-auto lg:overflow-x-visible scrollbar-hide pb-4 lg:pb-0 -mx-5 lg:mx-0 px-5 lg:px-0">
                    {learnCards.map((card, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-[20px] border-[#E4E7F0] border overflow-hidden hover:shadow-xl transition-shadow flex-shrink-0 w-[85vw] sm:w-[400px] lg:w-auto"
                        >
                            {/* Image at Top */}
                            <div className="w-full h-[215px] overflow-hidden p-[10px] rounded-[20px]">
                                <img
                                    src={card.image}
                                    alt={card.title}
                                    className="w-full h-full object-cover rounded-[20px]"
                                />
                            </div>

                            {/* Text Content Below Image */}
                            <div className="p-6 lg:p-8">
                                {/* Title */}
                                <h3 className="text-[18px] font-bold text-[#313033] mb-3 lg:mb-4 leading-[1.5] text-right">
                                    {card.title}
                                </h3>

                                {/* Body Text */}
                                <p className="text-[16px] text-[#313033] font-regular leading-relaxed mb-4 lg:mb-5 text-right" style={{ direction: 'rtl' }}>
                                    {card.description}
                                </p>

                                {/* View More Link */}
                                <a
                                    href="#"
                                    className="flex justify-start items-center gap-1 text-[14px] text-[#FFAD64] transition-colors text-right font-normal mt-2" style={{ direction: 'rtl' }}
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
