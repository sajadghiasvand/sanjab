export default function AboutComponent() {
    return (
        <div className="container max-w-[1150px] mx-auto">
            <section className="relative w-full overflow-hidden mt-16">


                {/* Main container */}
                <div className="relative z-10 max-w-7xl mx-auto p-5 sm:px-0">
                    <div className="flex flex-col lg:flex-row items-start ">

                        {/* Mobile: Image on Top */}
                        <div className="relative w-full lg:hidden flex items-center justify-center min-h-[300px] mb-6 order-1">
                            <img src="/images/Group 10655.png" alt="Demo" className="w-full h-full object-contain" />
                        </div>

                        {/* Left Section - Text and Form */}
                        <div className="w-full lg:w-3/5 space-y-3 order-2 lg:order-1">
                            {/* Top Section Label */}
                            <div className="flex items-center justify-center sm:justify-end gap-3">

                                <span className="text-[16px] text-[#313033] font-light normal whitespace-nowrap">
                                    درباره سامانه سنجاب
                                </span>
                                <img src="/images/Line 65.png" alt="Vector" />
                            </div>

                            {/* Main Heading */}
                            <h2 className="text-[25px] sm:!text-[30px] !font-bold !text-[#313033] text-center sm:text-right ">
                                سنجاب مشتری ها تو نگه دار فروشتو بیشتر کن
                            </h2>

                            {/* Body Text */}
                            <div className="space-y-3 text-[15px]  text-[#313033] whitespace-pre-line  text-justify" style={{ direction: 'rtl' }}>

                                سنجاب يه سامانه وفادارسازى مشتريه كه خيلى راحت راه مى افته و كمك مى كنه مشترى هات بعد از خريد، اعتبار
                                بكيرن و براى خريد بعدى حتماً بركَردن پيش خودت.
                                <br />
                                ما با كلى مركز جمعيتى مثل اداره‌ها، شركتها و سازمان ها قرارداد داريم. اين سازمان‌ها میتونن از طريق سامانهى
                                <br />
                                سنجاب، به كارمنداى خودشون اعتبار بدن تا تو فروشكاه شما خرج كنن. يعنى شما حتى بدون تبليغ، مى تونى
                                <br />
                                مشترى جديد داشته باشى اونم از سمت سازمان هايى كه هر ماه اعتبار مشخصى به كارمنداشون مى دن.


                            </div>

                            {/* Demo Request Form */}
                            <div className="bg-[#FFAD64] rounded-2xl p-6 lg:p-8">
                                {/* Form Heading */}
                                <h3 className="text-[18px] sm:!text-[20px] font-bold text-white text-center lg:text-right mb-5 lg:mb-6" style={{ direction: 'rtl' }}>
                                    برای درخواست دمو اطلاعاتتون رو وارد کنید.
                                </h3>

                                {/* Form Fields and Button Row */}
                                <div className="flex flex-col lg:flex-row-reverse gap-3 lg:gap-4 items-stretch lg:items-center">
                                    {/* Input Fields Container */}
                                    <div className="flex flex-col lg:flex-row gap-3 lg:gap-4 flex-1">
                                        {/* Name Input */}
                                        <input
                                            type="text"
                                            placeholder="نام و نام خانوادگی"
                                            style={{ direction: 'rtl' }}
                                            className="flex-1 px-4 h-[45px] py-3.5 lg:py-4 rounded-[30px] bg-white border border-decorative-gray/70 text-[#313033] placeholder:text-decorative-gray focus:outline-none focus:ring-2 focus:ring-white/50 text-sm lg:text-base"
                                        />

                                        {/* Phone Input */}
                                        <input
                                            type="tel"
                                            placeholder="شماره همراه"
                                            style={{ direction: 'rtl' }}
                                            className="flex-1 px-4 h-[45px] rounded-[30px] py-3.5 lg:py-4 bg-white border border-decorative-gray/70 text-[#313033] placeholder:text-decorative-gray focus:outline-none focus:ring-2 focus:ring-white/50 text-sm lg:text-base"
                                        />
                                    </div>

                                    {/* Submit Button - Positioned to the far left (right side visually in RTL) */}
                                    <button className="w-full h-[45px] rounded-[30px] flex items-center justify-center lg:w-auto px-6 lg:px-8 py-3.5 lg:py-4 bg-[#313033] text-white font-medium hover:bg-[#313033]/90 transition-colors shadow-lg text-sm lg:text-base whitespace-nowrap">
                                        ارسال
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Desktop: Right Section - Visual Display */}
                        <div className="hidden lg:flex relative w-full lg:w-2/5 items-center justify-center min-h-[400px] order-2">
                            <img src="/images/Group 10655.png" alt="Demo" className="w-full h-full object-contain" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
