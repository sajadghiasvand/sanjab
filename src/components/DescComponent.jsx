export default function DescComponent() {
    return (
        <div className="container max-w-[1150px] mx-auto p-5">
            <div className="bg-[#FBF5EA] rounded-[20px] px-[30px] py-[23px] text-right flex flex-col sm:flex-row items-center justify-between gap-4">
                <a
                    href="#contact"
                    className="shrink-0 px-6 py-3 bg-[#B68E5D] text-white font-medium rounded-xl hover:bg-[#A68B6F] transition-colors text-sm lg:text-base whitespace-nowrap"
                >
                    درخواست مشاوره
                </a>
                <p className="text-sm sm:text-[15px] text-[#313033] leading-relaxed" style={{ direction: 'rtl' }}>
                    سنجاب یک سیستم وفادارسازی مشتری متصل به پوز است که به کسب‌وکارها کمک می‌کند مشتریان خود را حفظ کنند و فروش بیشتری داشته باشند.
                </p>
            </div>
        </div>
    );
}
