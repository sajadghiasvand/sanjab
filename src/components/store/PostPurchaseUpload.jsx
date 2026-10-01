import DocumentsBlock from './DocumentsBlock';

export default function PostPurchaseUpload({
    trackingCode,
    planType,
    documents,
    docState,
    onDocStateChange,
    onToast,
    onLater,
}) {
    const docSubtitle = planType === 'minimal'
        ? 'برای این خرید فقط ۲ مدرک لازمه.'
        : 'برای این خرید ۶ مدرک لازمه.';

    return (
        <div>
            <div className="success-box">
                <div className="success-icon">✓</div>
                <h4>پرداخت با موفقیت انجام شد</h4>
                <p>
                    کد پیگیری رو نگه دار. اگه مدارک آماده نیست، بعداً از همین سایت با شماره موبایلت برمی‌گردی و ادامه می‌دی.
                </p>
                <div className="tracking-code">{trackingCode}</div>
            </div>
            <div className="doc-section-title">آپلود مدارک</div>
            <div className="doc-section-sub">{docSubtitle}</div>
            <DocumentsBlock
                containerId="docsBlockMain"
                documents={documents}
                docState={docState}
                trackingCode={trackingCode}
                onDocStateChange={onDocStateChange}
                onToast={onToast}
            />
            {onLater && (
                <button type="button" className="modal-cta dark" onClick={onLater}>
                    بعداً ادامه می‌دم
                </button>
            )}
        </div>
    );
}
