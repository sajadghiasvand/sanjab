const FA_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

export function toFa(n) {
    return String(n).split('').map((c) => FA_DIGITS[c] ?? c).join('');
}

export function formatToman(n) {
    return toFa(Math.round(n).toLocaleString('en-US'));
}
