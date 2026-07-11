export default function DemoComponent() {
    return (
        <section id="contact" className="relative w-full mt-16 scroll-mt-24">
            <div className="container max-w-[1150px] mx-auto p-5">
                <div className="relative w-full rounded-2xl p-6 lg:p-10 flex flex-col lg:flex-row items-center justify-end min-h-[720px] sm:min-h-[420px] lg:h-[420px] overflow-hidden">
                    <div
                        className="lg:hidden absolute inset-0 rounded-2xl"
                        style={{
                            background: "url('/images/Group 10657.png') no-repeat",
                            backgroundSize: "cover",
                            backgroundPosition: "center"
                        }}
                    ></div>

                    <div
                        className="hidden lg:block absolute inset-0 rounded-2xl"
                        style={{
                            background: "url('/images/Group 10653.png') no-repeat",
                            backgroundSize: "contain"
                        }}
                    ></div>

                    <div className="relative z-10 rounded-2xl p-6 lg:p-8 w-full lg:w-1/2 max-w-lg">
                        <div className="text-center mb-8 lg:mb-6">
                            <div className="flex items-center justify-center lg:justify-end gap-3 mb-4">
                                <span className="text-[16px] text-[#151231] font-light normal whitespace-nowrap">
                                    درخواست مشاوره
                                </span>
                                <img src="/images/Line 65.png" alt="Vector" />
                            </div>

                            <h2 className="text-[24px] lg:text-[30px] whitespace-nowrap text-center lg:text-right font-bold text-[#151231] leading-[1.3] mb-4 lg:mb-6">
                                درخواست مشاوره و دمو رایگان
                            </h2>

                            <p className="text-[16px] text-center lg:text-right text-[#151231] font-regular leading-relaxed max-w-3xl mx-auto" style={{ direction: 'rtl' }}>
                                برای آشنایی کامل با سنجاب و بررسی اینکه چطور می‌تواند فروش شما را افزایش دهد، اطلاعات خود را ثبت کنید تا با شما تماس بگیریم.
                            </p>
                        </div>
                        <div className="flex flex-col space-y-4">
                            <input
                                type="text"
                                placeholder="نام و نام خانوادگی"
                                style={{ direction: 'rtl' }}
                                className="w-full h-[45px] rounded-[30px] px-4 py-3.5 lg:py-4 bg-white border border-decorative-gray/70 text-[#313033] placeholder:text-decorative-gray focus:outline-none focus:ring-2 focus:ring-white/50 text-sm lg:text-base"
                            />

                            <input
                                type="tel"
                                placeholder="شماره تماس"
                                style={{ direction: 'rtl' }}
                                className="w-full h-[45px] px-4 rounded-[30px] py-3.5 lg:py-4 bg-white border border-decorative-gray/70 text-[#313033] placeholder:text-decorative-gray focus:outline-none focus:ring-2 focus:ring-white/50 text-sm lg:text-base"
                            />

                            <button className="w-full h-[45px] px-6 text-[16px] flex items-center justify-center font-medium lg:py-4 bg-[#FFAD64] text-white rounded-[30px] transition-colors text-sm lg:text-base shadow-lg">
                                ثبت درخواست
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
