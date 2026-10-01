export default function PromoOfferList({ campaigns }) {
    if (!campaigns?.length) return null;

    return (
        <div>
            <div className="offers-title">پیشنهادهای ویژه</div>
            {campaigns.map((campaign) => (
                <div key={campaign.id} className="offer-card">
                    <div className="offer-top">
                        {campaign.icon && (
                            <span className="offer-type-badge custom">{campaign.icon}</span>
                        )}
                    </div>
                    <strong>{campaign.title}</strong>
                    <div className="offer-body" style={{ whiteSpace: 'pre-line' }}>
                        {campaign.description}
                    </div>
                </div>
            ))}
        </div>
    );
}
