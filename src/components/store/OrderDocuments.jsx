import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export default function OrderDocuments({ api, scopeId, orderId }) {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [busy, setBusy] = useState('');
    const [error, setError] = useState('');
    const [revision, setRevision] = useState(0);
    useEffect(() => {
        const controller = new AbortController();
        api.documents(scopeId, orderId, controller.signal)
            .then(data => { if (!controller.signal.aborted) setDocuments(data); })
            .catch(err => { if (!controller.signal.aborted) setError(err.message); })
            .finally(() => { if (!controller.signal.aborted) setLoading(false); });
        return () => controller.abort();
    }, [api, scopeId, orderId, revision]);
    async function upload(key, file) {
        if (!file) return;
        if (file.size > 5 * 1024 * 1024 || !file.size) { setError('حجم فایل باید کمتر از ۵ مگابایت باشد.'); return; }
        setBusy(key); setError('');
        try { await api.uploadDocument(scopeId, orderId, key, file); setRevision(value => value + 1); }
        catch (err) { setError(err.message); }
        finally { setBusy(''); }
    }
    if (loading) return <p role="status">در حال دریافت مدارک…</p>;
    const done = documents.filter(doc => doc.uploaded).length;
    const percent = documents.length ? Math.round(done * 100 / documents.length) : 0;
    return <section className="store-order-documents" aria-label="مدارک سفارش">
        <h3>آپلود مدارک</h3>
        <p>مدارک را جداگانه ارسال کنید. فرمت PDF، JPG یا PNG و حداکثر حجم هر فایل ۵ مگابایت است.</p>
        {documents.length > 0 && <div className="readiness"><div className="ring-wrap"><svg width="60" height="60" viewBox="0 0 60 60" aria-hidden="true"><circle className="ring-bg" cx="30" cy="30" r="25" /><circle className="ring-fg" cx="30" cy="30" r="25" strokeDasharray="157" strokeDashoffset={157 - 157 * percent / 100} /></svg><div className="ring-txt">{percent.toLocaleString('fa-IR')}٪</div></div><div className="readiness-info"><strong>{done.toLocaleString('fa-IR')} از {documents.length.toLocaleString('fa-IR')} مدرک</strong><span>هر مدرک را جداگانه بارگذاری کنید</span></div></div>}
        {error && <p role="alert" className="sm-error">{error}</p>}
        {!documents.length && !error && <p>برای این سفارش مدرکی لازم نیست.</p>}
        {documents.map(doc => <div className="store-order-document" key={doc.key}>
            <div><strong>{doc.label}</strong><span>{doc.uploaded ? 'ارسال شده' : 'ارسال نشده'}</span></div>
            <label className="store-document-upload">{busy === doc.key ? 'در حال ارسال…' : doc.uploaded ? 'تغییر فایل' : 'انتخاب فایل'}
                <input type="file" accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png" disabled={Boolean(busy)} onChange={event => { upload(doc.key, event.target.files?.[0]); event.target.value = ''; }} />
            </label>
        </div>)}
    </section>;
}
OrderDocuments.propTypes = { api: PropTypes.object.isRequired, scopeId: PropTypes.number.isRequired, orderId: PropTypes.number.isRequired };
