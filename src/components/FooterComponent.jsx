export default function FooterComponent() {
    return (
        <footer className="relative w-full bg-white py-12 lg:py-16">
            <div className="max-w-[1150px] mx-auto p-5">
                <div className="flex flex-col-reverse lg:flex-row items-end gap-12 lg:gap-16">
                    <div className="block sm:hidden">
                        {/* Separator Line */}
                        <div className="h-px w-full bg-[#E0E0E0] mb-6 lg:mb-8"></div>

                        {/* Copyright Text */}
                        <p className="text-[14px] text-[#31303380] text-right" style={{ direction: 'rtl' }}>
                            کلیه حقوق متعلق به مجموعه به سامانه تبلیغات سنجاب می باشد.
                        </p>
                    </div>
                    {/* Left Column - Newsletter and Social Media */}
                    <div className="w-full lg:w-1/3 ">
                        {/* Newsletter Section */}
                        <div className="mb-8 lg:mb-16">
                            {/* Heading */}
                            <h3 className="text-[22px] font-bold text-[#313033] text-right">
                                همیشه از سنجاب باخبر باشید
                            </h3>

                            {/* Sub-text */}
                            <p className="text-[14px] text-[#313033] mb-6 lg:mb-8 text-right leading-relaxed">
                                برای اطلاع از برنامه ها و اخبار جدید میتونید عضو خبرنامه بشید
                            </p>

                            {/* Email Input and Subscribe Button */}
                            <div className="flex flex-col sm:flex-row gap-3">
                                {/* Subscribe Button */}
                                <button className="px-6 py-3 bg-text-dark text-white font-medium rounded-xl hover:bg-text-dark/90 transition-colors text-sm lg:text-base whitespace-nowrap order-2 sm:order-1">
                                    عضویت
                                </button>

                                {/* Email Input */}
                                <div className="relative flex-1 order-1 sm:order-2">
                                    <input
                                        type="email"
                                        placeholder="ایمیل خود را وارد کنید ..."
                                        className="w-full px-4 py-3 text-right  rounded-xl bg-white border border-[#E0E0E0] text-text-dark placeholder:text-[#AAAAAA] focus:outline-none focus:ring-2 focus:ring-text-dark/20 text-sm lg:text-base"
                                        style={{ direction: 'rtl' }}
                                    />

                                </div>
                            </div>
                        </div>

                        {/* Social Media Icons */}
                        <div className="flex items-center justify-end gap-3 lg:gap-4">
                            <a href="#" className="w-10 h-10  rounded-lg bg-[#F5F5F5] border border-[#E0E0E0] flex items-center justify-center hover:bg-gray-100 transition-colors">
                                <img
                                    src="/images/instagram.png"
                                    alt="Instagram"
                                    className="w-5 h-5 lg:w-6 lg:h-6 object-contain"
                                />
                            </a>
                            <a href="#" className="w-10 h-10  rounded-lg bg-[#F5F5F5] border border-[#E0E0E0] flex items-center justify-center hover:bg-gray-100 transition-colors">
                                <img
                                    src="/images/facebook.png"
                                    alt="Facebook"
                                    className="w-5 h-5 lg:w-6 lg:h-6 object-contain"
                                />
                            </a>
                            <a href="#" className="w-10 h-10  rounded-lg bg-[#F5F5F5] border border-[#E0E0E0] flex items-center justify-center hover:bg-gray-100 transition-colors">
                                <img
                                    src="/images/twitter.png"
                                    alt="Twitter"
                                    className="w-5 h-5 lg:w-6 lg:h-6 object-contain"
                                />
                            </a>
                            <a href="#" className="w-10 h-10  rounded-lg bg-[#F5F5F5] border border-[#E0E0E0] flex items-center justify-center hover:bg-gray-100 transition-colors">
                                <img
                                    src="/images/whatsapp.png"
                                    alt="WhatsApp"
                                    className="w-5 h-5 lg:w-6 lg:h-6 object-contain"
                                />
                            </a>
                            <a href="#" className="w-10 h-10  rounded-lg bg-[#F5F5F5] border border-[#E0E0E0] flex items-center justify-center hover:bg-gray-100 transition-colors">
                                <img
                                    src="/images/youtube.png"
                                    alt="YouTube"
                                    className="w-5 h-5 lg:w-6 lg:h-6 object-contain"
                                />
                            </a>
                        </div>
                    </div>

                    {/* Right Column - Company Information */}
                    <div className="w-full lg:w-2/3 border-l-0 sm:border-l border-[#E0E0E0] pl-0 sm:pl-12">
                        <div className="flex items-center justify-between flex-col-reverse sm:flex-row">
                            {/* Logo */}


                            {/* Contact Information */}
                            <div className="space-y-4 mb-6 lg:mb-8">
                                {/* Phone Number */}
                                <div className="flex items-center justify-end gap-4">
                                    <div className="text-right">
                                        <p className="text-xs text-[#31303380] mb-1">شماره تماس</p>
                                        <p className="text-base font-medium text-[#313033]">۰۲۱-۵۵۱۲۰۰۸۸</p>
                                    </div>
                                    <div className="w-10 h-10  rounded-lg bg-light-orange-bg flex items-center justify-center flex-shrink-0">
                                        <svg
                                            className="w-5 h-5 lg:w-6 lg:h-6 text-[#FFAA00]"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                            />
                                        </svg>
                                    </div>
                                </div>

                                {/* Email Address */}
                                <div className="flex items-center justify-end gap-4">
                                    <div className="text-right">
                                        <p className="text-xs text-[#31303380] mb-1">پست الکترونیک</p>
                                        <p className="text-base font-medium text-[#313033]">info@Sanjab.ir</p>
                                    </div>
                                    <div className="w-10 h-10  rounded-lg bg-light-orange-bg flex items-center justify-center flex-shrink-0">
                                        <svg
                                            className="w-5 h-5 lg:w-6 lg:h-6 text-[#FFAA00]"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center justify-center sm:justify-end gap-3 mb-6 lg:mb-8">
                                    <div className="">
                                        <img
                                            src="/images/Logo.svg"
                                            alt="Sanjab Logo"
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                </div>

                                {/* About Text */}
                                <p className=" text-[15px] text-[#313033] leading-relaxed mb-8 lg:mb-10 text-center sm:text-right ml-0 sm:ml-6" style={{ direction: 'rtl' }}>
                                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.
                                </p>
                            </div>
                        </div>
                        <div className="hidden sm:block">
                            {/* Separator Line */}
                            <div className="h-px w-full bg-[#E0E0E0] mb-6 lg:mb-8"></div>

                            {/* Copyright Text */}
                            <p className="text-[14px] text-[#31303380] text-right" style={{ direction: 'rtl' }}>
                                کلیه حقوق متعلق به مجموعه به سامانه تبلیغات سنجاب می باشد.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
