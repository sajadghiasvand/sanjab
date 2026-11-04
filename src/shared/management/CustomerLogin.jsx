import { useState } from "react";
import PropTypes from "prop-types";

export function CustomerLogin({ api, scopeId, onLogin }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [resendAt, setResendAt] = useState(0);
  const [lastPhone, setLastPhone] = useState("");

  async function submit(event) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      if (sent) onLogin(await api.checkOtp(scopeId, { phoneNumber, code, name }));
      else {
        if (phoneNumber === lastPhone && Date.now() < resendAt) throw new Error("برای ارسال مجدد کد کمی صبر کنید.");
        const result = await api.sendOtp(scopeId, phoneNumber);
        setSent(true);
        setLastPhone(phoneNumber);
        setResendAt(Date.now() + result.resendAfterSeconds * 1000);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="store-login" dir="rtl" onSubmit={submit}>
      <div className="store-login-heading">
        <h2>{sent ? "کد تأیید را وارد کنید" : "ورود یا ثبت‌نام برای خرید"}</h2>
        <p>{sent ? `کد پیامک‌شده به ${phoneNumber} را وارد کنید.` : "شماره همراه خود را وارد کنید تا کد تأیید برایتان ارسال شود."}</p>
      </div>
      {error && <p className="store-login-error" role="alert">{error}</p>}
      {!sent ? (
        <label className="form-field">
          <span>شماره همراه</span>
          <input type="tel" dir="ltr" autoComplete="tel" inputMode="tel" maxLength={20} placeholder="09123456789" value={phoneNumber} disabled={busy} onChange={event => setPhoneNumber(event.target.value.replace(/[۰-۹]/g, digit => "۰۱۲۳۴۵۶۷۸۹".indexOf(digit)).replace(/[٠-٩]/g, digit => "٠١٢٣٤٥٦٧٨٩".indexOf(digit)))} required />
        </label>
      ) : (
        <>
          <label className="form-field">
            <span>کد تأیید</span>
            <input dir="ltr" autoComplete="one-time-code" inputMode="numeric" maxLength={6} placeholder="کد پیامک‌شده" value={code} disabled={busy} onChange={event => setCode(event.target.value.replace(/[۰-۹]/g, digit => "۰۱۲۳۴۵۶۷۸۹".indexOf(digit)).replace(/[٠-٩]/g, digit => "٠١٢٣٤٥٦٧٨٩".indexOf(digit)).replace(/\D/g, ""))} required />
          </label>
          <label className="form-field">
            <span>نام <small>(اختیاری)</small></span>
            <input autoComplete="name" maxLength={200} placeholder="نام و نام خانوادگی" value={name} disabled={busy} onChange={event => setName(event.target.value)} />
          </label>
        </>
      )}
      <button className="modal-cta" disabled={busy}>{busy ? "در حال بررسی…" : sent ? "تأیید و ادامه خرید" : "دریافت کد تأیید"}</button>
      {sent && <button className="store-login-change" type="button" disabled={busy} onClick={() => { setSent(false); setCode(""); setError(""); }}>تغییر شماره / ارسال مجدد کد</button>}
    </form>
  );
}
CustomerLogin.propTypes = { api: PropTypes.object.isRequired, scopeId: PropTypes.number.isRequired, onLogin: PropTypes.func.isRequired };
