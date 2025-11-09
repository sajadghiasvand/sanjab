export default function ProsComponent() {
    const pros = [
        {
            icon: "/images/pros1.png",
            title: "پنل اختصاصی مدیریت کش بک و اعتبار مشتریان"
        },
        {
            icon: "/images/pros2.png",
            title: "آموزش کامل و پشتیبانی اختصاصی"
        },
        {
            icon: "/images/pros3.png",
            title: "گزارش های روزانه فروش و بازگشت مشتری"
        },
        {
            icon: "/images/pros4.png",
            title: "تعریف طرح های متنوع وفاداری"
        },
        {
            icon: "/images/pros5.png",
            title: "ارسال پیامک خودکار اعتبار پس از خرید"
        },
        {
            icon: "/images/pros6.png",
            title: "امکان اتصال به سیستم‌های حسابداری"
        }
    ];

    return (
        <div className="container max-w-[1150px] mx-auto">
            <section className="relative w-full bg-white p-5 sm:py-16 lg:py-24">
                <div className="max-w-7xl mx-auto ">
                    {/* Top Section - Headings */}
                    <div className="text-center mb-12 lg:mb-16">
                        {/* Top Label */}
                        <div className="flex items-center justify-center gap-3 mb-6">

                            <span className="text-[16px] text-[#313033] font-light normal whitespace-nowrap">
                                مزایای سامانه سنجاب
                            </span>
                            <img src="/images/Line 65.png" alt="Vector" />
                        </div>

                        {/* Main Heading */}
                        <h2 className="text-[25px] sm:!text-[30px] !font-bold !text-[#313033] text-center ">
                            با خرید سنجاب چه امکاناتی بهت میدیم؟
                        </h2>
                    </div>

                    {/* Feature Cards Grid */}
                    <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 sm:overflow-x-auto  pb-4 items-end sm:items-start">
                        {pros.map((pro, index) => (
                            <div
                                key={index}
                                className="relative gap-2 bg-white rounded-2xl flex flex-row-reverse sm:flex-col items-center text-center space-y-4 lg:space-y-5 flex-shrink-0 w-[280px] lg:w-auto lg:flex-1"
                            >
                                {/* Icon with Glow Background */}
                                <div className="relative w-[70px] h-[70px] shrink-0">
                                    {/* Subtle glow effect behind icon */}
                                    <div className="absolute inset-0 bg-light-beige rounded-xl blur-lg opacity-40 -z-10 transform scale-125"></div>
                                    {/* Icon container with light beige background */}
                                    <div className="relative w-full h-full bg-light-beige/60 rounded-xl flex items-center justify-center p-4 shadow-sm">
                                        <img
                                            src={pro.icon}
                                            alt={pro.title}
                                            className="w-[40px] h-[40px] object-contain"
                                        />
                                    </div>
                                </div>

                                {/* Title */}
                                <h3 className="text-[16px] sm:text-[20px] font-bold text-[#313033]  flex items-center justify-center text-right sm:text-center">
                                    {pro.title}
                                </h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
