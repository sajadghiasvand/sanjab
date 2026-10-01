import { useEffect, useState } from 'react';
import '../../styles/store.css';
import Hero from '../../components/store/Hero';
import PriceCard from '../../components/store/PriceCard';
import PromoOfferList from '../../components/store/PromoOfferList';
import PlanSelector from '../../components/store/PlanSelector';
import DocsPreviewPanel from '../../components/store/DocsPreviewPanel';
import PurchaseModal from '../../components/store/PurchaseModal';
import ResumeDocumentsModal from '../../components/store/ResumeDocumentsModal';
import Toast from '../../components/store/Toast';
import { FEATURE_CARDS, getDocumentsForPlan } from '../../data/storeMockData';
import { getPricing, getPromoCampaigns } from '../../api/posStoreApi';

export default function StorePage() {
    const [pricing, setPricing] = useState(null);
    const [promoCampaigns, setPromoCampaigns] = useState([]);
    const [docsOpen, setDocsOpen] = useState(false);
    const [purchaseOpen, setPurchaseOpen] = useState(false);
    const [resumeOpen, setResumeOpen] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState('full');
    const [toastMessage, setToastMessage] = useState('');
    const [toastKey, setToastKey] = useState(0);

    const fullDocs = getDocumentsForPlan('full');
    const minimalDocs = getDocumentsForPlan('minimal');

    useEffect(() => {
        const prev = document.title;
        document.title = 'خرید دستگاه پوز سنجاب';
        return () => { document.title = prev; };
    }, []);

    useEffect(() => {
        getPricing().then(setPricing).catch(() => {});
        getPromoCampaigns().then(setPromoCampaigns).catch(() => {});
    }, []);

    function openPurchase(plan) {
        setSelectedPlan(plan);
        setPurchaseOpen(true);
    }

    function showToast(msg) {
        setToastMessage(msg);
        setToastKey((k) => k + 1);
    }

    return (
        <div dir="rtl" lang="fa" className="store-root">
            <div className="cwrap">
                <div className="top-logo">
                    <span className="dot" />
                    سنجاب
                </div>

                <Hero />

                {pricing && <PriceCard pricing={pricing} />}

                <PromoOfferList campaigns={promoCampaigns} />

                <PlanSelector onSelectPlan={openPurchase} />

                <div className="link-row">
                    <button type="button" className="text-link" onClick={() => setDocsOpen((v) => !v)}>
                        📄 چه مدارکی لازمه؟
                    </button>
                    <button type="button" className="text-link" onClick={() => setResumeOpen(true)}>
                        ↩️ قبلاً خرید کردی؟ تکمیل مدارک
                    </button>
                </div>

                <DocsPreviewPanel
                    open={docsOpen}
                    fullDocs={fullDocs}
                    minimalDocs={minimalDocs}
                />

                <div className="feats-mini">
                    {FEATURE_CARDS.map((feat) => (
                        <div key={feat.label} className="feat-mini-card">
                            <div className="ic">{feat.icon}</div>
                            <span>{feat.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            <footer className="store-footer">© سنجاب — فروشگاه پوز</footer>

            {pricing && (
                <PurchaseModal
                    open={purchaseOpen}
                    planType={selectedPlan}
                    pricing={pricing}
                    onClose={() => setPurchaseOpen(false)}
                    onToast={showToast}
                />
            )}

            <ResumeDocumentsModal
                open={resumeOpen}
                onClose={() => setResumeOpen(false)}
                onToast={showToast}
            />

            <Toast message={toastMessage} toastKey={toastKey} onHide={() => setToastMessage('')} />
        </div>
    );
}
