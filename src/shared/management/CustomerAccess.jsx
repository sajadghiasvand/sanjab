import { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { createCustomerApi } from "./customerApi";
import { createShopApi } from "./shopApi";
import { CustomerLogin } from "./CustomerLogin";
import { ShopCart } from "./ShopCart";
import { BlogComments } from "./BlogComments";
import CustomerProfile from "../../components/store/CustomerProfile";

function PurchaseAccess({ api, shopApi, scopeId, productId, showOrders, profile, onProfileChange }) {
  if (productId && ![profile.firstName, profile.lastName, profile.job, profile.address].every(value => value?.trim()))
    return <CustomerProfile api={api} scopeId={scopeId} profile={profile} onComplete={onProfileChange} />;
  return <ShopCart api={shopApi} scopeId={scopeId} initialProductId={productId} showOrders={showOrders} initialAddress={profile?.address} />;
}
PurchaseAccess.propTypes = { api: PropTypes.object.isRequired, shopApi: PropTypes.object.isRequired, scopeId: PropTypes.number.isRequired, productId: PropTypes.number, showOrders: PropTypes.bool, profile: PropTypes.object.isRequired, onProfileChange: PropTypes.func.isRequired };
function CustomerAccess({ baseUrl, scopeId, postId, kind = "blog", productId, showOrders }) {
  // Separate from the panels' tokens. No admin/business session is overwritten.
  const key = `sanjab.customer.${scopeId}`;
  const [token, setToken] = useState(() => { try { return window.sessionStorage.getItem(key) || ""; } catch { return ""; } });
  const [profile, setProfile] = useState(null);
  const [profileError, setProfileError] = useState("");
  const [editing, setEditing] = useState(false);
  const api = useMemo(() => createCustomerApi({ baseUrl, getToken: () => token }), [baseUrl, token]);
  const shopApi = useMemo(() => createShopApi({ baseUrl, getToken: () => token }), [baseUrl, token]);
  useEffect(() => {
    let active = true;
    setProfile(null); setProfileError(""); setEditing(false);
    if (token) api.me(scopeId).then(data => { if (active) setProfile(data); }).catch(err => { if (active) setProfileError(err.message); });
    return () => { active = false; };
  }, [api, scopeId, token]);
  const saveToken = value => { setToken(value); try { if (value) window.sessionStorage.setItem(key, value); else window.sessionStorage.removeItem(key); } catch { /* Memory session remains usable. */ } };
  const login = <CustomerLogin api={api} scopeId={scopeId} onLogin={result => saveToken(result.token)} />;
  const displayName = [profile?.firstName, profile?.lastName].filter(Boolean).join(" ") || profile?.name || profile?.phoneNumber;
  return <div dir="rtl">{token && <div className="store-customer-bar"><span>{displayName || (profileError ? "اطلاعات حساب در دسترس نیست" : "در حال دریافت حساب…")}</span><div><button type="button" disabled={!profile} onClick={() => setEditing(true)}>ویرایش پروفایل</button><button type="button" onClick={() => saveToken("")}>خروج از حساب</button></div></div>}
    {token && profileError && <p role="alert">{profileError}</p>}
    {token && !profile && !profileError && <p role="status">در حال دریافت اطلاعات حساب…</p>}
    {editing && profile && <CustomerProfile api={api} scopeId={scopeId} profile={profile} onComplete={value => { setProfile(value); setEditing(false); }} onCancel={() => setEditing(false)} />}
    <div hidden={editing}>{postId ? <BlogComments kind={kind} api={api} scopeId={scopeId} postId={postId} loggedIn={Boolean(token)} loginContent={login} /> : token ? profile && <PurchaseAccess api={api} shopApi={shopApi} scopeId={scopeId} productId={productId} showOrders={showOrders} profile={profile} onProfileChange={setProfile} /> : login}</div>
  </div>;
}
CustomerAccess.propTypes = { baseUrl: PropTypes.string.isRequired, scopeId: PropTypes.number.isRequired, postId: PropTypes.number, kind: PropTypes.oneOf(["blog", "shop"]), productId: PropTypes.number, showOrders: PropTypes.bool };
export function CustomerShop({ baseUrl, scopeId, productId, showOrders }) { return <CustomerAccess key={`${baseUrl}-${scopeId}`} baseUrl={baseUrl} scopeId={scopeId} productId={productId} showOrders={showOrders} />; }
CustomerShop.propTypes = { baseUrl: PropTypes.string.isRequired, scopeId: PropTypes.number.isRequired, productId: PropTypes.number, showOrders: PropTypes.bool };
export function CustomerBlogComments({ baseUrl, scopeId, postId }) { return <CustomerAccess key={`${baseUrl}-${scopeId}-${postId}`} baseUrl={baseUrl} scopeId={scopeId} postId={postId} />; }
CustomerBlogComments.propTypes = { baseUrl: PropTypes.string.isRequired, scopeId: PropTypes.number.isRequired, postId: PropTypes.number.isRequired };

export function CustomerProductComments({ baseUrl, scopeId, productId }) { return <CustomerAccess key={`${baseUrl}-${scopeId}-${productId}`} baseUrl={baseUrl} scopeId={scopeId} postId={productId} kind="shop" />; }
CustomerProductComments.propTypes = { baseUrl: PropTypes.string.isRequired, scopeId: PropTypes.number.isRequired, productId: PropTypes.number.isRequired };
