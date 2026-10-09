import { useEffect, useState } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { BusinessSiteContext } from "./siteContext.js";
import { frontendSitePath } from "./sitePaths.js";
function installMarkup(html, target) {
  const template = document.createElement("template");
  template.innerHTML = html || "";
  const nodes = [];
  for (const node of [...template.content.childNodes]) {
    if (node.nodeName === "SCRIPT") {
      const script = document.createElement("script");
      for (const attribute of node.attributes)
        script.setAttribute(attribute.name, attribute.value);
      script.textContent = node.textContent;
      target.appendChild(script);
      nodes.push(script);
    } else {
      target.appendChild(node);
      nodes.push(node);
    }
  }
  return () => nodes.forEach((node) => node.remove());
}
export function BusinessSiteRuntime({ api, scope, root, children }) {
  const location = useLocation(),
    [state, setState] = useState({
      path: "",
      loading: scope > 0,
      redirect: null,
      tracking: null,
    });
  useEffect(() => {
    if (scope <= 0) return;
    const controller = new AbortController();
    api
      .siteRuntime(scope, location.pathname, controller.signal)
      .then((data) => {
        if (!controller.signal.aborted)
          setState({
            path: location.pathname,
            loading: false,
            redirect: frontendSitePath(data.redirect?.to, scope, root),
            tracking: data.tracking || null,
            canonicalOrigin: data.canonicalOrigin || null,
          });
      })
      .catch(() => {
        if (!controller.signal.aborted)
          setState({
            path: location.pathname,
            loading: false,
            redirect: null,
            tracking: null,
          });
      });
    return () => controller.abort();
  }, [api, scope, root, location.pathname]);
  const head = state.tracking?.head || "",
    body = state.tracking?.body || "";
  useEffect(() => {
    if (scope <= 0) return;
    const cleanHead = installMarkup(head, document.head),
      cleanBody = installMarkup(body, document.body);
    return () => {
      cleanHead();
      cleanBody();
    };
  }, [head, body, scope]);
  const pagePrefix = `${root}/pages/`;
  const pageRedirect = state.redirect?.startsWith(pagePrefix)
    ? root
      ? `/api/site/site/${scope}/pages/${state.redirect.slice(pagePrefix.length)}`
      : state.redirect
    : null;
  useEffect(() => {
    if (pageRedirect && state.path === location.pathname)
      window.location.replace(pageRedirect);
  }, [pageRedirect, state.path, location.pathname]);
  if (scope > 0 && (state.loading || state.path !== location.pathname))
    return (
      <p role="status" className="sf-state">
        در حال دریافت تنظیمات سایت…
      </p>
    );
  if (state.redirect && state.redirect !== location.pathname)
    return pageRedirect ? null : <Navigate to={state.redirect} replace />;
  return <BusinessSiteContext.Provider value={scope > 0 ? state.canonicalOrigin : null}>{children}</BusinessSiteContext.Provider>;
}
