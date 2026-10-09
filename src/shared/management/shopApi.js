import { readManagementToken } from "./api.js";

// Customer storefront API; scope 0 is the main project shop.
export function createShopApi({
  baseUrl,
  getToken = readManagementToken,
  fetchImpl = (...args) => fetch(...args),
}) {
  const root = `${baseUrl.replace(/\/$/, "")}/api/shop`;
  async function request(scope, path, { method = "GET", body, signal } = {}) {
    const token = getToken();
    const response = await fetchImpl(`${root}/${scope}${path}`, {
      method,
      signal,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      ...(body === undefined ? {} : { body: JSON.stringify(body) }),
    });
    const data = await response.json();
    if (!response.ok || data.Code >= 400) {
      const message =
        data.Message || data.message || "خطا در دریافت اطلاعات فروشگاه";
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
  return {
    browse: (scope, page = 1, signal, filters = {}) =>
      request(
        scope,
        `/catalog?${new URLSearchParams({ page: String(page), ...filters })}`,
        { signal },
      ),
    lessons: (scope, productId) =>
      request(scope, `/products/${productId}/lessons`),

    catalog: (scope, page = 1, signal) =>
      request(scope, `/products?page=${page}`, { signal }),
    cart: (scope, signal) => request(scope, "/cart", { signal }),
    setItem: (scope, productId, quantity) =>
      request(scope, `/cart/items/${productId}`, {
        method: "PUT",
        body: { quantity },
      }),
    removeItem: (scope, productId) =>
      request(scope, `/cart/items/${productId}`, { method: "DELETE" }),
    clear: (scope) => request(scope, "/cart", { method: "DELETE" }),
    checkout: (scope, body) =>
      request(scope, "/cart/checkout", { method: "POST", body }),
    orders: (scope, page = 1, signal) =>
      request(scope, `/orders?page=${page}`, { signal }),
    order: (scope, id, signal) => request(scope, `/orders/${id}`, { signal }),
    cancel: (scope, id) =>
      request(scope, `/orders/${id}/cancel`, { method: "POST" }),
    pay: (scope, id) =>
      request(scope, `/orders/${id}/payment`, { method: "POST" }),
    verify: (scope, id) =>
      request(scope, `/orders/${id}/payment/verify`, { method: "POST" }),
  };
}
