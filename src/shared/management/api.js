export function readManagementToken() {
  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("jwt="));
  return cookie
    ? decodeURIComponent(cookie.slice(4))
    : localStorage.getItem("jwt");
}

// Display scope only. The backend remains responsible for authorization.
export function readBusinessScope() {
  try {
    const payload = readManagementToken()
      .split(".")[1]
      .replace(/-/g, "+")
      .replace(/_/g, "/");
    const id = Number(JSON.parse(atob(payload)).businessId);
    return Number.isSafeInteger(id) && id > 0 ? id : null;
  } catch {
    return null;
  }
}

export function createManagementApi({
  baseUrl,
  getToken = readManagementToken,
  fetchImpl = (...args) => fetch(...args),
}) {
  const root = `${baseUrl.replace(/\/$/, "")}/api/management`;
  async function request(
    path,
    { method = "GET", body, signal, formData = false, asBlob = false } = {},
  ) {
    const token = getToken();
    const response = await fetchImpl(`${root}${path}`, {
      method,
      signal,
      headers: {
        ...(formData ? {} : { "Content-Type": "application/json" }),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      ...(body === undefined
        ? {}
        : { body: formData ? body : JSON.stringify(body) }),
    });
    if (response.ok && asBlob) return response.blob();
    const data = await response.json();
    if (!response.ok || data.Code >= 400) {
      const message = data.Message || data.message || "خطا در دریافت اطلاعات";
      const error = new Error(
        Array.isArray(message) ? message.join("، ") : message,
      );
      error.status = response.status;
      throw error;
    }
    return Object.prototype.hasOwnProperty.call(data, "Data")
      ? data.Data
      : data;
  }
  const collection = (kind, scope, resource = "items") =>
    resource === "items"
      ? `/${kind}/${scope}/${kind === "shop" ? "products" : "posts"}`
      : `/taxonomy/${kind}/${scope}/${resource}`;
  return {
    productUrl: (scope, slug) =>
      `${baseUrl.replace(/\/$/, "")}/api/shop/${scope}/site/${slug}`,
    promoCodes: (scope, page = 1, signal) =>
      request(`/shop/${scope}/promo-codes?page=${page}`, { signal }),
    createPromo: (scope, body) =>
      request(`/shop/${scope}/promo-codes`, { method: "POST", body }),
    updatePromo: (scope, id, body) =>
      request(`/shop/${scope}/promo-codes/${id}`, { method: "PATCH", body }),
    removePromo: (scope, id) =>
      request(`/shop/${scope}/promo-codes/${id}`, { method: "DELETE" }),
    articleUrl: (scope, slug) =>
      `${baseUrl.replace(/\/$/, "")}/api/blog/${scope}/site/${slug}`,
    productComments: (scope, page = 1, status = "", signal) =>
      request(
        `/shop/${scope}/comments?page=${page}&status=${encodeURIComponent(status)}`,
        { signal },
      ),
    moderateProductComment: (scope, id, status) =>
      request(`/shop/${scope}/comments/${id}`, {
        method: "PATCH",
        body: { status },
      }),
    blogComments: (scope, page = 1, status = "", signal) =>
      request(
        `/blog/${scope}/comments?page=${page}&status=${encodeURIComponent(status)}`,
        { signal },
      ),
    moderateBlogComment: (scope, id, status) =>
      request(`/blog/${scope}/comments/${id}`, {
        method: "PATCH",
        body: { status },
      }),
    blogAuthors: (scope, page = 1, signal) =>
      request(`/blog/${scope}/authors?page=${page}`, { signal }),
    createBlogAuthor: (scope, body) =>
      request(`/blog/${scope}/authors`, { method: "POST", body }),
    updateBlogAuthor: (scope, id, body) =>
      request(`/blog/${scope}/authors/${id}`, { method: "PATCH", body }),
    removeBlogAuthor: (scope, id) =>
      request(`/blog/${scope}/authors/${id}`, { method: "DELETE" }),
    authors: (scope, signal) =>
      request(`/blog/${scope}/posts/authors`, { signal }),
    seoCheck: (scope, body, id) =>
      request(`/blog/${scope}/posts/seo-check${id ? `?id=${id}` : ""}`, {
        method: "POST",
        body,
      }),
    mergeBlogTags: (scope, sourceId, targetId) =>
      request(`/taxonomy/blog/${scope}/tags/${sourceId}/merge`, {
        method: "POST",
        body: { targetId },
      }),
    media: (scope, page = 1, search = "", kind = "", signal) =>
      request(
        `/blog/${scope}/media?page=${page}&search=${encodeURIComponent(search)}&kind=${encodeURIComponent(kind)}`,
        { signal },
      ),
    mediaSelected: (scope, ids, signal) =>
      request(`/blog/${scope}/media/selected?ids=${ids.join(",")}`, { signal }),
    uploadMedia: (scope, file, details) => {
      const body = new FormData();
      body.append("file", file);
      body.append("altText", details.altText || "");
      body.append("caption", details.caption || "");
      return request(`/blog/${scope}/media`, {
        method: "POST",
        body,
        formData: true,
      });
    },
    updateMedia: (scope, id, body) =>
      request(`/blog/${scope}/media/${id}`, { method: "PATCH", body }),
    removeMedia: (scope, id) =>
      request(`/blog/${scope}/media/${id}`, { method: "DELETE" }),
    mediaPreview: (scope, id, signal) =>
      request(`/blog/${scope}/media/${id}/file`, { signal, asBlob: true }),
    orders: (scope, page = 1, signal) =>
      request(`/shop/${scope}/orders?page=${page}`, { signal }),
    order: (scope, id, signal) =>
      request(`/shop/${scope}/orders/${id}`, { signal }),
    fulfillOrder: (scope, id) =>
      request(`/shop/${scope}/orders/${id}/fulfill`, { method: "POST" }),
    cancelOrder: (scope, id) =>
      request(`/shop/${scope}/orders/${id}/cancel`, { method: "POST" }),
    verifyOrder: (scope, id) =>
      request(`/shop/${scope}/orders/${id}/payment/verify`, { method: "POST" }),
    options: (kind, scope, type, signal) =>
      request(`${collection(kind, scope, type)}/options`, { signal }),
    features: (scope, signal) => request(`/features/${scope}`, { signal }),
    setFeatures: (scope, flags) =>
      request(`/features/${scope}`, { method: "PUT", body: flags }),
    list: (kind, scope, page, signal, resource = "items") =>
      request(`${collection(kind, scope, resource)}?page=${page}`, { signal }),
    create: (kind, scope, body, resource = "items") =>
      request(collection(kind, scope, resource), { method: "POST", body }),
    update: (kind, scope, id, body, resource = "items") =>
      request(`${collection(kind, scope, resource)}/${id}`, {
        method: "PATCH",
        body,
      }),
    remove: (kind, scope, id, resource = "items") =>
      request(`${collection(kind, scope, resource)}/${id}`, {
        method: "DELETE",
      }),
  };
}
