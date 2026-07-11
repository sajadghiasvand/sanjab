export default function ProsComponent() {
    const pros = [
        {
            icon: "/images/pros1.png",
            title: "ثبت خودکار تراکنش‌ها",
            description: "تمام خریدهای مشتری از طریق پوز ثبت می‌شود بدون نیاز به ورود دستی اطلاعات"
        },
        {
            icon: "/images/pros2.png",
            title: "تحلیل رفتار مشتری",
            description: "مشاهده دقیق تعداد خرید، زمان خرید و الگوی رفتاری مشتری"
        },
        {
            icon: "/images/pros3.png",
            title: "گزارش‌های فروش",
            description: "دسترسی به گزارش‌های کامل از فروش، مشتریان و عملکرد کمپین‌ها"
        },
        {
            icon: "/images/pros4.png",
            title: "کش‌بک هوشمند",
            description: "ایجاد اعتبار خرید برای مشتری که فقط در همان بیزینس قابل استفاده است"
        },
        {
            icon: "/images/pros5.png",
            title: "بازگرداندن مشتری غیرفعال",
            description: "شناسایی مشتری‌هایی که خرید نکرده‌اند و فعال‌سازی مجدد آن‌ها"
        },
        {
            icon: "/images/pros6.png",
            title: "جذب مشتری جدید از شبکه",
            description: "دریافت مشتری از بیزینس‌های مکمل بدون نیاز به تبلیغات"
        },
        {
            icon: "/images/pros1.png",
            title: "پیام و پیشنهاد شخصی‌سازی‌شده",
            description: "ارسال پیشنهاد متناسب با رفتار هر مشتری"
        },
        {
            icon: "/images/pros2.png",
            title: "اتصال مستقیم به پوز",
            description: "بدون تغییر در روند فروش و بدون نیاز به ابزار اضافی"
        }
    ];

    return (
        <div className="container max-w-[1150px] mx-auto">
            <section className="relative w-full bg-white p-5 sm:py-16 lg:py-24">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12 lg:mb-16">
                        <div className="flex items-center justify-center gap-3 mb-6">
                            <span className="text-[16px] text-[#313033] font-light normal whitespace-nowrap">
                                مزایای سامانه سنجاب
                            </span>
                            <img src="/images/Line 65.png" alt="Vector" />
                        </div>

                        <h2 className="text-[25px] sm:!text-[30px] !font-bold !text-[#313033] text-center">
                            با سنجاب چه امکاناتی به دست می‌آورید؟
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                        {pros.map((pro, index) => (
                            <div
                                key={index}
                                className="relative gap-3 bg-white rounded-2xl flex flex-row-reverse sm:flex-col items-center sm:items-center text-center space-y-0 sm:space-y-4"
                            >
                                <div className="relative w-[70px] h-[70px] shrink-0">
                                    <div className="absolute inset-0 bg-light-beige rounded-xl blur-lg opacity-40 -z-10 transform scale-125"></div>
                                    <div className="relative w-full h-full bg-light-beige/60 rounded-xl flex items-center justify-center p-4 shadow-sm">
                                        <img
                                            src={pro.icon}
                                            alt={pro.title}
                                            className="w-[40px] h-[40px] object-contain"
                                        />
                                    </div>
                                </div>

                                <div className="flex-1 text-right sm:text-center" style={{ direction: 'rtl' }}>
                                    <h3 className="text-[16px] sm:text-[18px] font-bold text-[#313033] mb-1">
                                        {pro.title}
                                    </h3>
                                    <p className="text-[13px] sm:text-[14px] text-[#313033]/80 leading-relaxed">
                                        {pro.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
