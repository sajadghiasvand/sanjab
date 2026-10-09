import { useEffect, useState } from "react";
import PropTypes from "prop-types";
export function BlogComments({
  api,
  scopeId,
  postId,
  loggedIn = false,
  loginContent,
  kind = "blog",
}) {
  const [rating, setRating] = useState("");
  const [items, setItems] = useState([]),
    [page, setPage] = useState(1),
    [total, setTotal] = useState(0),
    [body, setBody] = useState(""),
    [busy, setBusy] = useState(false),
    [error, setError] = useState(""),
    [message, setMessage] = useState("");
  useEffect(() => {
    const controller = new AbortController();
    setError("");
    (kind === "shop" ? api.productComments : api.comments)(
      scopeId,
      postId,
      page,
      controller.signal,
    )
      .then((result) => {
        if (!controller.signal.aborted) {
          setItems(result.items);
          setTotal(result.total);
        }
      })
      .catch((err) => {
        if (!controller.signal.aborted) setError(err.message);
      });
    return () => controller.abort();
  }, [api, scopeId, postId, page, kind]);
  async function send(event) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      await (kind === "shop" ? api.productComment : api.comment)(
        scopeId,
        postId,
        body,
        kind === "shop" ? rating : undefined,
      );
      setBody("");
      setRating("");
      setMessage("دیدگاه ثبت شد و پس از تأیید نمایش داده می‌شود.");
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <section className="sm-management" dir="rtl">
      <h2>دیدگاه‌ها</h2>
      {error && <p role="alert">{error}</p>}
      {message && <p role="status">{message}</p>}
      {items.map((item) => (
        <article key={item.id}>
          <strong>{item.authorName}</strong>
          {kind === "shop" && item.rating && <span> · {item.rating} از ۵</span>}
          <p style={{ whiteSpace: "pre-wrap" }}>{item.body}</p>
        </article>
      ))}
      <button
        disabled={page === 1}
        onClick={() => setPage((value) => value - 1)}
      >
        قبلی
      </button>
      <button
        disabled={page * 50 >= total}
        onClick={() => setPage((value) => value + 1)}
      >
        بعدی
      </button>
      {loggedIn ? (
        <form onSubmit={send}>
          {kind === "shop" && (
            <label>
              امتیاز
              <select
                value={rating}
                onChange={(event) => setRating(event.target.value)}
              >
                <option value="">بدون امتیاز</option>
                {[1, 2, 3, 4, 5].map((value) => (
                  <option key={value} value={value}>
                    {value} از ۵
                  </option>
                ))}
              </select>
            </label>
          )}
          <label>
            دیدگاه
            <textarea
              maxLength={4000}
              required
              value={body}
              onChange={(event) => setBody(event.target.value)}
            />
          </label>
          <button disabled={busy || !body.trim()}>ثبت دیدگاه</button>
        </form>
      ) : (
        loginContent || <p>برای ثبت دیدگاه وارد حساب مشتری شوید.</p>
      )}
    </section>
  );
}
BlogComments.propTypes = {
  api: PropTypes.object.isRequired,
  scopeId: PropTypes.number.isRequired,
  postId: PropTypes.number.isRequired,
  loggedIn: PropTypes.bool,
  loginContent: PropTypes.node,
  kind: PropTypes.oneOf(["blog", "shop"]),
};
