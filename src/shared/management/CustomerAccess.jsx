import { useMemo } from "react";
import { useCustomerSession } from "./customerSession";
import PropTypes from "prop-types";
import { createCustomerApi } from "./customerApi";
import { createShopApi } from "./shopApi";
import { CustomerLogin } from "./CustomerLogin";
import { ShopCart } from "./ShopCart";
import { BlogComments } from "./BlogComments";
function CustomerAccess({ baseUrl, scopeId, postId, kind = "blog", productId, catalogUrl, ordersOnly }) {
  // Separate from the panels' tokens. No admin/business session is overwritten.
  const [token, saveToken] = useCustomerSession(scopeId);
  const api = useMemo(() => createCustomerApi({ baseUrl, getToken: () => token }), [baseUrl, token]);
  const shopApi = useMemo(() => createShopApi({ baseUrl, getToken: () => token }), [baseUrl, token]);
  const login = <CustomerLogin api={api} scopeId={scopeId} onLogin={result => saveToken(result.token)} />;
  return <div dir="rtl">{postId ? <BlogComments kind={kind} api={api} scopeId={scopeId} postId={postId} loggedIn={Boolean(token)} loginContent={login} /> : token ? <ShopCart api={shopApi} scopeId={scopeId} productId={productId} catalogUrl={catalogUrl} ordersOnly={ordersOnly} /> : login}</div>;
}
CustomerAccess.propTypes = { baseUrl: PropTypes.string.isRequired, scopeId: PropTypes.number.isRequired, postId: PropTypes.number, kind: PropTypes.oneOf(["blog", "shop"]), productId: PropTypes.string, catalogUrl: PropTypes.string, ordersOnly: PropTypes.bool };
export function CustomerShop({ baseUrl, scopeId, productId, catalogUrl, ordersOnly }) { return <CustomerAccess key={`${baseUrl}-${scopeId}`} baseUrl={baseUrl} scopeId={scopeId} productId={productId} catalogUrl={catalogUrl} ordersOnly={ordersOnly} />; }
CustomerShop.propTypes = { baseUrl: PropTypes.string.isRequired, scopeId: PropTypes.number.isRequired, productId: PropTypes.string, catalogUrl: PropTypes.string, ordersOnly: PropTypes.bool };
export function CustomerBlogComments({ baseUrl, scopeId, postId }) { return <CustomerAccess key={`${baseUrl}-${scopeId}-${postId}`} baseUrl={baseUrl} scopeId={scopeId} postId={postId} />; }
CustomerBlogComments.propTypes = { baseUrl: PropTypes.string.isRequired, scopeId: PropTypes.number.isRequired, postId: PropTypes.number.isRequired };

export function CustomerProductComments({ baseUrl, scopeId, productId }) { return <CustomerAccess key={`${baseUrl}-${scopeId}-${productId}`} baseUrl={baseUrl} scopeId={scopeId} postId={productId} kind="shop" />; }
CustomerProductComments.propTypes = { baseUrl: PropTypes.string.isRequired, scopeId: PropTypes.number.isRequired, productId: PropTypes.number.isRequired };
