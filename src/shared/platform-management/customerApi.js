// Customer tokens are passed separately; never replace an admin/business management session.
export function createCustomerApi({ baseUrl, getToken = () => null, fetchImpl = fetch }) {
  const root = baseUrl.replace(/\/$/, "");
  async function request(path, { method = "GET", body, signal } = {}) {
    const token = getToken();
    const response = await fetchImpl(`${root}/api${path}`, { method, signal, headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) }, ...(body === undefined ? {} : { body: JSON.stringify(body) }) });
    const data = await response.json();
    if (!response.ok || data.Code >= 400) { const error = new Error(response.status === 404 && path.includes("/auth/otp") ? "سرویس ورود مشتری در دسترس نیست. لطفاً بعداً دوباره تلاش کنید." : (Array.isArray(data.Message) ? data.Message.join("، ") : data.Message) || (Array.isArray(data.message) ? data.message.join("، ") : data.message) || "خطا در دریافت اطلاعات"); error.status = response.status; throw error; }
    return Object.prototype.hasOwnProperty.call(data, "Data") ? data.Data : data;
  }
  return {
    sendOtp: (scope, phoneNumber) => request(`/customer/${scope}/auth/otp`, { method: "POST", body: { phoneNumber } }),
    checkOtp: (scope, body) => request(`/customer/${scope}/auth/otp/check`, { method: "POST", body }),
    me: scope => request(`/customer/${scope}/auth/me`),
    updateMe: (scope, body) => request(`/customer/${scope}/auth/me`, { method: "PATCH", body }),
    productComments: (scope, productId, page = 1, signal) => request(`/shop/${scope}/products/${productId}/comments?page=${page}`, { signal }),
    productComment: (scope, productId, body) => request(`/shop/${scope}/products/${productId}/comments`, { method: "POST", body: { body } }),
    comments: (scope, postId, page = 1, signal) => request(`/blog/${scope}/posts/${postId}/comments?page=${page}`, { signal }),
    comment: (scope, postId, body) => request(`/blog/${scope}/posts/${postId}/comments`, { method: "POST", body: { body } }),
  };
}
