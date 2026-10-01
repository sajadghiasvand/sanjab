import { useMemo, useState } from 'react';
import { toFa } from '../../utils/persianNumbers';
import { buildWhatsAppLink } from '../../data/storeMockData';
import { validateFile } from '../../utils/storeOrders';
import { uploadDocument } from '../../api/posStoreApi';

const CIRCUMFERENCE = 157;
const STATUS_LABELS = {
    pending: 'در انتظار',
    uploaded: 'آپلود شد',
    rejected: 'خطا',
    error: 'خطا',
};

export default function DocumentsBlock({
    containerId,
    documents,
    docState,
    trackingCode,
    onDocStateChange,
    onToast,
}) {
    const [errors, setErrors] = useState({});
    const [uploading, setUploading] = useState(null);

    const done = documents.filter((d) => docState[d.documentKey] === 'uploaded').length;
    const total = documents.length;
    const pct = total ? Math.round((done / total) * 100) : 0;
    const strokeOffset = CIRCUMFERENCE - (CIRCUMFERENCE * pct) / 100;

    const waLink = useMemo(
        () => (trackingCode ? buildWhatsAppLink(trackingCode) : '#'),
        [trackingCode],
    );

    async function handleUpload(documentKey, file) {
        const validation = validateFile(file);
        if (!validation.valid) {
            const nextState = { ...docState, [documentKey]: 'error' };
            setErrors((prev) => ({ ...prev, [documentKey]: validation.error }));
            onDocStateChange(nextState);
            return;
        }

        setUploading(documentKey);
        try {
            await uploadDocument(trackingCode, documentKey, file);
            const nextState = { ...docState, [documentKey]: 'uploaded' };
            setErrors((prev) => {
                const next = { ...prev };
                delete next[documentKey];
                return next;
            });
            onDocStateChange(nextState);
            onToast?.('مدرک آپلود شد ✓');
        } catch {
            const nextState = { ...docState, [documentKey]: 'error' };
            setErrors((prev) => ({ ...prev, [documentKey]: 'خطا در آپلود فایل' }));
            onDocStateChange(nextState);
        } finally {
            setUploading(null);
        }
    }

    return (
        <div>
            <div className="readiness">
                <div className="ring-wrap">
                    <svg width="60" height="60" viewBox="0 0 60 60">
                        <circle className="ring-bg" cx="30" cy="30" r="25" />
                        <circle
                            className="ring-fg"
                            cx="30"
                            cy="30"
                            r="25"
                            strokeDasharray={CIRCUMFERENCE}
                            strokeDashoffset={strokeOffset}
                        />
                    </svg>
                    <div className="ring-txt">{toFa(pct)}٪</div>
                </div>
                <div className="readiness-info">
                    <strong>{toFa(done)} از {toFa(total)} مدرک</strong>
                    <span>هر مدرک رو جدا آپلود کن</span>
                </div>
            </div>

            <a className="wa-btn" href={waLink} target="_blank" rel="noreferrer">
                💬 ارسال مدارک از طریق واتساپ
            </a>

            <div>
                {documents.map((doc) => {
                    const st = docState[doc.documentKey] || 'pending';
                    const label = STATUS_LABELS[st] || st;

                    return (
                        <div key={doc.documentKey} className="doc-item">
                            <div className="doc-item-top">
                                <div className="doc-item-name">
                                    <div className={`doc-check${st === 'uploaded' ? ' done' : ''}`}>
                                        {st === 'uploaded' ? '✓' : ''}
                                    </div>
                                    {doc.label}
                                </div>
                                <div className={`doc-status ${st === 'rejected' ? 'error' : st}`}>
                                    {label}
                                </div>
                            </div>
                            <div className="doc-actions">
                                <label>
                                    {uploading === doc.documentKey ? 'در حال آپلود...' : 'انتخاب فایل'}
                                    <input
                                        type="file"
                                        style={{ display: 'none' }}
                                        accept=".jpg,.jpeg,.png,.pdf"
                                        disabled={uploading === doc.documentKey}
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) handleUpload(doc.documentKey, file);
                                            e.target.value = '';
                                        }}
                                    />
                                </label>
                            </div>
                            {(st === 'error' || st === 'rejected') && errors[doc.documentKey] && (
                                <div className="doc-err-msg" id={`err-${containerId}-${doc.documentKey}`}>
                                    {errors[doc.documentKey]}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
