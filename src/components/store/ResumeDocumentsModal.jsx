import { useEffect, useState } from 'react';
import { getDocumentsForPlan } from '../../data/storeMockData';
import { documentsToState } from '../../utils/storeOrders';
import { lookupOrder } from '../../api/posStoreApi';
import DocumentsBlock from './DocumentsBlock';

export default function ResumeDocumentsModal({ open, onClose, onToast }) {
    const [step, setStep] = useState(1);
    const [query, setQuery] = useState('');
    const [trackingCode, setTrackingCode] = useState('');
    const [documents, setDocuments] = useState([]);
    const [docState, setDocState] = useState({});

    useEffect(() => {
        if (!open) return;
        setStep(1);
        setQuery('');
        setTrackingCode('');
        setDocuments([]);
        setDocState({});
    }, [open]);

    async function findOrder() {
        if (!query.trim()) {
            onToast?.('شماره موبایل یا کد پیگیری را وارد کن');
            return;
        }

        try {
            const result = await lookupOrder(query.trim());
            if (!result) {
                onToast?.('سفارشی با این مشخصات پیدا نشد');
                return;
            }

            const docs = getDocumentsForPlan(result.planType).map((d) => ({
                documentKey: d.key,
                label: d.label,
            }));

            setTrackingCode(result.trackingCode);
            setDocuments(docs);
            setDocState(documentsToState(result.documents));
            setStep(2);
            onToast?.('سفارش پیدا شد ✓');
        } catch {
            onToast?.('خطا در جستجوی سفارش');
        }
    }

    return (
        <div className={`modal-overlay${open ? ' show' : ''}`}>
            <div className="modal-box">
                <div className="modal-head">
                    <h3>تکمیل مدارک</h3>
                    <button type="button" className="close-btn" onClick={onClose}>✕</button>
                </div>
                <div className="modal-body">
                    {step === 1 && (
                        <div className="step">
                            <div className="form-field">
                                <label>شماره موبایل یا کد پیگیری</label>
                                <input
                                    type="text"
                                    placeholder="۰۹xxxxxxxxx یا SNJ-123456"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                />
                            </div>
                            <button type="button" className="modal-cta" onClick={findOrder}>
                                پیدا کردن سفارش
                            </button>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="step">
                            <div className="doc-section-title">مدارک سفارش تو</div>
                            <div className="doc-section-sub">
                                هر کدوم که هنوز نفرستادی رو از این‌جا آپلود کن یا از واتساپ بفرست.
                            </div>
                            <DocumentsBlock
                                containerId="docsBlockResume"
                                documents={documents}
                                docState={docState}
                                trackingCode={trackingCode}
                                onDocStateChange={setDocState}
                                onToast={onToast}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
