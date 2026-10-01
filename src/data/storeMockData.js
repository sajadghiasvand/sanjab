/** @typedef {'full' | 'minimal' | 'both'} PlanScope */
/** @typedef {'full' | 'minimal'} PlanType */

const discountEndsAt = new Date(Date.now() + (2 * 24 * 60 * 60 * 1000 + 14 * 60 * 60 * 1000)).toISOString();

/** @type {import('../api/posStoreApi').PricingCampaign} */
export const PRICING_CAMPAIGN = {
    id: 'pricing-1',
    basePrice: 9_800_000,
    discountPercent: 15,
    discountEndsAt,
    isActive: true,
    updatedAt: new Date().toISOString(),
};

export const PROVINCES = ['قزوین', 'تهران', 'البرز', 'سایر'];

/** @type {import('../api/posStoreApi').RequiredDocument[]} */
export const REQUIRED_DOCUMENTS = [
    { id: 'doc-nid', key: 'nid', label: 'کارت ملی (پشت و رو)', appliesToPlan: 'both' },
    { id: 'doc-license', key: 'license', label: 'جواز کسب / مجوز فعالیت', appliesToPlan: 'both' },
    { id: 'doc-deed', key: 'deed', label: 'سند مالکیت یا اجاره‌نامه', appliesToPlan: 'full' },
    { id: 'doc-sheba', key: 'sheba', label: 'شماره شبا / صفحه اول دسته‌چک', appliesToPlan: 'full' },
    { id: 'doc-eco', key: 'eco', label: 'کد اقتصادی (در صورت وجود)', appliesToPlan: 'full' },
    { id: 'doc-shop', key: 'shop', label: 'عکس نمای بیرونی مغازه', appliesToPlan: 'full' },
];

/** @type {import('../api/posStoreApi').PromoCampaign[]} */
export const PROMO_CAMPAIGNS = [
    {
        id: 'promo-1',
        title: 'هرچه بیشتر شارژ کنی، بیشتر تخفیف بگیر',
        description: 'شارژ ۲۰,۰۰۰,۰۰۰ تومان → ۱۰٪ تخفیف\nشارژ ۵۰,۰۰۰,۰۰۰ تومان → ۱۵٪ تخفیف\nشارژ ۱۰۰,۰۰۰,۰۰۰ تومان → ۲۰٪ تخفیف',
        icon: '✨',
        startDate: null,
        endDate: null,
        isActive: true,
        createdAt: new Date().toISOString(),
    },
    {
        id: 'promo-2',
        title: 'چاپگر رسید همراه پوز',
        description: 'چاپگر رسید حرارتی — خرید همراه با دستگاه پوز: ۳۰٪ تخفیف روی چاپگر',
        icon: '🖨️',
        startDate: null,
        endDate: null,
        isActive: true,
        createdAt: new Date().toISOString(),
    },
    {
        id: 'promo-3',
        title: 'هدیه ویژه نوروز',
        description: 'با خرید تا پایان فروردین، یک ماه شارژ پیامک رایگان هدیه بگیر.',
        icon: '🎁',
        startDate: null,
        endDate: null,
        isActive: true,
        createdAt: new Date().toISOString(),
    },
];

export const FEATURE_CARDS = [
    { icon: '🎁', label: 'کش‌بک خودکار' },
    { icon: '🔁', label: 'مشتری فراموش‌شده' },
    { icon: '🎂', label: 'هدیه تولد' },
];

/** @param {PlanType} planType */
export function getDocumentsForPlan(planType) {
    return REQUIRED_DOCUMENTS.filter(
        (doc) => doc.appliesToPlan === 'both' || doc.appliesToPlan === planType,
    );
}

/** @param {import('../api/posStoreApi').PricingCampaign} [campaign] */
export function discountedPrice(campaign = PRICING_CAMPAIGN) {
    return campaign.basePrice * (1 - campaign.discountPercent / 100);
}

export function buildWhatsAppLink(trackingCode) {
    const text = `سلام، مدارک ثبت پوز سنجاب رو ارسال می‌کنم. کد پیگیری: ${trackingCode}`;
    return `https://wa.me/989120000000?text=${encodeURIComponent(text)}`;
}

/** @param {import('../api/posStoreApi').PromoCampaign} campaign */
export function isPromoCampaignActive(campaign) {
    if (!campaign.isActive) return false;
    const now = Date.now();
    if (campaign.startDate && new Date(campaign.startDate).getTime() > now) return false;
    if (campaign.endDate && new Date(campaign.endDate).getTime() < now) return false;
    return true;
}
