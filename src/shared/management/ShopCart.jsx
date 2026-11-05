import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "./management.css";
import "./shop-cart.css";

const money = (value) => `${Number(value || 0).toLocaleString("fa-IR")} ریال`;
const statuses = { pending: "در انتظار پرداخت", paid: "پرداخت‌شده", fulfilled: "تکمیل‌شده", cancelled: "لغوشده" };

function ShopCartContent({ api, scopeId, productId, catalogUrl = "/shop", ordersOnly = false, onPayment = (url) => window.location.assign(url) }) {
  const [cart, setCart] = useState(null), [orders, setOrders] = useState({ items: [], total: 0 });
  const [orderPage, setOrderPage] = useState(1), [order, setOrder] = useState(null), [lessons, setLessons] = useState(null);
  const [address, setAddress] = useState(""), [note, setNote] = useState(""), [promoCode, setPromoCode] = useState("");
  const [loading, setLoading] = useState(true), [busy, setBusy] = useState(false), [error, setError] = useState(""), [notice, setNotice] = useState("");
  const [confirmCancel, setConfirmCancel] = useState(false), [revision, setRevision] = useState(0);
  const checkoutAttempt = useRef(null), selectedRequest = useRef(null);
  const requested = productId === undefined ? new URLSearchParams(window.location.search).get("productId") : productId;
  const selected = /^[1-9][0-9]*$/.test(String(requested || "")) && Number.isSafeInteger(Number(requested)) && Number(requested) <= 2147483647 ? Number(requested) : null;

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true); setError("");
    if (!ordersOnly && selected && (!selectedRequest.current || selectedRequest.current.id !== selected)) {
      selectedRequest.current = { id: selected, promise: (async () => {
        const current = await api.cart(scopeId);
        if (!current.items.some((item) => item.productId === selected)) await api.setItem(scopeId, selected, 1);
      })() };
    }
    Promise.all([
      ordersOnly ? Promise.resolve(null) : (selected ? selectedRequest.current.promise : Promise.resolve()).then(() => api.cart(scopeId, controller.signal)),
      api.orders(scopeId, orderPage, controller.signal),
    ]).then(([nextCart, nextOrders]) => {
      if (!controller.signal.aborted) {
        setCart(nextCart); setOrders(nextOrders);
        const url = new URL(window.location.href);
        if (selected && Number(url.searchParams.get("productId")) === selected) {
          url.searchParams.delete("productId");
          window.history.replaceState(window.history.state, "", url.pathname + url.search + url.hash);
        }
      }
    }).catch((err) => { if (!controller.signal.aborted) { selectedRequest.current = null; setError(err.message); } })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [api, scopeId, orderPage, revision, selected, ordersOnly]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search), id = Number(params.get("orderId"));
    if (Number(params.get("shopScopeId")) !== scopeId || !Number.isSafeInteger(id) || id < 1) return undefined;
    const controller = new AbortController();
    api.order(scopeId, id, controller.signal).then((data) => { if (!controller.signal.aborted) setOrder(data); })
      .catch((err) => { if (!controller.signal.aborted) setError(err.message); });
    return () => controller.abort();
  }, [api, scopeId]);

  async function run(operation) {
    setBusy(true); setError(""); setNotice("");
    try { await operation(); setRevision((value) => value + 1); } catch (err) { setError(err.message); } finally { setBusy(false); }
  }
  async function checkout() {
    if (!cart) return;
    const fingerprint = JSON.stringify({ address, note, promoCode: promoCode.trim() });
    if (!checkoutAttempt.current || checkoutAttempt.current.fingerprint !== fingerprint || checkoutAttempt.current.version !== cart.version)
      checkoutAttempt.current = { fingerprint, version: cart.version, key: crypto.randomUUID() };
    const created = await api.checkout(scopeId, { checkoutKey: checkoutAttempt.current.key, cartVersion: cart.version, address, note, ...(promoCode.trim() ? { promoCode: promoCode.trim() } : {}) });
    setOrder(created); setConfirmCancel(false); checkoutAttempt.current = null;
    try {
      const payment = await api.pay(scopeId, created.id);
      if (!payment.url) throw new Error("آدرس درگاه پرداخت دریافت نشد.");
      onPayment(payment.url);
    } catch (err) { setRevision((value) => value + 1); throw new Error(`سفارش ثبت شد اما اتصال به درگاه ناموفق بود. ${err.message}`); }
  }

  return <section className="sm-management sm-customer-cart" dir="rtl">
    <header className="sm-cart-header"><div><h1>{ordersOnly ? "سفارش‌های من" : "سبد خرید"}</h1><p>{ordersOnly ? "پیگیری سفارش‌ها و دسترسی به خریدها" : "محصولات انتخاب‌شده و پرداخت سفارش"}</p></div><a href={catalogUrl}>ادامه خرید ←</a></header>
    {error && <div role="alert" className="sm-error">{error}{!cart && <button type="button" className="sm-secondary" onClick={() => setRevision((value) => value + 1)}>تلاش دوباره</button>}</div>}{notice && <p role="status" className="sm-notice">{notice}</p>}
    {loading ? <p role="status">در حال دریافت اطلاعات…</p> : !ordersOnly && cart && <>
      {!cart.items.length ? <div className="sm-cart-empty"><p>سبد خرید شما خالی است.</p><a href={catalogUrl}>مشاهده محصولات</a></div> : <div className="sm-cart-layout"><div className="sm-cart-items">{cart.items.map((item) => <div className="sm-cart-row" key={item.productId}><div><strong>{item.title}</strong><small>{item.available ? money(item.totalRials) : "ناموجود"}</small></div><div className="sm-cart-row-actions"><button type="button" aria-label={`کاهش تعداد ${item.title}`} disabled={busy || item.quantity <= 1} onClick={() => run(() => api.setItem(scopeId, item.productId, item.quantity - 1))}>−</button><span aria-label="تعداد">{Number(item.quantity).toLocaleString("fa-IR")}</span><button type="button" aria-label={`افزایش تعداد ${item.title}`} disabled={busy || !item.available || item.quantity >= 9999} onClick={() => run(() => api.setItem(scopeId, item.productId, item.quantity + 1))}>+</button><button type="button" className="sm-cart-remove" disabled={busy} onClick={() => run(() => api.removeItem(scopeId, item.productId))}>حذف</button></div></div>)}</div>
        <form className="sm-cart-checkout" onSubmit={(event) => { event.preventDefault(); run(checkout); }}><h2>خلاصه سفارش</h2><div className="sm-cart-total"><span>جمع سبد</span><strong>{money(cart.totalRials)}</strong></div><details><summary>کد تخفیف و اطلاعات تکمیلی</summary><label>کد تخفیف<input dir="ltr" maxLength={64} pattern="[A-Za-z0-9_-]*" value={promoCode} disabled={busy} onChange={(event) => setPromoCode(event.target.value)} /></label><label>نشانی<textarea maxLength={2000} value={address} disabled={busy} onChange={(event) => setAddress(event.target.value)} /></label><label>یادداشت<textarea maxLength={2000} value={note} disabled={busy} onChange={(event) => setNote(event.target.value)} /></label></details><button type="submit" disabled={busy || cart.items.some((item) => !item.available)}>{busy ? "در حال پردازش…" : "ثبت سفارش و پرداخت"}</button></form></div>}
    </>}
    <details className="sm-cart-orders" open={ordersOnly || order ? true : undefined}><summary>{ordersOnly ? "فهرست سفارش‌ها" : "سفارش‌های من"} {orders.total > 0 && <span>({Number(orders.total).toLocaleString("fa-IR")})</span>}</summary>{!orders.items.length && !loading && <p>هنوز سفارشی ثبت نشده است.</p>}{orders.items.map((item) => <div className="sm-cart-order-row" key={item.id}><button type="button" className="sm-secondary" disabled={busy || loading} onClick={() => run(async () => { setOrder(await api.order(scopeId, item.id)); setLessons(null); setConfirmCancel(false); })}>سفارش {item.id}</button><span>{statuses[item.status] || item.status}</span><strong>{money(item.totalRials)}</strong></div>)}{orders.total > 50 && <div className="sm-pagination"><button type="button" disabled={orderPage === 1 || busy || loading} onClick={() => setOrderPage((value) => value - 1)}>قبلی</button><button type="button" disabled={orderPage * 50 >= orders.total || busy || loading} onClick={() => setOrderPage((value) => value + 1)}>بعدی</button></div>}
      {order && <section className="sm-order-detail" aria-label="سفارش انتخاب‌شده"><div className="sm-cart-order-heading"><h2>سفارش {order.id}</h2><button type="button" className="sm-secondary" onClick={() => { setOrder(null); setLessons(null); }}>بستن</button></div><p>{statuses[order.status] || order.status} — {money(order.totalRials)}</p>{Number(order.discountRials) > 0 && <p>کد تخفیف: {order.promoCode} — تخفیف: {money(order.discountRials)} — جمع قبل از تخفیف: {money(order.subtotalRials)}</p>}
        {(order.products || []).map((product) => <div className="sm-cart-order-product" key={product.id || product.productId}><span>{product.title} × {product.quantity} — {money(product.totalRials)}</span>{["paid", "fulfilled"].includes(order.status) && api.lessons && <button type="button" className="sm-secondary" disabled={busy} onClick={() => run(async () => setLessons(await api.lessons(scopeId, product.productId)))}>درس‌ها</button>}</div>)}
        {lessons && <section className="sm-cart-lessons"><h3>{lessons.title}</h3>{lessons.itemGroups.map((group, index) => <div key={index}><h4>{group.name}</h4>{group.items.map((item, itemIndex) => <p key={itemIndex}><strong>{item.key}: </strong>{/^https?:\/\//.test(item.value) ? <a href={item.value} target="_blank" rel="noopener noreferrer">مشاهده درس یا فایل</a> : <span>{item.value}</span>}</p>)}</div>)}<button type="button" className="sm-secondary" onClick={() => setLessons(null)}>بستن درس‌ها</button></section>}
        {(order.transactionId || order.payment?.referenceId) && <p>شناسه تراکنش: {order.transactionId || "—"} — کد پیگیری: {order.payment?.referenceId || "—"}</p>}
        {order.status === "pending" && <div className="sm-order-actions"><button type="button" disabled={busy} onClick={() => run(async () => { const payment = await api.pay(scopeId, order.id); if (!payment.url) throw new Error("آدرس درگاه پرداخت دریافت نشد."); setConfirmCancel(false); onPayment(payment.url); })}>پرداخت آنلاین</button>{order.payment && <button type="button" className="sm-secondary" disabled={busy} onClick={() => run(async () => { const result = await api.verify(scopeId, order.id); setOrder(await api.order(scopeId, order.id)); setNotice(["paid", "fulfilled"].includes(result.status) ? "پرداخت تأیید شد." : "پرداخت هنوز تأیید نشده است."); })}>بررسی پرداخت</button>}{order.canCancel && !confirmCancel && <button type="button" className="sm-danger" disabled={busy} onClick={() => setConfirmCancel(true)}>لغو سفارش</button>}{confirmCancel && <div><p>سفارش {order.id} لغو شود؟</p><button type="button" disabled={busy} onClick={() => run(async () => { setOrder(await api.cancel(scopeId, order.id)); setConfirmCancel(false); })}>تأیید لغو</button> <button type="button" className="sm-secondary" disabled={busy} onClick={() => setConfirmCancel(false)}>انصراف</button></div>}</div>}
      </section>}
    </details>
  </section>;
}
export function ShopCart(props) { return <ShopCartContent key={props.scopeId} {...props} />; }
ShopCartContent.propTypes = ShopCart.propTypes = { api: PropTypes.object.isRequired, scopeId: PropTypes.number.isRequired, productId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), catalogUrl: PropTypes.string, ordersOnly: PropTypes.bool, onPayment: PropTypes.func };
