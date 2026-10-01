import { useState } from 'react';
import { toFa } from '../../utils/persianNumbers';

export default function DocsPreviewPanel({ open, fullDocs, minimalDocs }) {
    const [tab, setTab] = useState('full');

    return (
        <div className={`docs-preview${open ? ' open' : ''}`}>
            <div style={{ fontSize: '12px', fontWeight: 700 }}>
                قبل از خرید فقط برای اطلاع — نیازی به آماده‌کردن الان نیست
            </div>
            <div className="docs-preview-tabs">
                <button
                    type="button"
                    className={`docs-tab${tab === 'full' ? ' active' : ''}`}
                    onClick={() => setTab('full')}
                >
                    با پوز ({toFa(fullDocs.length)} مدرک)
                </button>
                <button
                    type="button"
                    className={`docs-tab${tab === 'minimal' ? ' active' : ''}`}
                    onClick={() => setTab('minimal')}
                >
                    بدون پوز ({toFa(minimalDocs.length)} مدرک)
                </button>
            </div>
            <div className="docs-preview-panel">
                <h5>{tab === 'full' ? 'مدارک لازم برای خرید با پوز' : 'مدارک لازم برای خرید بدون پوز'}</h5>
                <ul>
                    {(tab === 'full' ? fullDocs : minimalDocs).map((doc) => (
                        <li key={doc.key}>{doc.label}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
