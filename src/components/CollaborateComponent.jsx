export default function CollaborateComponent() {
    return (
        <section className="relative w-full bg-white py-12 lg:py-16">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                {/* Mobile Layout: Title on top, items below */}
                <div className="flex flex-col lg:hidden gap-6">
                    {/* Title on Top (Mobile) */}
                    <div className="text-center">
                        <span className="text-[22px] text-[#313033] font-medium">
                            در کنار بهترین ها با شما هستیم
                        </span>
                    </div>

                    {/* Scrollable Items (Mobile) */}
                    <div className="flex flex-nowrap items-center justify-start gap-4 overflow-x-auto pb-4 scrollbar-hide px-0">
                        <img src="/images/Logo.svg" className="w-[100px] flex-shrink-0" alt="Logo" />
                        <img src="/images/Logo.svg" className="w-[100px] flex-shrink-0" alt="Logo" />
                        <img src="/images/Logo.svg" className="w-[100px] flex-shrink-0" alt="Logo" />
                        <img src="/images/Logo.svg" className="w-[100px] flex-shrink-0" alt="Logo" />
                        <img src="/images/Logo.svg" className="w-[100px] flex-shrink-0" alt="Logo" />
                    </div>
                </div>

                {/* Desktop Layout: Horizontal with title on right */}
                <div className="hidden lg:flex flex-wrap items-center justify-center gap-8 lg:gap-12">
                    <div className="flex items-center gap-4">
                        <img src="/images/Logo.svg" className="w-[100px]" alt="Logo" />
                        <img src="/images/Logo.svg" className="w-[100px]" alt="Logo" />
                        <img src="/images/Logo.svg" className="w-[100px]" alt="Logo" />
                        <img src="/images/Logo.svg" className="w-[100px]" alt="Logo" />
                        <img src="/images/Logo.svg" className="w-[100px]" alt="Logo" />
                    </div>

                    {/* Horizontal Line */}
                    <div className="h-px w-12 lg:w-16 bg-[#EDE8DF] mx-2"></div>

                    {/* Final Text */}
                    <div className="flex items-center">
                        <span className="text-[22px] text-[#313033] font-medium">
                            در کنار بهترین ها با شما هستیم
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}
