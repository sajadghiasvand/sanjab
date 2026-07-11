import { useState } from 'react';

const navLinks = [
    { label: 'آموزش', href: '#learn' },
    { label: 'سوالات متداول', href: '#faq' },
    { label: 'درباره ما', href: '#about' },
    { label: 'تماس با ما', href: '#contact' },
];

const socialLinks = [
    { href: '#', src: '/images/instagram.png', alt: 'Instagram' },
    { href: '#', src: '/images/whatsapp.png', alt: 'WhatsApp' },
    { href: '#', src: '/images/rubika.svg', alt: 'Rubika' },
];

export default function HeaderComponent() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="relative w-full bg-white overflow-hidden">
            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-4 lg:py-5">
                {/* Mobile Layout */}
                <div className="flex lg:hidden items-center justify-between w-full">
                    <a href="tel:02833642865" className="flex-shrink-0 flex items-center gap-2">
                        <img src="/images/supportMobile.png" alt="Support" className="w-10 h-10" />
                        <div className="text-right" style={{ direction: 'rtl' }}>
                            <p className="text-[11px] text-[#313033]/70 leading-none mb-0.5">مشاوره رایگان</p>
                            <p className="text-[13px] font-bold text-[#313033] tracking-wide" dir="ltr">02833642865</p>
                        </div>
                    </a>

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
                            aria-label="منو"
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
                        <div
                            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                            onClick={() => setIsMenuOpen(false)}
                        ></div>

                        <div className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white z-50 lg:hidden transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                            } shadow-2xl`}>
                            <div className="flex flex-col h-full p-6">
                                <div className="flex justify-end mb-6">
                                    <button
                                        onClick={() => setIsMenuOpen(false)}
                                        className="w-10 h-10 flex items-center justify-center"
                                        aria-label="بستن منو"
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

                                <nav className="flex flex-col gap-6 mb-8">
                                    {navLinks.map((link) => (
                                        <a
                                            key={link.href}
                                            href={link.href}
                                            onClick={() => setIsMenuOpen(false)}
                                            className="text-[18px] text-text-dark font-normal hover:text-accent-orange transition-colors text-right"
                                        >
                                            {link.label}
                                        </a>
                                    ))}
                                </nav>

                                <div className="flex items-center gap-3 mt-auto pt-6 border-t border-decorative-gray">
                                    {socialLinks.map((social) => (
                                        <a
                                            key={social.alt}
                                            href={social.href}
                                            className="w-10 h-10 border-[#EEE8DF] border-[1.5px] rounded-[10px] flex items-center justify-center hover:opacity-80 transition-opacity"
                                        >
                                            <img src={social.src} alt={social.alt} className="w-5 h-5 object-contain" />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {/* Desktop Layout */}
                <div className="hidden lg:flex flex-row items-center justify-between gap-8">
                    <div className="flex flex-row items-center gap-5">
                        <a href="tel:02833642865" className="flex items-center gap-3 rounded-2xl px-2 py-2 hover:opacity-90 transition-opacity">
                            <img src="/images/Support.png" alt="Contact" />
                            <div className="text-right" style={{ direction: 'rtl' }}>
                                <p className="text-[13px] text-[#313033]/70 leading-none mb-1">مشاوره رایگان</p>
                                <p className="text-[16px] font-bold text-[#313033] tracking-wide" dir="ltr">02833642865</p>
                            </div>
                        </a>

                        <div className="flex items-center gap-3">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.alt}
                                    href={social.href}
                                    className="w-10 h-10 border-[#EEE8DF] border-[1.5px] rounded-[10px] flex items-center justify-center hover:opacity-80 transition-opacity"
                                >
                                    <img src={social.src} alt={social.alt} className="w-6 h-6 object-contain" />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-row items-center gap-5">
                        <nav className="flex items-center gap-6">
                            {navLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    className="text-[15px] text-text-dark font-normal hover:text-accent-orange transition-colors whitespace-nowrap"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </nav>

                        <div className="w-px h-7 bg-text-dark/30"></div>

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
