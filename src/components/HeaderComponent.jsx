import { useState } from 'react';

export default function HeaderComponent() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="relative w-full bg-white overflow-hidden">
            {/* Main header container */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-4 lg:py-5">
                {/* Mobile Layout */}
                <div className="flex lg:hidden items-center justify-between w-full">
                    {/* Support Icon - Left */}
                    <div className="flex-shrink-0">
                        <img src="/images/supportMobile.png" alt="Support" className="w-10 h-10" />
                    </div>

                    {/* Logo and Hamburger Menu - Right (grouped together) */}
                    <div className="flex items-center gap-3 flex-shrink-0">
                        <div className="flex-shrink-0">
                            <img
                                src="/images/Logo.svg"
                                alt="Sanjab Logo"
                                className="w-24 h-10 object-contain"
                            />
                        </div>
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="flex-shrink-0 w-10 h-10 flex items-center justify-center"
                        >
                            <svg
                                className="w-6 h-6 text-text-dark"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                {isMenuOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Side Menu Overlay */}
                {isMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <div
                            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                            onClick={() => setIsMenuOpen(false)}
                        ></div>

                        {/* Side Menu */}
                        <div className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white z-50 lg:hidden transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                            } shadow-2xl`}>
                            <div className="flex flex-col h-full p-6">
                                {/* Close Button */}
                                <div className="flex justify-end mb-6">
                                    <button
                                        onClick={() => setIsMenuOpen(false)}
                                        className="w-10 h-10 flex items-center justify-center"
                                    >
                                        <svg
                                            className="w-6 h-6 text-text-dark"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </button>
                                </div>

                                {/* Navigation Links */}
                                <nav className="flex flex-col gap-6 mb-8">
                                    <a
                                        href="#"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="text-[18px] text-text-dark font-normal hover:text-accent-orange transition-colors text-right"
                                    >
                                        آموزش
                                    </a>
                                    <a
                                        href="#"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="text-[18px] text-text-dark font-normal hover:text-accent-orange transition-colors text-right"
                                    >
                                        سوالات متداول
                                    </a>
                                    <a
                                        href="#"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="text-[18px] text-text-dark font-normal hover:text-accent-orange transition-colors text-right"
                                    >
                                        درباره ما
                                    </a>
                                    <a
                                        href="#"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="text-[18px] text-text-dark font-normal hover:text-accent-orange transition-colors text-right"
                                    >
                                        تماس با ما
                                    </a>
                                </nav>

                                {/* Social Media Icons */}
                                <div className="flex items-center gap-3 mt-auto pt-6 border-t border-decorative-gray">
                                    <a href="#" className="w-10 h-10 border-[#EEE8DF] border-[1.5px] rounded-[10px] flex items-center justify-center hover:opacity-80 transition-opacity">
                                        <img src="/images/Instagram.png" alt="Instagram" className="w-5 h-5 object-contain" />
                                    </a>
                                    <a href="#" className="w-10 h-10 border-[#EEE8DF] border-[1.5px] rounded-[10px] flex items-center justify-center hover:opacity-80 transition-opacity">
                                        <img src="/images/Facebook.png" alt="Facebook" className="w-5 h-5 object-contain" />
                                    </a>
                                    <a href="#" className="w-10 h-10 border-[#EEE8DF] border-[1.5px] rounded-[10px] flex items-center justify-center hover:opacity-80 transition-opacity">
                                        <img src="/images/Whatsapp.png" alt="WhatsApp" className="w-5 h-5 object-contain" />
                                    </a>
                                    <a href="#" className="w-10 h-10 border-[#EEE8DF] border-[1.5px] rounded-[10px] flex items-center justify-center hover:opacity-80 transition-opacity">
                                        <img src="/images/youtube.png" alt="YouTube" className="w-5 h-5 object-contain" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {/* Desktop Layout */}
                <div className="hidden lg:flex flex-row items-center justify-between gap-8">
                    {/* Left Section - Contact Info & Social Media */}
                    <div className="flex flex-row items-center gap-5">
                        {/* Contact Information Block */}
                        <div className="flex items-center gap-4 rounded-2xl px-5 py-3">
                            <img src="/images/Support.png" alt="Contact" />
                        </div>

                        {/* Social Media Icons */}
                        <div className="flex items-center gap-3">
                            <a href="#" className="w-10 h-10 border-[#EEE8DF] border-[1.5px] rounded-[10px] flex items-center justify-center hover:opacity-80 transition-opacity">
                                <img src="/images/instagram.png" alt="Instagram" className="w-6 h-6 object-contain" />
                            </a>
                            <a href="#" className="w-10 h-10 border-[#EEE8DF] border-[1.5px] rounded-[10px] flex items-center justify-center hover:opacity-80 transition-opacity">
                                <img src="/images/facebook.png" alt="Facebook" className="w-6 h-6 object-contain" />
                            </a>
                            <a href="#" className="w-10 h-10 border-[#EEE8DF] border-[1.5px] rounded-[10px] flex items-center justify-center hover:opacity-80 transition-opacity">
                                <img src="/images/whatsapp.png" alt="WhatsApp" className="w-6 h-6 object-contain" />
                            </a>
                            <a href="#" className="w-10 h-10 border-[#EEE8DF] border-[1.5px] rounded-[10px] flex items-center justify-center hover:opacity-80 transition-opacity">
                                <img src="/images/youtube.png" alt="YouTube" className="w-6 h-6 object-contain" />
                            </a>
                        </div>
                    </div>

                    {/* Right Section - Navigation & Logo */}
                    <div className="flex flex-row items-center gap-5">
                        {/* Navigation Links */}
                        <nav className="flex items-center gap-6">
                            <a href="#" className="text-[15px] text-text-dark font-normal hover:text-accent-orange transition-colors whitespace-nowrap">
                                آموزش
                            </a>
                            <a href="#" className="text-[15px] text-text-dark font-normal hover:text-accent-orange transition-colors whitespace-nowrap">
                                سوالات متداول
                            </a>
                            <a href="#" className="text-[15px] text-text-dark font-normal hover:text-accent-orange transition-colors whitespace-nowrap">
                                درباره ما
                            </a>
                            <a href="#" className="text-[15px] text-text-dark font-normal hover:text-accent-orange transition-colors whitespace-nowrap">
                                تماس با ما
                            </a>
                        </nav>

                        {/* Vertical Separator */}
                        <div className="w-px h-7 bg-text-dark/30"></div>

                        {/* Logo */}
                        <div className="flex-shrink-0">
                            <img
                                src="/images/Logo.svg"
                                alt="Sanjab Logo"
                                className="w-24 h-10 object-contain"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
