import { useEffect, useState } from 'react';
import { toFa, formatToman } from '../../utils/persianNumbers';
import { discountedPrice } from '../../data/storeMockData';

export default function PriceCard({ pricing }) {
    const [countdown, setCountdown] = useState({ d: 0, h: 0, m: 0, s: 0 });

    const endTime = new Date(pricing.discountEndsAt).getTime();

    useEffect(() => {
        function tick() {
            const now = Date.now();
            let diff = endTime - now;
            if (diff < 0) diff = 0;
            const d = Math.floor(diff / (1000 * 60 * 60 * 24));
            const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const m = Math.floor((diff / (1000 * 60)) % 60);
            const s = Math.floor((diff / 1000) % 60);
            setCountdown({ d, h, m, s });
        }

        tick();
        const interval = setInterval(tick, 1000);
        return () => clearInterval(interval);
    }, [endTime]);

    if (!pricing?.isActive) return null;

    return (
        <div className="price-block">
            <div className="discount-tag">{toFa(pricing.discountPercent)}٪ تخفیف محدود</div>
            <div className="price-line">
                <span className="price-old">{formatToman(pricing.basePrice)} تومان</span>
                <span className="price-new">{formatToman(discountedPrice(pricing))}</span>
                <span className="price-unit">تومان</span>
            </div>
            <div className="cd-row">
                <div className="cd-cell">
                    <div className="n">{toFa(countdown.d)}</div>
                    <div className="l">روز</div>
                </div>
                <div className="cd-cell">
                    <div className="n">{toFa(String(countdown.h).padStart(2, '0'))}</div>
                    <div className="l">ساعت</div>
                </div>
                <div className="cd-cell">
                    <div className="n">{toFa(String(countdown.m).padStart(2, '0'))}</div>
                    <div className="l">دقیقه</div>
                </div>
                <div className="cd-cell">
                    <div className="n">{toFa(String(countdown.s).padStart(2, '0'))}</div>
                    <div className="l">ثانیه</div>
                </div>
            </div>
            <div className="price-note">هزینه‌ی شارژ پیامک جداست و بر اساس مصرف محاسبه می‌شود</div>
        </div>
    );
}
