import { useEffect, useState } from 'react';
import Hero from '../../components/store/Hero';
import DocsPreviewPanel from '../../components/store/DocsPreviewPanel';
import { FEATURE_CARDS, getDocumentsForPlan } from '../../data/storeMockData';
import { CustomerShop } from '../../shared/management/CustomerAccess';
import { clearPaymentReturn } from './paymentReturn';
import '../../styles/store.css';

const apiBase = (import.meta.env.VITE_PUBLIC_API_URL || 'https://apiv2.sanjab.app').replace(/\/$/, '').replace(/\/api$/, '');

export default function StorePage() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState();
    const [purchaseOpen, setPurchaseOpen] = useState(() => new URLSearchParams(window.location.search).has('orderId'));
    const [docsOpen, setDocsOpen] = useState(false);
    const [showOrders, setShowOrders] = useState(false);

    function clearPreviousPayment() {
        window.history.replaceState(window.history.state, '', clearPaymentReturn(window.location.href));
    }

    useEffect(() => {
        const previousTitle = document.title;
        document.title = 'خرید دستگاه پوز سنجاب';
        const controller = new AbortController();
        fetch(`${apiBase}/api/shop/0/catalog`, { signal: controller.signal })
            .then(async response => {
                const data = await response.json();
                if (!response.ok || data.Code >= 400) throw new Error(data.Message || 'دریافت محصولات ناموفق بود.');
                setProducts((data.Data || data).items || []);
            })
            .catch(err => { if (!controller.signal.aborted) setError(err.message); })
            .finally(() => { if (!controller.signal.aborted) setLoading(false); });
        return () => { controller.abort(); document.title = previousTitle; };
    }, []);

    return (
        <div dir="rtl" lang="fa" className="store-root">
            <div className="cwrap">
                <a href="/" className="top-logo"><span className="dot" />سنجاب</a>
                <Hero />
                {products.length > 0 && <div className="price-block">
                    <div className="price-line"><span className="price-new">{Number(products[0].priceRials).toLocaleString('fa-IR')}</span><span className="price-unit">ریال</span></div>
                    <div className="price-note">{products[0].title}</div>
                </div>}
                {loading && <p role="status">در حال دریافت محصولات…</p>}
                {error && <p role="alert">{error}</p>}
                {!loading && !error && !products.length && <p>محصولی برای فروش موجود نیست.</p>}
                <div className="plans">
                    {products.map((product, index) => (
                        <div className={`plan-row${index === 0 ? ' featured' : ''}`} key={product.id}>
                            <div className="plan-row-text">
                                <strong>{product.title}</strong>
                                <span>{Number(product.priceRials).toLocaleString('fa-IR')} ریال {product.stock < 1 && ' — ناموجود'}</span>
                            </div>
                            <button type="button" className="plan-row-cta" disabled={product.stock < 1} onClick={() => { clearPreviousPayment(); setShowOrders(false); setSelectedProduct(product.id); setPurchaseOpen(true); }}>خرید</button>
                        </div>
                    ))}
                </div>
                <div className="link-row">
                    <button type="button" className="text-link" onClick={() => setDocsOpen(value => !value)}>مدارک موردنیاز</button>
                    <button type="button" className="text-link" onClick={() => { clearPreviousPayment(); setShowOrders(true); setSelectedProduct(undefined); setPurchaseOpen(true); }}>تکمیل مدارک سفارش قبلی</button>
                </div>
                <DocsPreviewPanel open={docsOpen} fullDocs={getDocumentsForPlan('full')} minimalDocs={getDocumentsForPlan('minimal')} />
                <div className="feats-mini">
                    {FEATURE_CARDS.map(feat => <div key={feat.label} className="feat-mini-card"><div className="ic">{feat.icon}</div><span>{feat.label}</span></div>)}
                </div>
            </div>
            <footer className="store-footer">© سنجاب — فروشگاه پوز</footer>
            {purchaseOpen && <div className="modal-overlay show" role="dialog" aria-modal="true" aria-labelledby="purchase-title">
                <div className="modal-box">
                    <div className="modal-head"><h3 id="purchase-title">{showOrders ? 'تکمیل مدارک سفارش' : 'خرید از فروشگاه سنجاب'}</h3><button type="button" className="close-btn" aria-label="بستن" onClick={() => { clearPreviousPayment(); setPurchaseOpen(false); setSelectedProduct(undefined); }}>✕</button></div>
                    <div className="modal-body"><CustomerShop baseUrl={apiBase} scopeId={0} productId={selectedProduct} showOrders={showOrders} /></div>
                </div>
            </div>}
        </div>
    );
}
