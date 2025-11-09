import { useState } from 'react';

export default function FeatureComponent() {
    const [activeTab, setActiveTab] = useState('اشتراک گذاری باشگاه مشتریان');
    const [activeFilter, setActiveFilter] = useState('درخواست های ارسالی');

    const tabs = [
        'اشتراک گذاری باشگاه مشتریان',
        'طرح های تخفیفی / تشویقی',
        'سامانه پیامکی',
        'دیتای هوشمند',
        'نظر سنجی',
        'تراکنش و پرداخت ها'
    ];

    const requests = [
        { id: 1, type: 'قفسه جایزه', to: 'فروشگاه شماره ۱', status: 'تایید شده', statusType: 'approved' },
        { id: 2, type: 'ارسال پیام', to: 'فروشگاه شماره ۲', status: 'تایید شده', statusType: 'approved' },
        { id: 3, type: 'ارسال پیام', to: 'فروشگاه شماره ۳', status: 'رد شده', statusType: 'rejected' },
        { id: 4, type: 'ارسال پیام', to: 'فروشگاه شماره ۴', status: 'تایید شده', statusType: 'approved' },
        { id: 5, type: 'قفسه جایزه', to: 'فروشگاه شماره ۵', status: 'رد شده', statusType: 'rejected' },
    ];

    const features = [
        'افزودن نامحدود مشتری به باشگاه',
        'تخصیص خودکار امتیاز به مشتری',
        'بخش بندی مشتریان بر اساس امتیاز',
        'ثبت و مشاهده سوابق خرید مشتریان'
    ];

    return (
        <section className="relative w-full bg-light-beige py-12 lg:py-16 overflow-hidden" style={{ background: "#F8E5C7 url('/images/Group 10654.png')", backgroundSize: "cover", }}>
            <div className="container max-w-[1150px] mx-auto">


                <div className="relative z-10 max-w-7xl mx-auto p-5 ">
                    {/* Top Section - Headings */}
                    <div className="mb-8 lg:mb-10">
                        {/* Top Left Heading with Orange Underline */}
                        <div className="mb-4 flex items-center justify-center gap-3">
                            <h3 className="text-[16px] text-[#313033] font-light normal whitespace-nowrap">
                                کاربردهای سامانه سنجاب
                            </h3>
                            <img src="/images/Line 65.png" alt="Vector" />
                        </div>

                        {/* Main Heading */}
                        <h2 className="text-[30px] text-center font-bold text-[#313033] mb-6 lg:mb-8">
                            سنجاب چطوری کمکت میکنه؟
                        </h2>

                        {/* Navigation Tabs */}
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
                        {/* Right Section - Description */}
                        <img src="/images/image 22.png" alt="Feature" className="w-full h-full object-contain" />


                        {/* Left Section - Main White Card */}
                        <div className="w-full lg:w-[35%] flex-shrink-0">
                            <h3 className="text-[22px] font-bold text-right text-[#313033] mb-4 lg:mb-6">
                                {activeTab}
                            </h3>
                            <p className="text-[16px] text-[#313033] font-normal leading-relaxed text-justify mb-6" style={{ direction: 'rtl' }}>
                                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.
                            </p>

                            {/* Feature List */}
                            <ul className="space-y-3" style={{ direction: 'rtl' }}>
                                {features.map((feature, index) => (
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
