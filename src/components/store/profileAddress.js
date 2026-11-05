import { PROVINCES } from '../../data/storeMockData.js';

export function splitProfileAddress(value = '') {
    const parts = value.split('،');
    const province = parts[0]?.trim();
    if (parts.length < 3 || !PROVINCES.includes(province) || !parts[1].trim() || !parts.slice(2).join('،').trim()) {
        return { province: '', city: '', address: value };
    }
    return { province, city: parts[1].trim(), address: parts.slice(2).join('،').trim() };
}

export function joinProfileAddress({ province, city, address }) {
    return `${province}، ${city.trim()}، ${address.trim()}`;
}
