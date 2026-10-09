import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
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
  onPayment = (url) => window.location.assign(url),
}) {
  const [filters, setFilters] = useState({
    search: "",
    level: "",
    minPrice: "",
    maxPrice: "",
    sort: "newest",
  });
  const [lessons, setLessons] = useState(null);
  const [cart, setCart] = useState(null);
  const [orders, setOrders] = useState({ items: [], total: 0 });
  const [catalog, setCatalog] = useState({ items: [], total: 0 });
  const [page, setPage] = useState(1);
  const [orderPage, setOrderPage] = useState(1);
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [note, setNote] = useState("");
  const [order, setOrder] = useState(null);
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [confirmCancel, setConfirmCancel] = useState(false);
  const [revision, setRevision] = useState(0);
  const checkoutAttempt = useRef(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError("");
    Promise.all([
      api.cart(scopeId, controller.signal),
      api.orders(scopeId, orderPage, controller.signal),
      api.browse
        ? api.browse(scopeId, page, controller.signal, filters)
        : api.catalog(scopeId, page, controller.signal),
    ])
      .then(([nextCart, nextOrders, nextCatalog]) => {
        if (!controller.signal.aborted) {
          setCart(nextCart);
          setOrders(nextOrders);
          setCatalog(nextCatalog);
        }
      })
      .catch((err) => {
        if (!controller.signal.aborted) setError(err.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [api, scopeId, page, orderPage, revision, filters]);

  useEffect(() => {
    setCart(null);
    setOrder(null);
    const selectedProduct = Number(
      new URLSearchParams(window.location.search).get("productId"),
    );
    setProductId(
      Number.isSafeInteger(selectedProduct) && selectedProduct > 0
        ? String(selectedProduct)
        : "",
    );
    setConfirmCancel(false);
    checkoutAttempt.current = null;
  }, [scopeId, api]);

  useEffect(() => {
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
        if (!controller.signal.aborted) setOrder(data);
      })
      .catch((err) => {
        if (!controller.signal.aborted) setError(err.message);
      });
    return () => controller.abort();
  }, [api, scopeId]);

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
    const created = await api.checkout(scopeId, {
      checkoutKey: checkoutAttempt.current.key,
      cartVersion: cart.version,
      address,
      note,
      ...(promoCode.trim() ? { promoCode: promoCode.trim() } : {}),
    });
    setOrder(created);
    setConfirmCancel(false);
    checkoutAttempt.current = null;
    setNotice("سفارش ثبت شد. برای تکمیل خرید پرداخت را انجام دهید.");
  }

  return (
    <section className="sm-management" dir="rtl">
      <div className="sm-header">
        <h1>سبد خرید</h1>
        <div className="sm-toolbar">
          {[
            ["search", "جستجوی محصول"],
            ["level", "سطح دوره"],
            ["minPrice", "حداقل قیمت (ریال)"],
            ["maxPrice", "حداکثر قیمت (ریال)"],
          ].map(([key, label]) => (
            <label key={key}>
              {label}
              <input
                value={filters[key]}
                maxLength={key.includes("Price") ? 14 : 200}
                onChange={(event) => {
                  setFilters({ ...filters, [key]: event.target.value });
                  setPage(1);
                }}
              />
            </label>
          ))}
          <label>
            مرتب‌سازی
            <select
              value={filters.sort}
              onChange={(event) => {
                setFilters({ ...filters, sort: event.target.value });
                setPage(1);
              }}
            >
              <option value="newest">جدیدترین</option>
              <option value="price-asc">ارزان‌ترین</option>
              <option value="price-desc">گران‌ترین</option>
              <option value="popular">پرفروش‌ترین</option>
            </select>
          </label>
        </div>
        {lessons && (
          <section className="sm-card">
            <h2>{lessons.title}</h2>
            {lessons.itemGroups.map((group, index) => (
              <div key={index}>
                <h3>{group.name}</h3>
                {group.items.map((item, index) => (
                  <p key={index}>
                    <strong>{item.key}: </strong>
                    {/^https?:\/\//.test(item.value) ? (
                      <a
                        href={item.value}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        مشاهده درس یا فایل
                      </a>
                    ) : (
                      <span>{item.value}</span>
                    )}
                  </p>
                ))}
              </div>
            ))}
            <button onClick={() => setLessons(null)}>بستن درس‌ها</button>
          </section>
        )}

        <button
          type="button"
          disabled={busy || loading}
          onClick={() => setRevision((value) => value + 1)}
        >
          تازه‌سازی
        </button>
      </div>
      {error && (
        <p role="alert" className="sm-error">
          {error}
        </p>
      )}
      {notice && <p role="status">{notice}</p>}
      {loading ? (
        <p role="status">در حال دریافت فروشگاه…</p>
      ) : (
        cart && (
          <>
            <form
              className="sm-order-actions"
              onSubmit={(event) => {
                event.preventDefault();
                run(async () => {
                  await api.setItem(scopeId, Number(productId), quantity);
                  setProductId("");
                });
              }}
            >
              <label>
                محصول
                <select
                  required
                  value={productId}
                  disabled={busy}
                  onChange={(event) => setProductId(event.target.value)}
                >
                  <option value="">انتخاب محصول</option>
                  {productId &&
                    !catalog.items.some(
                      (item) => String(item.id) === productId,
                    ) && <option value={productId}>محصول انتخاب‌شده</option>}

                  {catalog.items.map((product) => (
                    <option
                      key={product.id}
                      value={product.id}
                      disabled={product.stock < 1}
                    >
                      {product.title} — {money(product.priceRials)}
                      {product.ratingCount
                        ? ` · ${Number(product.averageRating).toLocaleString("fa-IR", { maximumFractionDigits: 1 })} از ۵ (${product.ratingCount})`
                        : ""}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                تعداد
                <input
                  type="number"
                  required
                  min="1"
                  max="9999"
                  value={quantity}
                  disabled={busy}
                  onChange={(event) => setQuantity(Number(event.target.value))}
                />
              </label>
              <button type="submit" disabled={busy || !productId}>
                افزودن / تغییر تعداد
              </button>
            </form>
            <div className="sm-pagination">
              <button
                type="button"
                disabled={page === 1 || busy}
                onClick={() => {
                  setProductId("");
                  setPage((value) => value - 1);
                }}
              >
                محصولات قبلی
              </button>
              <button
                type="button"
                disabled={page * 50 >= catalog.total || busy}
                onClick={() => {
                  setProductId("");
                  setPage((value) => value + 1);
                }}
              >
                محصولات بعدی
              </button>
            </div>
            <div className="sm-table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>محصول</th>
                    <th>تعداد</th>
                    <th>جمع</th>
                    <th>وضعیت</th>
                    <th>حذف</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.items.map((item) => (
                    <tr key={item.productId}>
                      <td>{item.title}</td>
                      <td>{item.quantity}</td>
                      <td>{money(item.totalRials)}</td>
                      <td>{item.available ? "موجود" : "ناموجود"}</td>
                      <td>
                        <button
                          type="button"
                          disabled={busy}
                          onClick={() =>
                            run(() => api.removeItem(scopeId, item.productId))
                          }
                        >
                          حذف
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {!cart.items.length && <p>سبد خرید خالی است.</p>}
            <p>جمع سبد: {money(cart.totalRials)}</p>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                run(checkout);
              }}
            >
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
              <button
                type="submit"
                disabled={
                  busy ||
                  !cart.items.length ||
                  cart.items.some((item) => !item.available)
                }
              >
                ثبت سفارش
              </button>
            </form>
          </>
        )
      )}
      <h2>سفارش‌های من</h2>
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
      {order && (
        <section className="sm-order-detail" aria-label="سفارش انتخاب‌شده">
          <h2>سفارش {order.id}</h2>
          <p>
            {statuses[order.status]} — {money(order.totalRials)}
          </p>
          {Number(order.discountRials) > 0 && (
            <p>
              کد تخفیف: {order.promoCode} — تخفیف: {money(order.discountRials)}{" "}
              — جمع قبل از تخفیف: {money(order.subtotalRials)}
            </p>
          )}
          {["paid", "fulfilled"].includes(order.status) &&
            api.lessons &&
            order.products.map((product) => (
              <button
                key={product.productId}
                disabled={busy}
                onClick={async () => {
                  setBusy(true);
                  setError("");
                  try {
                    setLessons(await api.lessons(scopeId, product.productId));
                  } catch (error) {
                    setError(error.message);
                  } finally {
                    setBusy(false);
                  }
                }}
              >
                درس‌های {product.title}
              </button>
            ))}
          {order.products.map((product) => (
            <p key={product.id}>
              {product.title} × {product.quantity} — {money(product.totalRials)}
            </p>
          ))}
          <p>
            شناسه تراکنش: {order.transactionId || "—"} — کد پیگیری:{" "}
            {order.payment?.referenceId || "—"}
          </p>
          {order.status === "pending" && (
            <div className="sm-order-actions">
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
                  type="button"
                  disabled={busy}
                  onClick={() => setConfirmCancel(true)}
                >
                  لغو سفارش
                </button>
              )}
              {confirmCancel && (
                <div>
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
  return <ShopCartContent key={props.scopeId} {...props} />;
}
ShopCartContent.propTypes = ShopCart.propTypes = {
  api: PropTypes.object.isRequired,
  scopeId: PropTypes.number.isRequired,
  onPayment: PropTypes.func,
};
