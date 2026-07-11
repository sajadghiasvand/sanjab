export default function AboutComponent() {
    return (
        <div id="about" className="container max-w-[1150px] mx-auto scroll-mt-24">
            <section className="relative w-full overflow-hidden mt-16">
                <div className="relative z-10 max-w-7xl mx-auto p-5 sm:px-0">
                    <div className="flex flex-col lg:flex-row items-start">

                        <div className="relative w-full lg:hidden flex items-center justify-center min-h-[300px] mb-6 order-1">
                            <img src="/images/Group 10655.png" alt="Demo" className="w-full h-full object-contain" />
                        </div>

                        <div className="w-full lg:w-3/5 space-y-3 order-2 lg:order-1">
                            <div className="flex items-center justify-center sm:justify-end gap-3">
                                <span className="text-[16px] text-[#313033] font-light normal whitespace-nowrap">
                                    درباره سامانه سنجاب
                                </span>
                                <img src="/images/Line 65.png" alt="Vector" />
                            </div>

                            <h2 className="text-[25px] sm:!text-[30px] !font-bold !text-[#313033] text-center sm:text-right">
                                سنجاب، مشتری را به خریدهای بعدی برمی‌گرداند
                            </h2>

                            <div className="space-y-3 text-[15px] text-[#313033] whitespace-pre-line text-justify" style={{ direction: 'rtl' }}>
                                سنجاب با ثبت رفتار واقعی خرید مشتری از طریق پوز، و یا نرم‌افزار خود کاری می‌کند مشتری بعد از اولین خرید، برای خریدهای بعدی به شما برگردد و همزمان از بیزینس‌های دیگر برایتان مشتری جدید جذب شود.
                            </div>

                            <div className="bg-[#FFAD64] rounded-2xl p-6 lg:p-8">
                                <h3 className="text-[18px] sm:!text-[20px] font-bold text-white text-center lg:text-right mb-5 lg:mb-6" style={{ direction: 'rtl' }}>
                                    درخواست مشاوره رایگان
                                </h3>

                                <div className="flex flex-col lg:flex-row-reverse gap-3 lg:gap-4 items-stretch lg:items-center">
                                    <div className="flex flex-col lg:flex-row gap-3 lg:gap-4 flex-1">
                                        <input
                                            type="text"
                                            placeholder="نام و نام خانوادگی"
                                            style={{ direction: 'rtl' }}
                                            className="flex-1 px-4 h-[45px] py-3.5 lg:py-4 rounded-[30px] bg-white border border-decorative-gray/70 text-[#313033] placeholder:text-decorative-gray focus:outline-none focus:ring-2 focus:ring-white/50 text-sm lg:text-base"
                                        />

                                        <input
                                            type="tel"
                                            placeholder="شماره تماس"
                                            style={{ direction: 'rtl' }}
                                            className="flex-1 px-4 h-[45px] rounded-[30px] py-3.5 lg:py-4 bg-white border border-decorative-gray/70 text-[#313033] placeholder:text-decorative-gray focus:outline-none focus:ring-2 focus:ring-white/50 text-sm lg:text-base"
                                        />
                                    </div>

                                    <button className="w-full h-[45px] rounded-[30px] flex items-center justify-center lg:w-auto px-6 lg:px-8 py-3.5 lg:py-4 bg-[#313033] text-white font-medium hover:bg-[#313033]/90 transition-colors shadow-lg text-sm lg:text-base whitespace-nowrap">
                                        درخواست مشاوره رایگان
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="hidden lg:flex relative w-full lg:w-2/5 items-center justify-center min-h-[400px] order-2">
                            <img src="/images/Group 10655.png" alt="Demo" className="w-full h-full object-contain" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
