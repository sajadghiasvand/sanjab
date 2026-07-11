import { useState } from 'react';

export default function FaqComponent() {
    const [openIndex, setOpenIndex] = useState(0);
    const [currentTestimonial, setCurrentTestimonial] = useState(0);

    const testimonials = [
        {
            text: "یکی از نکات مثبت سنجاب برای مجموعه ما این بود که توانستیم ارتباط با مراجعین‌مان را به شکل بهتر و مؤثرتری حفظ کنیم و این ارتباط را به‌صورت سیستمی و منظم مدیریت کنیم. این موضوع در نهایت باعث افزایش رضایت مراجعین ما شد.",
            name: "کلینیک زیبایی فامیلی",
            title: "کلینیک زیبایی",
            image: "/images/Ellipse 94.png"
        },
        {
            text: "پشتیبانی منظم ماهانه و ارائه گزارش‌ها و تحلیل‌های دقیق، دید بسیار خوبی برای بهبود عملکرد و افزایش فروش به ما داد. این موضوع باعث افزایش نرخ بازگشت مشتری شد و در نهایت، رشد فروش ما را حتی در شرایط سخت و پیش‌بینی‌نشده امسال حفظ کرد.",
            name: "سالن زیبایی سارا موسی‌خوانی",
            title: "سالن زیبایی",
            image: "/images/Ellipse 94.png"
        },
        {
            text: "در حوزه پوشاک کودک، تکرار خرید مشتری اهمیت بسیار بالایی دارد. با استفاده از سیستم کش‌بک سنجاب، توانستیم این فرآیند را به‌خوبی مدیریت کنیم و باعث شویم مشتریان دفعات بیشتری به فروشگاه بازگردند. همچنین این موضوع به ایجاد تمایز ما نسبت به سایر فروشگاه‌ها کمک کرد.",
            name: "سیسمونی خانم گل",
            title: "آقای صادقی",
            image: "/images/Ellipse 94.png"
        },
        {
            text: "برای اطلاع‌رسانی خدمات عروس، به مخاطب هدفمند نیاز داشتیم اما تبلیغات عمومی برای ما هم پرهزینه بود و هم بازدهی مناسبی نداشت. با استفاده از قابلیت اشتراک‌گذاری سنجاب، توانستیم به‌صورت مستقیم به مخاطبان هدف در مزون‌ها و مجموعه‌های مرتبط دسترسی پیدا کنیم که هم هزینه‌ها را کاهش داد و هم بازخورد بسیار بهتری برای ما به همراه داشت.",
            name: "سالن مهناز اسرافیلی",
            title: "مدیر سالن",
            image: "/images/Ellipse 94.png"
        }
    ];

    const faqs = [
        {
            question: "سنجاب به درد چه مشاغلی می‌خوره؟",
            answer: "سنجاب برای تمام بیزینس‌هایی که با مشتری نهایی در ارتباط هستند مناسب است؛ از جمله فروشگاه‌ها، رستوران‌ها، کافه‌ها، کلینیک‌ها، سالن‌های زیبایی، خدماتی‌ها و … اگر مشتری دارید و می‌خواهید دوباره به شما برگردد، سنجاب برای شماست."
        },
        {
            question: "چقدر طول می‌کشه راه‌اندازی شه؟",
            answer: "راه‌اندازی سنجاب بسیار سریع است. بعد از ثبت‌نام و اتصال پوز، معمولاً در کمتر از سه روز کاری می‌توانید از امکانات سیستم استفاده کنید. نیاز به تغییر در روند فروش یا آموزش پیچیده ندارد."
        },
        {
            question: "اگه مشتری گوشی هوشمند نداشته باشه چی؟",
            answer: "هیچ مشکلی نیست. سنجاب بر اساس تراکنش پوز کار می‌کند و برای ثبت خرید مشتری نیازی به گوشی هوشمند نیست. در صورت نیاز، اطلاع‌رسانی‌ها از طریق پیامک انجام می‌شود."
        },
        {
            question: "طرح‌ها رو خودم طراحی می‌کنم؟",
            answer: "بله. شما می‌توانید طرح‌های دلخواه خود را تعریف کنید؛ مثل کش‌بک، پیشنهاد خرید مجدد، طرح بازگشت مشتری و … در عین حال، سنجاب پیشنهادهای آماده و هوشمند هم در اختیارتان قرار می‌دهد تا بدون پیچیدگی، بهترین نتیجه را بگیرید."
        },
        {
            question: "هزینه ارسال پیامک چقدر است؟",
            answer: "هزینه پیامک به‌صورت مصرفی محاسبه می‌شود. هزینه هر پیامک ۲۰۰ تومان می‌باشد و شما فقط به اندازه پیام‌هایی که ارسال می‌کنید هزینه پرداخت می‌کنید و هیچ هزینه اضافی یا اجباری وجود ندارد. همچنین امکان مدیریت و کنترل کامل ارسال پیام‌ها در اختیار شماست."
        },
        {
            question: "آیا سنجاب باعث کاهش سود من نمی‌شود؟",
            answer: "خیر. سنجاب به‌جای تخفیف‌های سنگین، از مدل کش‌بک استفاده می‌کند که باعث می‌شود مشتری دوباره به شما برگردد. در نتیجه هم فروش افزایش پیدا می‌کند و هم سود شما حفظ می‌شود."
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
        <section id="faq" className="relative w-full bg-white p-5 py-12 lg:py-20 scroll-mt-24">
            <div className="container max-w-[1150px] mx-auto">
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="w-full lg:w-1/2">
                        <div className="flex flex-row">
                            <div className="hidden lg:flex items-center gap-3">
                                <button
                                    onClick={prevTestimonial}
                                    className="w-10 h-10 rounded-[10px] bg-white border border-[#92A2C4] flex items-center justify-center hover:bg-light-beige transition-colors shadow-sm"
                                >
                                    <svg className="w-5 h-5 text-text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                                <button
                                    onClick={nextTestimonial}
                                    className="w-10 h-10 rounded-[10px] bg-white border border-[#92A2C4] flex items-center justify-center hover:bg-light-beige transition-colors shadow-sm"
                                >
                                    <svg className="w-5 h-5 text-text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                            <div className="mb-8 lg:mb-10 relative text-right w-full">
                                <div className="flex items-center gap-3 mb-4 lg:pl-12 justify-center lg:justify-end">
                                    <span className="text-[16px] text-[#313033] font-light normal whitespace-nowrap">
                                        نظرات کاربران
                                    </span>
                                    <img src="/images/Line 65.png" alt="Line" />
                                </div>

                                <h2 className="text-[25px] font-bold text-[#313033] leading-[1.3] text-center lg:text-right">
                                    تجربه کسب‌وکارهایی که با سنجاب رشد کردند
                                </h2>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8 relative" style={{ boxShadow: '0px 0px 50px 0px #2A293B0D' }}>
                            <div className="flex justify-center items-center">
                                <img src="/images/Qoute.svg" alt="Quote" />
                            </div>

                            <div className="pt-4 lg:pt-6 mb-6 lg:mb-8 pr-0">
                                <p className="text-[14px] text-[#313033] font-normal leading-relaxed text-center" style={{ direction: 'rtl' }}>
                                    {currentTest.text}
                                </p>
                            </div>

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

                        <div className="flex lg:hidden items-center justify-center gap-3 mt-6">
                            <button
                                onClick={prevTestimonial}
                                className="w-10 h-10 rounded-[10px] bg-white border border-[#92A2C4] flex items-center justify-center hover:bg-light-beige transition-colors shadow-sm"
                            >
                                <svg className="w-5 h-5 text-text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <button
                                onClick={nextTestimonial}
                                className="w-10 h-10 rounded-[10px] bg-white border border-[#92A2C4] flex items-center justify-center hover:bg-light-beige transition-colors shadow-sm"
                            >
                                <svg className="w-5 h-5 text-text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div className="w-full lg:w-1/2">
                        <div className="mb-8 lg:mb-10 text-center sm:text-right">
                            <div className="flex items-center justify-center sm:justify-end gap-3 mb-4">
                                <span className="text-[16px] text-[#313033] font-light normal whitespace-nowrap">
                                    سوالات پرتکرار
                                </span>
                                <img src="/images/Line 65.png" alt="Line" />
                            </div>

                            <h2 className="text-[25px] font-bold text-[#313033] leading-[1.3]">
                                بیشتر بخوانید، بیشتر بدانید
                            </h2>
                        </div>

                        <div className="space-y-0">
                            {faqs.map((faq, index) => (
                                <div key={index} className="border-b border-decorative-gray">
                                    <button
                                        onClick={() => toggleFaq(index)}
                                        className="w-full py-5 lg:py-6 flex items-center justify-between gap-4 hover:opacity-80 transition-opacity text-right"
                                    >
                                        {openIndex === index ? (
                                            <img src="/images/Arrows Button Down.svg" alt="Arrow" />
                                        ) : (
                                            <img src="/images/Arrows Button Up.svg" alt="Arrow" />
                                        )}
                                        <span className="text-[15px] text-[#313033] flex-1 font-normal">
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
