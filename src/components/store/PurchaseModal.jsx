import { useEffect, useState } from 'react';
import { formatToman } from '../../utils/persianNumbers';
import { PROVINCES, getDocumentsForPlan } from '../../data/storeMockData';
import { validateMobile, getOrder, documentsToState } from '../../utils/storeOrders';
import { createOrder, initiatePayment, getMockAmountToPay } from '../../api/posStoreApi';
import PostPurchaseUpload from './PostPurchaseUpload';

const EMPTY_FORM = {
    firstName: '',
    lastName: '',
    job: '',
    mobile: '',
    province: '',
    city: '',
    address: '',
};

export default function PurchaseModal({
    open,
    planType,
    pricing,
    onClose,
    onToast,
}) {
    const [step, setStep] = useState(1);
    const [form, setForm] = useState(EMPTY_FORM);
    const [mobileInvalid, setMobileInvalid] = useState(false);
    const [attemptedSubmit, setAttemptedSubmit] = useState(false);
    const [trackingCode, setTrackingCode] = useState('');
    const [documents, setDocuments] = useState([]);
    const [docState, setDocState] = useState({});

    useEffect(() => {
        if (!open) return;
        setStep(1);
        setForm(EMPTY_FORM);
        setMobileInvalid(false);
        setAttemptedSubmit(false);
        setTrackingCode('');
        const docs = getDocumentsForPlan(planType).map((d) => ({
            documentKey: d.key,
            label: d.label,
        }));
        setDocuments(docs);
        const initial = {};
        docs.forEach((d) => { initial[d.documentKey] = 'pending'; });
        setDocState(initial);
    }, [open, planType]);

    useEffect(() => {
        if (!open || step !== 2) return undefined;

        let cancelled = false;

        async function processPayment() {
            try {
                const amountToPay = getMockAmountToPay(pricing);
                const orderResult = await createOrder({
                    planType,
                    buyerFirstName: form.firstName,
                    buyerLastName: form.lastName,
                    buyerJob: form.job,
                    buyerMobile: form.mobile,
                    province: form.province,
                    city: form.city,
                    address: form.address,
                    amountToPay,
                });

                await initiatePayment(orderResult.orderId);
                await new Promise((r) => setTimeout(r, 1200));

                if (cancelled) return;

                setTrackingCode(orderResult.trackingCode);

                const saved = getOrder(orderResult.trackingCode);
                const docs = getDocumentsForPlan(planType).map((d) => ({
                    documentKey: d.key,
                    label: d.label,
                }));
                setDocuments(docs);
                if (saved?.documents) {
                    setDocState(documentsToState(saved.documents));
                }
                setStep(3);
            } catch {
                if (!cancelled) onToast?.('خطا در اتصال به درگاه پرداخت');
                if (!cancelled) setStep(1);
            }
        }

        processPayment();
        return () => { cancelled = true; };
    }, [open, step, form, planType, pricing, onToast]);

    const modalTitle = planType === 'minimal' ? 'خرید بدون دستگاه پوز' : 'خرید با دستگاه پوز';

    function updateField(field, value) {
        setForm((prev) => ({ ...prev, [field]: value }));
        if (field === 'mobile') setMobileInvalid(false);
    }

    function fieldError(key) {
        if (!attemptedSubmit) return undefined;
        return !form[key]?.trim() ? 'var(--red)' : '';
    }

    function validateForm() {
        let ok = true;
        ['firstName', 'lastName', 'job', 'province', 'city', 'address'].forEach((key) => {
            if (!form[key].trim()) ok = false;
        });
        if (!validateMobile(form.mobile)) {
            setMobileInvalid(true);
            ok = false;
        }
        if (!ok) onToast?.('لطفاً فیلدهای مشخص‌شده رو تکمیل کن');
        return ok;
    }

    function handlePay() {
        setAttemptedSubmit(true);
        if (!validateForm()) return;
        setStep(2);
    }

    return (
        <div className={`modal-overlay${open ? ' show' : ''}`}>
            <div className="modal-box">
                <div className="modal-head">
                    <h3>{modalTitle}</h3>
                    <button type="button" className="close-btn" onClick={onClose}>✕</button>
                </div>
                <div className="modal-body">
                    {step < 3 && (
                        <div className="dots">
                            <span className={step === 1 ? 'on' : ''} />
                            <span className={step === 2 ? 'on' : ''} />
                        </div>
                    )}

                    {step === 1 && (
                        <div className="step">
                            <div className="form-row2">
                                <div className="form-field">
                                    <label>نام</label>
                                    <input
                                        type="text"
                                        placeholder="مثلاً علی"
                                        value={form.firstName}
                                        onChange={(e) => updateField('firstName', e.target.value)}
                                        style={{ borderColor: fieldError('firstName') || undefined }}
                                    />
                                </div>
                                <div className="form-field">
                                    <label>نام خانوادگی</label>
                                    <input
                                        type="text"
                                        placeholder="مثلاً رضایی"
                                        value={form.lastName}
                                        onChange={(e) => updateField('lastName', e.target.value)}
                                        style={{ borderColor: fieldError('lastName') || undefined }}
                                    />
                                </div>
                            </div>
                            <div className="form-field">
                                <label>شغل / نوع کسب‌وکار</label>
                                <input
                                    type="text"
                                    placeholder="مثلاً کافه"
                                    value={form.job}
                                    onChange={(e) => updateField('job', e.target.value)}
                                    style={{ borderColor: fieldError('job') || undefined }}
                                />
                            </div>
                            <div className={`form-field${mobileInvalid ? ' invalid' : ''}`}>
                                <label>شماره موبایل</label>
                                <input
                                    type="text"
                                    placeholder="۰۹xxxxxxxxx"
                                    maxLength={11}
                                    inputMode="numeric"
                                    value={form.mobile}
                                    onChange={(e) => updateField('mobile', e.target.value)}
                                />
                                <div className="field-err">شماره موبایل معتبر نیست</div>
                            </div>
                            <div className="form-row2">
                                <div className="form-field">
                                    <label>استان</label>
                                    <select
                                        value={form.province}
                                        onChange={(e) => updateField('province', e.target.value)}
                                        style={{ borderColor: fieldError('province') || undefined }}
                                    >
                                        <option value="">انتخاب کنید</option>
                                        {PROVINCES.map((p) => (
                                            <option key={p} value={p}>{p}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-field">
                                    <label>شهر</label>
                                    <input
                                        type="text"
                                        placeholder="مثلاً قزوین"
                                        value={form.city}
                                        onChange={(e) => updateField('city', e.target.value)}
                                        style={{ borderColor: fieldError('city') || undefined }}
                                    />
                                </div>
                            </div>
                            <div className="form-field">
                                <label>آدرس کامل</label>
                                <input
                                    type="text"
                                    placeholder="خیابان، کوچه، پلاک، واحد"
                                    value={form.address}
                                    onChange={(e) => updateField('address', e.target.value)}
                                    style={{ borderColor: fieldError('address') || undefined }}
                                />
                            </div>
                            <button type="button" className="modal-cta" onClick={handlePay}>
                                پرداخت
                            </button>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="step pay-loading">
                            <div className="spinner" />
                            <div style={{ fontSize: '13px', fontWeight: 700 }}>
                                در حال اتصال به درگاه پرداخت...
                            </div>
                            <div style={{ fontSize: '12px', color: 'var(--ink-soft)', marginTop: '6px' }}>
                                مبلغ {formatToman(getMockAmountToPay(pricing))} تومان
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="step">
                            <PostPurchaseUpload
                                trackingCode={trackingCode}
                                planType={planType}
                                documents={documents}
                                docState={docState}
                                onDocStateChange={setDocState}
                                onToast={onToast}
                                onLater={onClose}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
