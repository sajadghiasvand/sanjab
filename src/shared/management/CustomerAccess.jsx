import { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { createCustomerApi } from "./customerApi";
import { createShopApi } from "./shopApi";
import { CustomerLogin } from "./CustomerLogin";
import { ShopCart } from "./ShopCart";
import { BlogComments } from "./BlogComments";
function CustomerAccess({ baseUrl, scopeId, postId, kind = "blog" }) {
  // Separate from the panels' tokens. No admin/business session is overwritten.
  const key = `sanjab.customer.${scopeId}`;
  const [token, setToken] = useState(() => { try { return window.sessionStorage.getItem(key) || ""; } catch { return ""; } });
  const api = useMemo(() => createCustomerApi({ baseUrl, getToken: () => token }), [baseUrl, token]);
  const shopApi = useMemo(() => createShopApi({ baseUrl, getToken: () => token }), [baseUrl, token]);
  const saveToken = value => { setToken(value); try { if (value) window.sessionStorage.setItem(key, value); else window.sessionStorage.removeItem(key); } catch { /* Memory session remains usable. */ } };
  const login = <CustomerLogin api={api} scopeId={scopeId} onLogin={result => saveToken(result.token)} />;
  return <div dir="rtl">{token && <button onClick={() => saveToken("")}>خروج از حساب مشتری</button>}{postId ? <BlogComments kind={kind} api={api} scopeId={scopeId} postId={postId} loggedIn={Boolean(token)} loginContent={login} /> : token ? <ShopCart api={shopApi} scopeId={scopeId} /> : login}</div>;
}
CustomerAccess.propTypes = { baseUrl: PropTypes.string.isRequired, scopeId: PropTypes.number.isRequired, postId: PropTypes.number, kind: PropTypes.oneOf(["blog", "shop"]) };
export function CustomerShop({ baseUrl, scopeId }) { return <CustomerAccess key={`${baseUrl}-${scopeId}`} baseUrl={baseUrl} scopeId={scopeId} />; }
CustomerShop.propTypes = { baseUrl: PropTypes.string.isRequired, scopeId: PropTypes.number.isRequired };
export function CustomerBlogComments({ baseUrl, scopeId, postId }) { return <CustomerAccess key={`${baseUrl}-${scopeId}-${postId}`} baseUrl={baseUrl} scopeId={scopeId} postId={postId} />; }
CustomerBlogComments.propTypes = { baseUrl: PropTypes.string.isRequired, scopeId: PropTypes.number.isRequired, postId: PropTypes.number.isRequired };

export function CustomerProductComments({ baseUrl, scopeId, productId }) { return <CustomerAccess key={`${baseUrl}-${scopeId}-${productId}`} baseUrl={baseUrl} scopeId={scopeId} postId={productId} kind="shop" />; }
CustomerProductComments.propTypes = { baseUrl: PropTypes.string.isRequired, scopeId: PropTypes.number.isRequired, productId: PropTypes.number.isRequired };
