import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import { createCustomerApi } from "./customerApi";
import { useCustomerSession } from "./customerSession";
import CustomerProfile from "./CustomerProfile";
import "./customer-account.css";

export function CustomerAccount({ baseUrl, scopeId, accountUrl }) {
  const [token, saveToken] = useCustomerSession(scopeId);
  const [profile, setProfile] = useState(null), [editing, setEditing] = useState(false), [profileError, setProfileError] = useState("");
  const [revision, setRevision] = useState(0);
  const api = useMemo(() => createCustomerApi({ baseUrl, getToken: () => token }), [baseUrl, token]);
  useEffect(() => {
    let active = true;
    setProfile(null); setProfileError(""); setEditing(false);
    if (token) api.me(scopeId).then((data) => { if (active) setProfile(data); }).catch((error) => { if (active) { if (error.status === 401) saveToken(""); else setProfileError(error.message); } });
    return () => { active = false; };
  }, [api, scopeId, token, revision]);
  useEffect(() => {
    if (!editing) return undefined;
    const onKeyDown = (event) => { if (event.key === "Escape") setEditing(false); };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [editing]);
  if (!token) return <a className="sf-customer-signin" href={accountUrl}>ورود / ثبت‌نام</a>;
  const name = [profile?.firstName, profile?.lastName].filter(Boolean).join(" ") || profile?.name || profile?.phoneNumber || "حساب کاربری";
  const ordersUrl = accountUrl.replace(/\/cart$/, "/orders");
  return <><details className="sf-customer-account"><summary><span aria-hidden="true">♙</span><span>{name}</span></summary><div className="sf-customer-account-menu"><a href={ordersUrl}>سفارش‌های من</a><button type="button" disabled={!profile} onClick={() => setEditing(true)}>ویرایش پروفایل</button>{profileError && <button type="button" onClick={() => setRevision((value) => value + 1)}>تلاش دوباره برای دریافت پروفایل</button>}<button type="button" onClick={() => saveToken("")}>خروج از حساب</button></div></details>
    {editing && profile && createPortal(<div className="sf-profile-overlay"><div className="sf-profile-dialog" role="dialog" aria-modal="true" aria-label="ویرایش پروفایل" dir="rtl"><button type="button" className="sf-profile-close" aria-label="بستن ویرایش پروفایل" onClick={() => setEditing(false)}>×</button><CustomerProfile api={api} scopeId={scopeId} profile={profile} onComplete={(saved) => { setProfile(saved); setEditing(false); }} onCancel={() => setEditing(false)} /></div></div>, document.body)}
  </>;
}
CustomerAccount.propTypes = { baseUrl: PropTypes.string.isRequired, scopeId: PropTypes.number.isRequired, accountUrl: PropTypes.string.isRequired };
