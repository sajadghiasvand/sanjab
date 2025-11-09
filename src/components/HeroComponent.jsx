export default function HeroComponent() {
    return (
        <div className="container max-w-[1150px] mx-auto">
            <div className="relative w-full bg-white overflow-hidden">


                {/* Main container */}
                <div className="relative z-[1] max-w-7xl mx-auto p-5 sm:px-0  sm:py-16 ">
                    <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-16">

                        {/* Left Section - Video Player */}
                        <div className="relative w-full lg:w-1/2 ">
                            {/* Video Player Container */}
                            <div className="relative w-full aspect-[4/3] rounded-[30px] overflow-hidden bg-[#000000] shadow-2xl">
                                {/* Video Thumbnail/Background */}
                                <div className="absolute inset-0">
                                    <img
                                        src="/images/ability.png"
                                        alt="Video thumbnail"
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Play Button Overlay */}
                                <div className="absolute inset-0 flex flex-col items-center justify-center z-[1]">
                                    {/* Play Button */}
                                    <button className="relative mb-5 w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-[rgba(255,165,0,0.7)] backdrop-blur-sm flex items-center justify-center hover:bg-[rgba(255,165,0,0.8)] transition-all group shadow-lg">
                                        <svg
                                            className="w-10 h-10 lg:w-12 lg:h-12 text-white ml-1"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    </button>

                                    {/* Watch Video Text */}
                                    <span className="text-white text-sm lg:text-base font-medium tracking-wide">
                                        مشاهده ویدئو
                                    </span>
                                </div>
                            </div>

                            {/* Rocket Illustration - Overlapping from bottom-right */}
                            <div className="absolute -bottom-10 -right-10 lg:-bottom-16 lg:-right-16 w-40 h-40 lg:w-56 lg:h-56 z-[1]">
                                <img
                                    src="/images/Rocket 1.png"
                                    alt="Rocket"
                                    className="w-full h-full object-contain drop-shadow-2xl"
                                />
                            </div>
                        </div>

                        {/* Right Section - Text Content */}
                        <div className="relative w-full lg:w-1/2 text-right pt-8 lg:pt-12">
                            {/* Decorative Curved Line */}
                            <div className="absolute -top-6 -right-4 w-40 h-20 opacity-60">
                                <svg
                                    viewBox="0 0 160 80"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-full h-full"
                                >
                                    <path
                                        d="M0 40 Q40 20, 80 40 T160 40"
                                        stroke="#DCDCDC"
                                        strokeWidth="2"
                                        strokeDasharray="4 4"
                                        fill="none"
                                    />
                                    <path
                                        d="M150 36 L160 40 L150 44"
                                        stroke="#DCDCDC"
                                        strokeWidth="2"
                                        fill="none"
                                    />
                                </svg>
                            </div>

                            {/* Main Heading with Orange Bar */}
                            <div className="flex items-start justify-center sm:justify-end gap-4 mb-5 lg:mb-6">
                                <h1 className="text-[30px] sm:!text-[35px] justify-center flex items-end flex-col !font-bold !text-[#313033] whitespace-pre-line">
                                    <div className="bg-[#FDF9F2] h-[45px] flex items-center justify-center w-fit p-2 border-[#EDE8DF] border rounded-[10px]">تبلیغات هوشمند</div>
                                    <div className="text-[#313033]">برای کسب و کارهای هوشمند</div>
                                </h1>

                                <div className="w-[5px] h-[90px] bg-[#FFAD64] flex-shrink-0 rounded"></div>
                            </div>

                            {/* Sub-heading */}


                            {/* Body Text */}
                            <div className="space-y-3 text-right text-[18px] sm:text-[20px] text-[#313033] leading-[1.7] mb-7 max-w-xl" style={{ direction: 'rtl' }}>
                                <p className="font-medium" >
                                    دیتاهای دقیق و هدفمند کلید موفقیت در تبلیغات است.
                                    <br />

                                    ما این کلید را در اختیار شما قرار میدهیم
                                </p>
                            </div>

                            {/* CTA Button */}
                            <button className="relative flex mx-auto sm:mx-[unset] items-center h-[50px] w-[185px] justify-center gap-3  lg:py-4 bg-[#B68E5D] text-white text-sm lg:text-base font-medium rounded-xl hover:bg-[#A68B6F] transition-colors shadow-lg">
                                <span>درخواست دمو</span>
                                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                                    <svg
                                        className="w-4 h-4 text-white"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
