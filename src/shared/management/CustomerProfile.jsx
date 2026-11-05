import { useState } from 'react';
import PropTypes from 'prop-types';
import { PROVINCES } from './provinces';
import { joinProfileAddress, splitProfileAddress } from './profileAddress';

export default function CustomerProfile({ api, scopeId, profile, onComplete, onCancel }) {
    const [form, setForm] = useState({ firstName: profile.firstName || '', lastName: profile.lastName || '', job: profile.job || '', ...splitProfileAddress(profile.address || '') });
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState('');
    function field(key, value) { setForm(current => ({ ...current, [key]: value })); }
    async function submit(event) {
        event.preventDefault(); setBusy(true); setError('');
        try {
            const address = joinProfileAddress(form);
            const saved = await api.updateMe(scopeId, { firstName: form.firstName.trim(), lastName: form.lastName.trim(), job: form.job.trim(), address });
            onComplete(saved);
        } catch (err) { setError(err.message); } finally { setBusy(false); }
    }
    return <form className="store-login sf-customer-profile" dir="rtl" onSubmit={submit}>
        <div className="store-login-heading"><h2>{onCancel ? 'ویرایش پروفایل' : 'تکمیل اطلاعات خریدار'}</h2><p>اطلاعات لازم برای ثبت سفارش را وارد کنید.</p></div>
        {error && <p role="alert" className="store-login-error">{error}</p>}
        <div className="form-row2">
            <label className="form-field"><span>نام</span><input required maxLength={100} autoComplete="given-name" value={form.firstName} onChange={event => field('firstName', event.target.value)} /></label>
            <label className="form-field"><span>نام خانوادگی</span><input required maxLength={100} autoComplete="family-name" value={form.lastName} onChange={event => field('lastName', event.target.value)} /></label>
        </div>
        <label className="form-field"><span>شغل / نوع کسب‌وکار</span><input required maxLength={200} value={form.job} onChange={event => field('job', event.target.value)} /></label>
        <label className="form-field"><span>شماره موبایل</span><input dir="ltr" value={profile.phoneNumber || ''} disabled /></label>
        <div className="form-row2">
            <label className="form-field"><span>استان</span><select required value={form.province} onChange={event => field('province', event.target.value)}><option value="">انتخاب کنید</option>{PROVINCES.map(province => <option key={province}>{province}</option>)}</select></label>
            <label className="form-field"><span>شهر</span><input required maxLength={100} value={form.city} onChange={event => field('city', event.target.value)} /></label>
        </div>
        <label className="form-field"><span>آدرس کامل</span><input required maxLength={2000 - form.province.length - form.city.trim().length - 4} autoComplete="street-address" value={form.address} onChange={event => field('address', event.target.value)} /></label>
        <button className="modal-cta" disabled={busy}>{busy ? 'در حال ذخیره…' : onCancel ? 'ذخیره تغییرات' : 'تأیید و ادامه خرید'}</button>
        {onCancel && <button type="button" className="store-login-change" disabled={busy} onClick={onCancel}>بازگشت</button>}
    </form>;
}
CustomerProfile.propTypes = { api: PropTypes.object.isRequired, scopeId: PropTypes.number.isRequired, profile: PropTypes.object.isRequired, onComplete: PropTypes.func.isRequired, onCancel: PropTypes.func };
