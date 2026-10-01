import { useEffect, useState } from 'react';

export default function Toast({ message, toastKey, onHide }) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (!message) return undefined;

        setVisible(true);
        const timer = setTimeout(() => {
            setVisible(false);
            onHide?.();
        }, 2200);

        return () => clearTimeout(timer);
    }, [message, toastKey, onHide]);

    if (!message) return null;

    return (
        <div className={`toast${visible ? ' show' : ''}`}>
            {message}
        </div>
    );
}
