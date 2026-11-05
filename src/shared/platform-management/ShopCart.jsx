import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { addSelectedProduct } from "./addSelectedProduct";
import { checkoutAndPay } from "./checkoutAndPay";
import OrderDocuments from "../../components/store/OrderDocuments";
import "./management.css";

const money = (value) => `${Number(value || 0).toLocaleString("fa-IR")} ریال`;
const statuses = {
  pending: "در انتظار پرداخت",
  paid: "پرداخت‌شده",
  fulfilled: "تکمیل‌شده",
  cancelled: "لغوشده",
};

// Reusable customer surface; mount with a createShopApi instance and the owning shop scope.
function ShopCartContent({
  api,
  scopeId,
  initialProductId,
  showOrders,
  initialAddress,
  onPayment = (url) => window.location.assign(url),
}) {
  const [cart, setCart] = useState(null);
  const [orders, setOrders] = useState({ items: [], total: 0 });
  const [orderPage, setOrderPage] = useState(1);
  const [address, setAddress] = useState(initialAddress || "");
  const [promoCode, setPromoCode] = useState("");
  const [note, setNote] = useState("");
  const [order, setOrder] = useState(null);
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadedProductId, setLoadedProductId] = useState(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [confirmCancel, setConfirmCancel] = useState(false);
  const [revision, setRevision] = useState(0);
  const checkoutAttempt = useRef(null);
  const selectedRequest = useRef(null);
  const returnedOrder = Number(new URLSearchParams(window.location.search).get("orderId"));
  const paidReturn = order && returnedOrder === order.id && ["paid", "fulfilled"].includes(order.status);

  useEffect(() => {
    if (initialAddress !== undefined) setAddress(initialAddress);
  }, [initialAddress]);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError("");
    if (initialProductId && (!selectedRequest.current || selectedRequest.current.productId !== initialProductId)) {
      selectedRequest.current = { productId: initialProductId, promise: addSelectedProduct(api, scopeId, initialProductId), displayed: false };
    }
    const selected = initialProductId ? selectedRequest.current : null;
    (async () => {
      if (selected && !selected.displayed) {
        try {
          const added = await selected.promise;
          if (controller.signal.aborted) return null;
          selected.displayed = true;
          setNotice(added ? "محصول به سبد خرید اضافه شد." : "این محصول در سبد خرید شماست.");
        } catch (err) {
          if (controller.signal.aborted) return null;
          selected.displayed = true;
          setError(err.message);
        }
      }
      return Promise.all([
        showOrders ? Promise.resolve(null) : api.cart(scopeId, controller.signal),
        api.orders(scopeId, orderPage, controller.signal, showOrders),
      ]);
    })()
      .then((result) => {
        if (!controller.signal.aborted && result) {
          const [nextCart, nextOrders] = result;
          setCart(nextCart);
          setOrders(nextOrders);
          setLoadedProductId(initialProductId ?? null);
        }
      })
      .catch((err) => {
        if (!controller.signal.aborted) {
          setError(err.message);
          setLoadedProductId(initialProductId ?? null);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [api, scopeId, orderPage, revision, initialProductId, showOrders]);

  useEffect(() => {
    setCart(null);
    setOrder(null);
    setConfirmCancel(false);
    checkoutAttempt.current = null;
  }, [scopeId, api, initialProductId]);

  useEffect(() => {
    if (initialProductId) return undefined;
    const params = new URLSearchParams(window.location.search);
    const id = Number(params.get("orderId"));
    if (
      Number(params.get("shopScopeId")) !== scopeId ||
      !Number.isSafeInteger(id) ||
      id < 1
    )
      return undefined;
    const controller = new AbortController();
    // Query status is display-only; fetch the authenticated server order as the source of truth.
    api
      .order(scopeId, id, controller.signal)
      .then((data) => {
        if (!controller.signal.aborted) {
          setOrder(data);
          if (data.status === "pending" && params.get("paymentResult") === "cancelled")
            setNotice("پرداخت انجام نشد. سفارش شما در انتظار پرداخت است.");
          else if (data.status === "pending" && params.get("paymentResult") === "verification_unavailable")
            setNotice("بررسی پرداخت فعلاً در دسترس نیست. وضعیت پرداخت را دوباره بررسی کنید.");
        }
      })
      .catch((err) => {
        if (!controller.signal.aborted) setError(err.message);
      });
    return () => controller.abort();
  }, [api, scopeId, initialProductId]);

  async function run(operation) {
    setBusy(true);
    setError("");
    setNotice("");
    try {
      await operation();
      setRevision((value) => value + 1);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  async function checkout() {
    if (!cart) return;
    const fingerprint = JSON.stringify({
      address,
      note,
      promoCode: promoCode.trim(),
    });
    if (
      !checkoutAttempt.current ||
      checkoutAttempt.current.fingerprint !== fingerprint ||
      checkoutAttempt.current.version !== cart.version
    ) {
      checkoutAttempt.current = {
        fingerprint,
        version: cart.version,
        key: crypto.randomUUID(),
      };
    }
    let created;
    try {
      const url = await checkoutAndPay(api, scopeId, {
        checkoutKey: checkoutAttempt.current.key,
        cartVersion: cart.version,
        address,
        note,
        ...(promoCode.trim() ? { promoCode: promoCode.trim() } : {}),
      }, (order) => { created = order; });
      onPayment(url);
    } catch (err) {
      if (created) {
        setOrder(created);
        setConfirmCancel(false);
        checkoutAttempt.current = null;
        throw new Error(`سفارش ثبت شد اما اتصال به درگاه ناموفق بود. پرداخت را دوباره امتحان کنید. ${err.message}`);
      }
      throw err;
    }
  }

  return (
    <section className="sm-management" dir="rtl">
      <h1>{order ? "جزئیات سفارش" : showOrders ? "سفارش‌های پرداخت‌شده" : "سبد خرید"}</h1>
      {error && (
        <p role="alert" className="sm-error">
          {error}
          {!order && initialProductId && !cart?.items.some((item) => item.productId === initialProductId) && (
            <button type="button" disabled={busy} onClick={() => run(() => addSelectedProduct(api, scopeId, initialProductId))}>تلاش مجدد برای افزودن محصول</button>
          )}
        </p>
      )}
      {notice && <p role="status">{notice}</p>}
      {loading || loadedProductId !== (initialProductId ?? null) ? (
        <p role="status">{showOrders ? "در حال دریافت سفارش‌ها…" : "در حال دریافت فروشگاه…"}</p>
      ) : (
        cart && !order && (
          <>
            <div className="store-cart-items">
              {cart.items.map((item) => (
                <div className="store-cart-item" key={item.productId}>
                  <div className="store-cart-item-info">
                    <strong>{item.title}</strong>
                    <span>{money(item.totalRials)}{!item.available && " — ناموجود"}</span>
                  </div>
                  <div className="store-cart-controls" aria-label={`تعداد ${item.title}`}>
                    <button type="button" disabled={busy || item.quantity <= 1} aria-label={`کاهش تعداد ${item.title}`} onClick={() => run(() => api.setItem(scopeId, item.productId, item.quantity - 1))}>−</button>
                    <span>{item.quantity.toLocaleString("fa-IR")}</span>
                    <button type="button" disabled={busy || item.quantity >= 9999} aria-label={`افزایش تعداد ${item.title}`} onClick={() => run(() => api.setItem(scopeId, item.productId, item.quantity + 1))}>+</button>
                    <button type="button" className="store-cart-remove" disabled={busy} onClick={() => run(() => api.removeItem(scopeId, item.productId))}>حذف</button>
                  </div>
                </div>
              ))}
            </div>
            {!cart.items.length && <p>سبد خرید خالی است.</p>}
            <p className="store-cart-total"><span>جمع سبد خرید</span><strong>{money(cart.totalRials)}</strong></p>
            {cart.items.length > 0 && <form className="store-checkout"
              onSubmit={(event) => {
                event.preventDefault();
                run(checkout);
              }}
            >
              <details className="store-checkout-optional"><summary>کد تخفیف، نشانی و یادداشت</summary>
              <label>
                کد تخفیف
                <input
                  dir="ltr"
                  maxLength={64}
                  pattern="[A-Za-z0-9_-]*"
                  value={promoCode}
                  disabled={busy}
                  onChange={(event) => setPromoCode(event.target.value)}
                />
              </label>
              <label>
                نشانی
                <textarea
                  maxLength={2000}
                  value={address}
                  disabled={busy}
                  onChange={(event) => setAddress(event.target.value)}
                />
              </label>
              <label>
                یادداشت
                <textarea
                  maxLength={2000}
                  value={note}
                  disabled={busy}
                  onChange={(event) => setNote(event.target.value)}
                />
              </label>
              </details>
              <button
                type="submit"
                disabled={
                  busy ||
                  !cart.items.length ||
                  cart.items.some((item) => !item.available)
                }
              >
                {busy ? "در حال اتصال به درگاه…" : "ثبت سفارش و پرداخت"}
              </button>
            </form>}
          </>
        )
      )}
      {!order && !loading && <details className="store-orders" open={showOrders || undefined}>
      <summary>{showOrders ? "انتخاب سفارش" : "سفارش‌های قبلی"}</summary>
      {!orders.items.length && <p>{showOrders ? "سفارش پرداخت‌شده‌ای وجود ندارد." : "هنوز سفارشی ثبت نشده است."}</p>}
      {orders.items.map((item) => (
        <p key={item.id}>
          <button
            type="button"
            disabled={busy || loading}
            onClick={() =>
              run(async () => {
                setOrder(await api.order(scopeId, item.id));
                setConfirmCancel(false);
              })
            }
          >
            سفارش {item.id}
          </button>{" "}
          — {statuses[item.status]} — {money(item.totalRials)}
        </p>
      ))}
      <div className="sm-pagination">
        <button
          type="button"
          disabled={orderPage === 1 || busy || loading}
          onClick={() => setOrderPage((value) => value - 1)}
        >
          قبلی
        </button>
        <button
          type="button"
          disabled={orderPage * 50 >= orders.total || busy || loading}
          onClick={() => setOrderPage((value) => value + 1)}
        >
          بعدی
        </button>
      </div>
      </details>}
      {order && (
        <section className="sm-order-detail" aria-label="سفارش انتخاب‌شده">
          {paidReturn && <div className="success-box">
            <div className="success-icon">✓</div><h4>پرداخت با موفقیت انجام شد</h4>
            <p>شماره سفارش را نگه دارید. مدارک را می‌توانید حالا یا بعداً تکمیل کنید.</p>
            <div className="tracking-code">{Number(order.id).toLocaleString("fa-IR")}</div>
          </div>}
          {paidReturn && scopeId === 0 && <OrderDocuments api={api} scopeId={scopeId} orderId={order.id} />}
          <button type="button" className="store-order-back" disabled={busy} onClick={() => { setOrder(null); setConfirmCancel(false); }}>{showOrders ? "بازگشت به سفارش‌ها" : "بازگشت به سبد خرید"}</button>
          <div className="store-order-heading">
            <div><span>شماره سفارش</span><h2>#{Number(order.id).toLocaleString("fa-IR")}</h2></div>
            <span className={`store-order-status status-${order.status}`}>{statuses[order.status] || order.status}</span>
          </div>
          <div className="store-order-products">
            <h3>محصولات سفارش</h3>
            {order.products.map((product) => (
              <div className="store-order-product" key={product.id}>
                <div><strong>{product.title}</strong><span>تعداد: {Number(product.quantity).toLocaleString("fa-IR")}</span></div>
                <strong>{money(product.totalRials)}</strong>
              </div>
            ))}
          </div>
          <div className="store-order-totals">
            {Number(order.discountRials) > 0 && <>
              <div><span>جمع محصولات</span><span>{money(order.subtotalRials)}</span></div>
              <div><span>تخفیف{order.promoCode ? ` (${order.promoCode})` : ""}</span><span>− {money(order.discountRials)}</span></div>
            </>}
            <div className="store-order-payable"><strong>مبلغ سفارش</strong><strong>{money(order.totalRials)}</strong></div>
          </div>
          {(order.transactionId || order.payment?.referenceId) && <div className="store-order-references">
            {order.transactionId && <div><span>شناسه تراکنش</span><strong>{order.transactionId}</strong></div>}
            {order.payment?.referenceId && <div><span>کد پیگیری پرداخت</span><strong>{order.payment.referenceId}</strong></div>}
          </div>}
          {!paidReturn && scopeId === 0 && ["paid", "fulfilled"].includes(order.status) && <OrderDocuments api={api} scopeId={scopeId} orderId={order.id} />}
          {order.status === "pending" && (
            <div className="sm-order-actions store-order-actions">
              <button
                type="button"
                disabled={busy}
                onClick={() =>
                  run(async () => {
                    const payment = await api.pay(scopeId, order.id);
                    setOrder(await api.order(scopeId, order.id));
                    setConfirmCancel(false);
                    onPayment(payment.url);
                  })
                }
              >
                پرداخت آنلاین
              </button>
              {order.payment && (
                <button
                  className="sm-secondary"
                  type="button"
                  disabled={busy}
                  onClick={() =>
                    run(async () => {
                      const result = await api.verify(scopeId, order.id);
                      setOrder(await api.order(scopeId, order.id));
                      setNotice(
                        ["paid", "fulfilled"].includes(result.status)
                          ? "پرداخت تأیید شد."
                          : "پرداخت هنوز تأیید نشده است.",
                      );
                    })
                  }
                >
                  بررسی پرداخت
                </button>
              )}
              {order.canCancel && !confirmCancel && (
                <button
                  className="sm-secondary"
                  type="button"
                  disabled={busy}
                  onClick={() => setConfirmCancel(true)}
                >
                  لغو سفارش
                </button>
              )}
              {confirmCancel && (
                <div className="store-order-confirm">
                  <p>سفارش {order.id} لغو شود؟</p>
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() =>
                      run(async () => {
                        setOrder(await api.cancel(scopeId, order.id));
                        setConfirmCancel(false);
                      })
                    }
                  >
                    تأیید لغو
                  </button>
                  <button
                    className="sm-secondary"
                    type="button"
                    disabled={busy}
                    onClick={() => setConfirmCancel(false)}
                  >
                    انصراف
                  </button>
                </div>
              )}
            </div>
          )}
        </section>
      )}
    </section>
  );
}
export function ShopCart(props) {
  return <ShopCartContent key={`${props.scopeId}:${props.initialProductId ?? "cart"}`} {...props} />;
}
ShopCartContent.propTypes = ShopCart.propTypes = {
  api: PropTypes.object.isRequired,
  scopeId: PropTypes.number.isRequired,
  initialProductId: PropTypes.number,
  showOrders: PropTypes.bool,
  initialAddress: PropTypes.string,
  onPayment: PropTypes.func,
};
