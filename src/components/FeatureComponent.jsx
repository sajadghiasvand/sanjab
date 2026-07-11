import { useState } from 'react';

const tabContent = {
    'اشتراک‌گذاری باشگاه مشتریان': {
        title: 'اشتراک‌گذاری هوشمند مشتریان بین بیزینس‌ها',
        description: 'سنجاب مشتری‌های شما را به بیزینس‌های مکمل متصل می‌کند و در مقابل، مشتری جدید از همان شبکه برای شما ایجاد می‌کند. این فرآیند کاملاً هوشمند و بدون افشای اطلاعات مشتری انجام می‌شود.',
        features: [
            'دریافت مشتری جدید بدون هزینه تبلیغات',
            'اتصال به شبکه بیزینس‌های مکمل',
            'عدم نمایش اطلاعات مشتری',
            'افزایش فروش از طریق شبکه سنجاب',
        ],
    },
    'طرح‌های تخفیفی و تشویقی': {
        title: 'ایجاد دلیل واقعی برای بازگشت مشتری',
        description: 'بعد از هر خرید، برای مشتری کش‌بک فعال می‌شود که فقط در همان بیزینس قابل استفاده است. یعنی هر خرید، یک خرید بعدی می‌سازد. همچنین طرح اولین خرید و طرح فراموشی برای تبدیل مشتری جدید و بازگرداندن مشتریان از دست‌رفته در اختیار شماست.',
        features: [
            'طرح کش‌بک: ایجاد دلیل واقعی برای بازگشت مشتری',
            'طرح اولین خرید: تبدیل مشتری جدید به مشتری دائمی',
            'طرح فراموشی: بازگرداندن مشتری‌های از دست‌رفته',
            'پیشنهاد هوشمند برای خرید بعدی',
        ],
    },
    'سامانه پیامکی': {
        title: 'ارتباط هوشمند با مشتری',
        description: 'در زمان مناسب و بر اساس رفتار مشتری، پیامک‌های هدفمند ارسال می‌شود تا او را به خرید دوباره ترغیب کند.',
        features: [
            'ارسال پیامک بر اساس رفتار مشتری',
            'یادآوری خرید و پیشنهاد ویژه',
            'افزایش تعامل با مشتری',
            'بدون نیاز به ابزار اضافی',
        ],
    },
    'باشگاه پذیرندگان': {
        title: 'دریافت مزایای ویژه برای بیزینس‌های فعال',
        description: 'با فعالیت در سنجاب، وارد باشگاه پذیرندگان می‌شوید و بر اساس عملکردتان، از خدمات و فرصت‌های ویژه بهره‌مند می‌شوید.',
        features: [
            'دریافت مزایای اختصاصی',
            'افزایش اعتبار در شبکه سنجاب',
            'دسترسی به فرصت‌های فروش بیشتر',
            'اتصال به خدمات ویژه (بانکی / سازمانی)',
        ],
    },
    'تراکنش و پرداخت‌ها': {
        title: 'ثبت خودکار و دقیق رفتار خرید',
        description: 'تمام تراکنش‌ها از طریق پوز ثبت می‌شود و شما بدون هیچ کار اضافی، به دیتای واقعی فروش دسترسی دارید.',
        features: [
            'اتصال مستقیم به پوز',
            'ثبت خودکار تراکنش‌ها',
            'مشاهده گزارش‌های دقیق فروش',
            'تحلیل رفتار واقعی مشتری',
        ],
    },
    'پیام شخصی‌سازی‌شده': {
        title: 'ارتباط اختصاصی با هر مشتری',
        description: 'بر اساس رفتار خرید هر مشتری، پیام و پیشنهاد اختصاصی برای او ارسال می‌شود. این یعنی هر مشتری تجربه متفاوتی دارد. پیامک بر اساس بخش فروش، برچسب مشتری، تولد، سالگرد ازدواج و رفتار خرید (اولین خرید، مشتری وفادار، بازگشت پس از غیبت، خرید با مبلغ بالا) ارسال می‌شود.',
        features: [
            'ارسال پیشنهاد متناسب با هر مشتری',
            'افزایش احتمال خرید مجدد',
            'ایجاد تجربه شخصی‌سازی‌شده',
            'افزایش وفاداری مشتری',
        ],
    },
    'گزارش‌ها و تحلیل‌ها': {
        title: 'مدیریت فروش با دیتای واقعی',
        description: 'سنجاب تمام رفتار خرید مشتریان را ثبت می‌کند و گزارش‌های دقیق و قابل تحلیل در اختیار شما قرار می‌دهد تا تصمیم‌های بهتری برای رشد فروش بگیرید.',
        features: [
            'گزارش کش‌بک و میزان استفاده',
            'گزارش تخفیف، انتقال اعتبار و فروش کل بیزینس',
            'شاخص وفاداری و مشتریان فعال ماهانه',
            'گزارش عملکرد پیامک‌ها، اشتراک‌گذاری و دستگاه‌های فعال',
        ],
    },
};

const tabs = Object.keys(tabContent);

export default function FeatureComponent() {
    const [activeTab, setActiveTab] = useState(tabs[0]);
    const content = tabContent[activeTab];

    return (
        <section className="relative w-full bg-light-beige py-12 lg:py-16 overflow-hidden" style={{ background: "#F8E5C7 url('/images/Group 10654.png')", backgroundSize: "cover" }}>
            <div className="container max-w-[1150px] mx-auto">
                <div className="relative z-10 max-w-7xl mx-auto p-5">
                    <div className="mb-8 lg:mb-10">
                        <div className="mb-4 flex items-center justify-center gap-3">
                            <h3 className="text-[16px] text-[#313033] font-light normal whitespace-nowrap">
                                کاربردهای سامانه سنجاب
                            </h3>
                            <img src="/images/Line 65.png" alt="Vector" />
                        </div>

                        <h2 className="text-[30px] text-center font-bold text-[#313033] mb-6 lg:mb-8">
                            سنجاب چطور کمک می‌کند؟
                        </h2>

                        <div className="flex flex-nowrap lg:flex-wrap gap-3 lg:gap-4 justify-start lg:justify-between border-b-2 overflow-x-auto lg:overflow-x-visible overflow-y-hidden border-[#DBCBB1] pb-2 w-full flex-row-reverse scrollbar-hide">
                            {tabs.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-4 py-2 text-[16px] transition-colors relative flex-shrink-0 whitespace-nowrap ${activeTab === tab
                                        ? 'text-[#313033] font-bold'
                                        : 'text-[#313033] font-normal'
                                        }`}
                                >
                                    {tab}
                                    {activeTab === tab && (
                                        <div className="absolute bottom-[-11px] left-0 right-0 h-1 bg-[#FFAD64]"></div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                        <img src="/images/image 22.png" alt="Feature" className="w-full lg:w-[65%] h-full object-contain" />

                        <div className="w-full lg:w-[35%] flex-shrink-0">
                            <h3 className="text-[22px] font-bold text-right text-[#313033] mb-4 lg:mb-6">
                                {content.title}
                            </h3>
                            <p className="text-[16px] text-[#313033] font-normal leading-relaxed text-justify mb-6" style={{ direction: 'rtl' }}>
                                {content.description}
                            </p>

                            <ul className="space-y-3" style={{ direction: 'rtl' }}>
                                {content.features.map((feature, index) => (
                                    <li key={index} className="flex items-center justify-start gap-3">
                                        <svg className="w-5 h-5 text-status-green flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-[16px] text-[#313033] font-regular">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
