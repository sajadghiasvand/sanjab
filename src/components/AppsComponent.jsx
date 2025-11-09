export default function AppsComponent() {
    return (

        <div className="container max-w-[1150px] mx-auto px-5 lg:px-0">
            <div className="relative w-full rounded-2xl p-8 lg:p-10 flex items-center justify-end min-h-[826px] sm:min-h-[426px] h-fit lg:h-[462px] overflow-hidden">
                {/* Mobile Background */}
                <div
                    className="lg:hidden absolute inset-0 rounded-2xl"
                    style={{
                        background: "url('/images/Group 10658.png') no-repeat",
                        backgroundSize: "cover",
                        backgroundPosition: "center"
                    }}
                ></div>

                {/* Desktop Background */}
                <div
                    className="hidden lg:block absolute inset-0 rounded-2xl"
                    style={{
                        background: "url('/images/Group 10652.png') no-repeat",
                        backgroundSize: "contain"
                    }}
                ></div>
                {/* Second Div - Two Column Layout */}
                <div className="relative z-10 w-full flex flex-col lg:flex-row items-center gap-8">
                    {/* Left Half - Empty/Spacer */}
                    <div className="w-full lg:w-1/2"></div>

                    {/* Right Half - Content */}
                    <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-end text-center lg:text-right bottom-0 absolute top-0 sm:relative">
                        {/* Main Headline */}
                        <h2 className="text-[30px] font-bold text-[#313033] leading-[1.3] mt-8">
                            آماده اید؟ شروع یک تجربه عالی
                            {/* Sub-headline with Wavy Underline */}
                            <div className="text-right flex flex-row-reverse gap-2 ">
                                <br />
                                <span>با</span>
                                <div className="mb-4 lg:mb-6">
                                    <h3 className="text-[30px] font-bold text-[#FFAD64] leading-[1.3]">
                                        <span className="relative inline-block">
                                            سنجاب
                                            <svg
                                                className="absolute -bottom-1 right-0 w-full h-2"
                                                viewBox="0 0 80 8"
                                                preserveAspectRatio="none"
                                            >
                                                <path
                                                    d="M0,6 Q20,2 40,6 T80,6"
                                                    stroke="#FFA500"
                                                    strokeWidth="2.5"
                                                    fill="none"
                                                />
                                            </svg>
                                        </span>
                                    </h3>
                                </div>
                                <span style={{ direction: 'rtl' }}>شروع کنید ...</span>
                            </div>
                        </h2>



                        {/* Paragraph Text */}
                        <p className="text-sm lg:text-base text-[#313033] font-regular leading-relaxed mb-8 lg:mb-10 max-w-xl sm:truncate" style={{ direction: 'rtl' }}>
                            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ از طراحان گرافیک است...
                        </p>

                        {/* App Download Buttons */}
                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            {/* App Store Button */}
                            <a
                                href="#"
                                className="flex items-center gap-3 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow"
                            >
                                <img
                                    src="/images/AppStore.png"
                                    alt="App Store"

                                />

                            </a>

                            {/* Google Play Button */}
                            <a
                                href="#"
                                className="flex items-center gap-3 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow"
                            >
                                <img
                                    src="/images/GooglePlay.png"
                                    alt="Google Play"

                                />

                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}
