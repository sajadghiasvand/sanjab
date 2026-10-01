export default function PlanSelector({ onSelectPlan }) {
    return (
        <div className="plans">
            <div className="plan-row featured">
                <div className="plan-row-text">
                    <strong>خرید با دستگاه پوز</strong>
                    <span>دستگاه + نصب + آموزش</span>
                </div>
                <button type="button" className="plan-row-cta" onClick={() => onSelectPlan('full')}>
                    خرید
                </button>
            </div>
            <div className="plan-row">
                <div className="plan-row-text">
                    <strong>خرید بدون دستگاه پوز</strong>
                    <span>فقط پنل و ثبت دیتا</span>
                </div>
                <button type="button" className="plan-row-cta" onClick={() => onSelectPlan('minimal')}>
                    خرید
                </button>
            </div>
        </div>
    );
}
