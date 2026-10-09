import { useState } from "react";
import PropTypes from "prop-types";
import "./management.css";
export function CustomerLogin({ api, scopeId, onLogin }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [resendAt, setResendAt] = useState(0);
  async function submit(event) {
    event.preventDefault(); setBusy(true); setError("");
    try {
      if (sent) onLogin(await api.checkOtp(scopeId, { phoneNumber, code, name }));
      else { const result = await api.sendOtp(scopeId, phoneNumber); setSent(true); setResendAt(Date.now() + result.resendAfterSeconds * 1000); }
    } catch (err) { setError(err.message); } finally { setBusy(false); }
  }
  return <form className="sm-management" dir="rtl" onSubmit={submit}><h2>ورود مشتری</h2>{error && <p role="alert">{error}</p>}<label>شماره همراه<input autoComplete="tel" inputMode="tel" maxLength={20} value={phoneNumber} disabled={sent || busy} onChange={event => setPhoneNumber(event.target.value)} required /></label>{sent && <><label>کد پیامک<input autoComplete="one-time-code" inputMode="numeric" maxLength={6} value={code} onChange={event => setCode(event.target.value.replace(/[۰-۹]/g, digit => "۰۱۲۳۴۵۶۷۸۹".indexOf(digit)).replace(/\D/g, ""))} required /></label><label>نام (اختیاری)<input maxLength={200} value={name} onChange={event => setName(event.target.value)} /></label><button type="button" disabled={busy} onClick={() => { if (Date.now() < resendAt) setError("برای ارسال مجدد ۶۰ ثانیه صبر کنید."); else { setSent(false); setCode(""); } }}>تغییر شماره / ارسال مجدد</button></>}<button disabled={busy}>{busy ? "در حال بررسی…" : sent ? "ورود" : "دریافت کد ورود"}</button></form>;
}
CustomerLogin.propTypes = { api: PropTypes.object.isRequired, scopeId: PropTypes.number.isRequired, onLogin: PropTypes.func.isRequired };
