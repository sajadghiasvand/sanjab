export function storefrontScope(value) {
  if (value === undefined) return 0;
  if (!/^[1-9][0-9]*$/.test(String(value)))
    throw new Error("شناسه کسب‌وکار معتبر نیست.");
  const scope = Number(value);
  if (!Number.isSafeInteger(scope) || scope > 2147483647)
    throw new Error("شناسه کسب‌وکار معتبر نیست.");
  return scope;
}
export function storefrontRoot(scope) {
  return scope === 0 ? "" : `/business/${scope}`;
}
export function createPublicApi(
  baseUrl,
  fetchImpl = (...args) => fetch(...args),
) {
  const origin = baseUrl.replace(/\/$/, "");
  async function get(path, signal) {
    const response = await fetchImpl(`${origin}/api${path}`, { signal });
    let data;
    try {
      data = await response.json();
    } catch {
      throw new Error("پاسخ معتبر از سرور دریافت نشد.");
    }
    if (!response.ok || data.Code >= 400) {
      const error = new Error(
        response.status === 404
          ? "محتوا یافت نشد."
          : response.status === 403
            ? "این بخش فعال نیست."
            : data.Message || data.message || "خطا در دریافت اطلاعات",
      );
      error.status = response.status;
      const publication = path.match(
        /^\/(shop|blog)\/([1-9][0-9]*)\/(products|posts|archives)\//,
      );
      if (
        response.status === 404 &&
        publication &&
        typeof window !== "undefined"
      ) {
        fetchImpl(`${origin}/api/site/site/${publication[2]}/missing`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            path: window.location.pathname,
            referrer: document.referrer || "",
          }),
        }).catch(() => {});
      }
      throw error;
    }
    return Object.hasOwn(data, "Data") ? data.Data : data;
  }
  return {
    siteRuntime: (scope, path, signal) =>
      get(
        `/site/site/${scope}/runtime?path=${encodeURIComponent(path)}`,
        signal,
      ),
    resolveHostname: (hostname, signal) =>
      get(
        `/public/domains/resolve?hostname=${encodeURIComponent(hostname)}`,
        signal,
      ),
    categories: (scope, signal) => get(`/shop/${scope}/categories`, signal),
    catalog: (scope, filters, signal) =>
      get(`/shop/${scope}/catalog?${new URLSearchParams(filters)}`, signal),
    product: (scope, slug, signal) =>
      get(`/shop/${scope}/products/${encodeURIComponent(slug)}`, signal),
    posts: (scope, page, type, slug, signal) =>
      get(
        `/blog/${scope}/${type ? `archives/${type}/${encodeURIComponent(slug)}` : "posts"}?page=${page}`,
        signal,
      ),
    article: (scope, slug, signal) =>
      get(`/blog/${scope}/posts/${encodeURIComponent(slug)}`, signal),
    productImage: (scope, id) => `${origin}/api/shop/${scope}/images/${id}`,
    media: (scope, id) => `${origin}/api/blog/${scope}/media/${id}/file`,
  };
}

export function checkoutReturnPath(search, currentScope) {
  const params = new URLSearchParams(search),
    raw = params.get("shopScopeId"),
    order = params.get("orderId");
  if (raw === null || !/^[1-9][0-9]*$/.test(order || "")) return null;
  let target;
  try {
    target = raw === "0" ? 0 : storefrontScope(raw);
  } catch {
    return null;
  }
  return target === currentScope
    ? null
    : `${storefrontRoot(target)}/shop/cart?${params}`;
}
