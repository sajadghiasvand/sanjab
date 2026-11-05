import { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { useCustomerSession } from "./customerSession";
import { createShopApi } from "./shopApi";

export function CustomerProductAccess({ baseUrl, scopeId, productId, children }) {
  const [token] = useCustomerSession(scopeId);
  const [revision, setRevision] = useState(0);
  const [result, setResult] = useState(null);
  const api = useMemo(() => createShopApi({ baseUrl, getToken: () => token }), [baseUrl, token]);
  useEffect(() => {
    if (!token) return undefined;
    const controller = new AbortController();
    setResult(null);
    api.lessons(scopeId, productId, controller.signal).then((data) => {
      if (!controller.signal.aborted) setResult({ token, scopeId, productId, status: "purchased", groups: data.itemGroups || [] });
    }).catch((error) => {
      if (!controller.signal.aborted) setResult({ token, scopeId, productId, status: error.status === 403 ? "unowned" : "error", message: error.message });
    });
    return () => controller.abort();
  }, [api, scopeId, productId, token, revision]);
  const current = result?.token === token && result?.scopeId === scopeId && result?.productId === productId ? result : null;
  return children(!token ? { status: "guest" } : current || { status: "checking" }, () => { setResult(null); setRevision((value) => value + 1); });
}
CustomerProductAccess.propTypes = { baseUrl: PropTypes.string.isRequired, scopeId: PropTypes.number.isRequired, productId: PropTypes.number.isRequired, children: PropTypes.func.isRequired };
