import {
    PRICING_CAMPAIGN,
    PROMO_CAMPAIGNS,
    REQUIRED_DOCUMENTS,
    discountedPrice,
    getDocumentsForPlan,
    isPromoCampaignActive,
} from '../data/storeMockData';
import {
    createOrderLocal,
    lookupOrderByQuery,
    updateDocumentLocal,
    generateTrackingCode,
} from '../utils/storeOrders';

const API_BASE = (import.meta.env.VITE_POS_STORE_API_URL || '').replace(/\/$/, '');

async function request(path, options = {}) {
    if (!API_BASE) return null;
    const res = await fetch(`${API_BASE}${path}`, {
        ...options,
        headers: {
            ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
            ...options.headers,
        },
    });
    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || `API error ${res.status}`);
    }
    if (res.status === 204) return null;
    return res.json();
}

/** @returns {Promise<PricingCampaign>} */
export async function getPricing() {
    const data = await request('/api/pricing');
    if (data) return data;
    return PRICING_CAMPAIGN;
}

/** @returns {Promise<PromoCampaign[]>} */
export async function getPromoCampaigns() {
    const data = await request('/api/promo-campaigns');
    if (data) return data;
    return PROMO_CAMPAIGNS.filter(isPromoCampaignActive);
}

/**
 * @param {'full' | 'minimal'} plan
 * @returns {Promise<RequiredDocument[]>}
 */
export async function getRequiredDocuments(plan) {
    const data = await request(`/api/required-documents?plan=${plan}`);
    if (data) return data;
    return getDocumentsForPlan(plan);
}

/**
 * @param {object} payload
 * @returns {Promise<{ orderId: string, trackingCode: string, amountToPay: number }>}
 */
export async function createOrder(payload) {
    const data = await request('/api/orders', {
        method: 'POST',
        body: JSON.stringify(payload),
    });
    if (data) return data;

    const trackingCode = generateTrackingCode();
    const order = createOrderLocal(payload, trackingCode);
    return {
        orderId: order.id,
        trackingCode: order.trackingCode,
        amountToPay: order.amountPaid,
    };
}

/** @param {string} orderId @returns {Promise<{ redirectUrl: string }>} */
export async function initiatePayment(orderId) {
    const data = await request('/api/payments/initiate', {
        method: 'POST',
        body: JSON.stringify({ orderId }),
    });
    if (data) return data;
    return { redirectUrl: null };
}

/**
 * @param {string} query
 * @returns {Promise<{ trackingCode: string, planType: string, documents: OrderDocument[] } | null>}
 */
export async function lookupOrder(query) {
    const data = await request(`/api/orders/lookup?query=${encodeURIComponent(query)}`);
    if (data) return data;

    const order = lookupOrderByQuery(query);
    if (!order) return null;

    return {
        trackingCode: order.trackingCode,
        planType: order.planType,
        documents: order.documents,
    };
}

/**
 * @param {string} trackingCode
 * @param {string} documentKey
 * @param {File} file
 */
export async function uploadDocument(trackingCode, documentKey, file) {
    if (API_BASE) {
        const body = new FormData();
        body.append('file', file);
        return request(`/api/orders/${trackingCode}/documents/${documentKey}`, {
            method: 'POST',
            body,
        });
    }

    await new Promise((r) => setTimeout(r, 300));
    updateDocumentLocal(trackingCode, documentKey, 'uploaded', {
        fileName: file.name,
        fileSize: file.size,
    });
    return { success: true };
}

export function getMockAmountToPay(pricing = PRICING_CAMPAIGN) {
    return discountedPrice(pricing);
}

/**
 * @typedef {object} PricingCampaign
 * @property {string} id
 * @property {number} basePrice
 * @property {number} discountPercent
 * @property {string} discountEndsAt
 * @property {boolean} isActive
 * @property {string} updatedAt
 */

/**
 * @typedef {object} RequiredDocument
 * @property {string} id
 * @property {string} key
 * @property {string} label
 * @property {'full' | 'minimal' | 'both'} appliesToPlan
 */

/**
 * @typedef {object} PromoCampaign
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {string | null} icon
 * @property {string | null} startDate
 * @property {string | null} endDate
 * @property {boolean} isActive
 * @property {string} createdAt
 */

/**
 * @typedef {object} OrderDocument
 * @property {string} id
 * @property {string} orderId
 * @property {string} documentKey
 * @property {string | null} fileUrl
 * @property {'pending' | 'uploaded' | 'rejected'} status
 * @property {string | null} rejectionReason
 * @property {string | null} uploadedAt
 */
