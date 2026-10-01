import { getDocumentsForPlan, discountedPrice, PRICING_CAMPAIGN } from '../data/storeMockData';

const STORAGE_KEY = 'sanjab_pos_store_orders';

function loadOrders() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : {};
    } catch {
        return {};
    }
}

function saveOrders(orders) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
}

function uuid() {
    return crypto.randomUUID?.() || `id-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function initDocuments(orderId, planType) {
    const docs = getDocumentsForPlan(planType);
    return docs.map((doc) => ({
        id: uuid(),
        orderId,
        documentKey: doc.key,
        fileUrl: null,
        status: 'pending',
        rejectionReason: null,
        uploadedAt: null,
    }));
}

export function generateTrackingCode() {
    return `SNJ-${Math.floor(100000 + Math.random() * 899999)}`;
}

/** @param {object} payload @param {string} trackingCode */
export function createOrderLocal(payload, trackingCode) {
    const code = trackingCode.trim().toUpperCase();
    const orderId = uuid();
    const now = new Date().toISOString();
    const amountPaid = payload.amountToPay ?? discountedPrice(PRICING_CAMPAIGN);

    const order = {
        id: orderId,
        trackingCode: code,
        planType: payload.planType,
        buyerFirstName: payload.buyerFirstName,
        buyerLastName: payload.buyerLastName,
        buyerJob: payload.buyerJob,
        buyerMobile: payload.buyerMobile,
        province: payload.province,
        city: payload.city,
        address: payload.address,
        amountPaid,
        paymentStatus: 'paid',
        paymentGatewayRef: `MOCK-${Date.now()}`,
        createdAt: now,
        updatedAt: now,
        documents: initDocuments(orderId, payload.planType),
    };

    const orders = loadOrders();
    orders[code] = order;
    saveOrders(orders);
    return order;
}

/** Lookup by mobile OR tracking code (spec §4) */
export function lookupOrderByQuery(query) {
    const q = query.trim();
    if (!q) return null;

    const orders = loadOrders();
    const byCode = orders[q.toUpperCase()];
    if (byCode) return byCode;

    return Object.values(orders).find((o) => o.buyerMobile === q) ?? null;
}

export function getOrder(trackingCode) {
    const orders = loadOrders();
    return orders[trackingCode.trim().toUpperCase()] ?? null;
}

export function updateDocumentLocal(trackingCode, documentKey, status, meta = {}) {
    const orders = loadOrders();
    const code = trackingCode.trim().toUpperCase();
    const order = orders[code];
    if (!order) return null;

    order.documents = order.documents.map((doc) => {
        if (doc.documentKey !== documentKey) return doc;
        return {
            ...doc,
            status,
            fileUrl: meta.fileName ? `local://${meta.fileName}` : doc.fileUrl,
            uploadedAt: status === 'uploaded' ? new Date().toISOString() : doc.uploadedAt,
            rejectionReason: status === 'rejected' ? meta.rejectionReason ?? null : null,
        };
    });
    order.updatedAt = new Date().toISOString();
    orders[code] = order;
    saveOrders(orders);
    return order;
}

export function documentsToState(documents) {
    const state = {};
    documents.forEach((doc) => {
        state[doc.documentKey] = doc.status === 'rejected' ? 'error' : doc.status;
    });
    return state;
}

export function validateMobile(mobile) {
    return /^09\d{9}$/.test(mobile);
}

export function validateFile(file) {
    const okTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!okTypes.includes(file.type)) {
        return { valid: false, error: 'فرمت فایل پشتیبانی نمی‌شود' };
    }
    if (file.size > 5 * 1024 * 1024) {
        return { valid: false, error: 'حجم فایل بیش از ۵ مگابایت است' };
    }
    return { valid: true };
}
