import { BusinessSiteContext } from "./siteContext.js";
import { BusinessSiteRuntime } from "./BusinessSiteRuntime";
import { DomainContext } from "./domainContext";
import { useContext, useEffect, useMemo, useState } from "react";
import { Link, Navigate, useParams, useSearchParams } from "react-router-dom";
import DOMPurify from "dompurify";
import {
  createPublicApi,
  storefrontRoot,
  storefrontScope,
  checkoutReturnPath,
} from "./api";
import "./storefront.css";
import "./pos-tokens.css";
import "./pos-theme.css";
import "./academy-theme.css";
function useResource(load) {
  const [state, setState] = useState({ loading: true, data: null, error: "" });
  useEffect(() => {
    const controller = new AbortController();
    setState({ loading: true, data: null, error: "" });
    load(controller.signal)
      .then((data) => {
        if (!controller.signal.aborted)
          setState({ loading: false, data, error: "" });
      })
      .catch((error) => {
        if (!controller.signal.aborted)
          setState({ loading: false, data: null, error: error.message });
      });
    return () => controller.abort();
  }, [load]);
  return state;
}
function State({ state, children }) {
  if (state.loading)
    return (
      <p role="status" className="sf-state">
        در حال دریافت اطلاعات…
      </p>
    );
  if (state.error)
    return (
      <div role="alert" className="sf-state">
        {state.error}
      </div>
    );
  return children(state.data);
}
function SafeBody({ html, api, scope, root }) {
  const clean = DOMPurify.sanitize(html || "", {
    FORBID_TAGS: ["script", "iframe", "form", "input", "object", "embed"],
    FORBID_ATTR: ["style"],
    RETURN_DOM_FRAGMENT: true,
  });
  for (const image of clean.querySelectorAll("img[data-media-id]")) {
    const id = image.getAttribute("data-media-id");
    if (/^[1-9][0-9]*$/.test(id || ""))
      image.setAttribute("src", api.media(scope, Number(id)));
  }
  for (const anchor of clean.querySelectorAll("a[href]")) {
    const href = anchor.getAttribute("href");
    const media = href?.match(
      new RegExp(`^/api/blog/${scope}/media/([0-9]+)/file$`),
    );
    if (media) anchor.setAttribute("href", api.media(scope, Number(media[1])));
    const article = href?.match(
      new RegExp(`^/api/blog/${scope}/site/([a-z0-9-]+)$`),
    );
    if (article)
      anchor.setAttribute("href", `${root}/blog/posts/${article[1]}`);
  }
  const holder = document.createElement("div");
  holder.appendChild(clean);
  return (
    <div
      className="sf-prose"
      dangerouslySetInnerHTML={{ __html: holder.innerHTML }}
    />
  );
}
function Pager({ total, page, size, onChange }) {
  return (
    <nav className="sf-pager" aria-label="صفحه‌بندی">
      <button disabled={page <= 1} onClick={() => onChange(page - 1)}>
        قبلی
      </button>
      <span>صفحه {page.toLocaleString("fa-IR")}</span>
      <button
        disabled={page * size >= total}
        onClick={() => onChange(page + 1)}
      >
        بعدی
      </button>
    </nav>
  );
}
const money = (value) => `${Number(value).toLocaleString("fa-IR")} ریال`;
function Metadata({ title, description = "", seo = {}, schemas = [] }) {
  const siteOrigin = useContext(BusinessSiteContext)?.canonicalOrigin;
  const domain = useContext(DomainContext);
  useEffect(() => {
    const originalTitle = document.title,
      cleanups = [];
    document.title = `${title} | سنجاب`;
    const addMeta = (attribute, name, content) => {
      if (!content) return;
      const selector = `meta[${attribute}="${name}"]`;
      const existing = document.head.querySelector(selector);
      const element = existing || document.createElement("meta");
      const old = element.getAttribute("content");
      element.setAttribute(attribute, name);
      element.setAttribute("content", content);
      if (!existing) document.head.appendChild(element);
      cleanups.push(() => {
        if (existing) element.setAttribute("content", old || "");
        else element.remove();
      });
    };
    addMeta("name", "description", description);
    addMeta(
      "name",
      "robots",
      `${seo.index === false ? "noindex" : "index"}, ${seo.follow === false ? "nofollow" : "follow"}`,
    );
    for (const [attribute, name, content] of [
      ["property", "og:title", seo.ogTitle || title],
      ["property", "og:description", seo.ogDescription || description],
      ["property", "og:image", seo.ogImageUrl],
      ["name", "twitter:card", "summary_large_image"],
      ["name", "twitter:title", seo.twitterTitle || title],
      ["name", "twitter:description", seo.twitterDescription || description],
      ["name", "twitter:image", seo.twitterImageUrl],
    ])
      addMeta(attribute, name, content);
    const existing = document.head.querySelector('link[rel="canonical"]'),
      link = existing || document.createElement("link"),
      old = link.getAttribute("href");
    link.rel = "canonical";
    link.href =
      seo.canonicalUrl ||
      (siteOrigin || (domain
        ? window.location.pathname.startsWith("/blog")
          ? domain.blogOrigin
          : domain.shopOrigin
        : window.location.origin)) + window.location.pathname;
    if (!existing) document.head.appendChild(link);
    cleanups.push(() => {
      if (existing) link.setAttribute("href", old || "");
      else link.remove();
    });
    if (schemas.length) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(schemas);
      document.head.appendChild(script);
      cleanups.push(() => script.remove());
    }
    return () => {
      document.title = originalTitle;
      cleanups.forEach((cleanup) => cleanup());
    };
  }, [title, description, seo, schemas, domain, siteOrigin]);
  return null;
}
function ShopIndex({ api, scope, root }) {
  const site = useContext(BusinessSiteContext);
  const domain = useContext(DomainContext);
  const academy = scope > 0 && site?.template === "academy";
  const [params, setParams] = useSearchParams();
  const page = Math.max(1, Number(params.get("page")) || 1);
  const filters = useMemo(
    () =>
      Object.fromEntries(
        ["search", "level", "minPrice", "maxPrice", "sort", "page"].map(
          (key) => [
            key,
            params.get(key) ||
              (key === "sort" ? "newest" : key === "page" ? "1" : ""),
          ],
        ),
      ),
    [params],
  );
  const load = useMemo(
    () => (signal) => api.catalog(scope, filters, signal),
    [api, scope, filters],
  );
  const state = useResource(load);
  const heroImage = academy ? state.data?.items.find((item) => item.seo?.ogImageUrl)?.seo.ogImageUrl : null;
  const change = (key, value) => {
    const next = new URLSearchParams(params);
    value ? next.set(key, value) : next.delete(key);
    if (key !== "page") next.delete("page");
    setParams(next, { replace: true });
  };
  return (
    <>
      <Metadata title="فروشگاه" />
      {academy && <nav className="sf-academy-shortcuts" aria-label="دسترسی سریع">
        <Link to={`${root}/shop`}><span>✦</span>محصولات و دوره‌ها</Link>
        {(!domain || domain.blogEnabled) && <Link to={`${root}/blog`}><span>▤</span>وبلاگ</Link>}
        <Link to={`${root}/shop/cart`}><span>▣</span>سبد خرید</Link>
      </nav>}
      <div className="sf-hero">
        <p>فروشگاه</p>
        {scope === 0 && (
          <div className="sf-shop-mark" aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M5 8h14l1 13H4L5 8Z" />
              <path d="M8 9V6a4 4 0 0 1 8 0v3" />
            </svg>
          </div>
        )}
        <h1>
          {scope === 0 ? (
            <>
              فروشگاه سنجاب — انتخاب و <span>خرید آسان</span>
            </>
          ) : academy && site?.businessTitle ? (
            `به ${site.businessTitle} خوش آمدید`
          ) : (
            "انتخاب کنید، یاد بگیرید، شروع کنید."
          )}
        </h1>
        <span>
          محصولات و دوره‌ها را بررسی کنید و خریدهای خود را در حساب مشتری ببینید.
        </span>
        {heroImage && <img className="sf-academy-hero-image" src={heroImage} alt="" />}
      </div>
      {academy && <div className="sf-academy-heading"><div><h2>محصولات و دوره‌ها</h2><span>محصولات و آموزش‌های منتشرشده</span></div><a href="#sf-catalog">مشاهده محصولات</a></div>}
      <div id="sf-catalog">
      <div className="sf-filters">
        {[
          ["search", "جستجو"],
          ["level", "سطح دوره"],
          ["minPrice", "حداقل قیمت (ریال)"],
          ["maxPrice", "حداکثر قیمت (ریال)"],
        ].map(([key, label]) => (
          <label key={key}>
            {label}
            <input
              value={filters[key]}
              maxLength={key.includes("Price") ? 14 : 200}
              inputMode={key.includes("Price") ? "numeric" : undefined}
              onChange={(event) => change(key, event.target.value)}
            />
          </label>
        ))}
        <label>
          مرتب‌سازی
          <select
            value={filters.sort}
            onChange={(event) => change("sort", event.target.value)}
          >
            <option value="newest">جدیدترین</option>
            <option value="popular">پرفروش‌ترین</option>
            <option value="price-asc">ارزان‌ترین</option>
            <option value="price-desc">گران‌ترین</option>
          </select>
        </label>
      </div>
      <State state={state}>
        {(data) => (
          <>
            <div className="sf-grid">
              {data.items.map((product) => (
                <Link
                  className="sf-card"
                  key={product.id}
                  to={`${root}/shop/products/${product.slug}`}
                >
                  <div className="sf-product-image">
                    {product.seo?.ogImageUrl ? (
                      <img
                        src={product.seo.ogImageUrl}
                        alt={product.title}
                        loading="lazy"
                      />
                    ) : (
                      <span>سنجاب</span>
                    )}
                  </div>
                  <div className="sf-card-body">
                    <span className="sf-label">
                      {product.stock > 0 ? "موجود" : "ناموجود"}
                    </span>
                    <h2>{product.title}</h2>
                    {scope === 0 && (
                      <span className="sf-card-cta">مشاهده و خرید</span>
                    )}
                    <p>
                      {product.seo?.metaDescription || "مشاهده جزئیات محصول"}
                    </p>
                    <div className="sf-card-bottom">
                      <strong>{money(product.priceRials)}</strong>
                      {product.ratingCount > 0 && (
                        <span>
                          {Number(product.averageRating).toLocaleString(
                            "fa-IR",
                            { maximumFractionDigits: 1 },
                          )}{" "}
                          از ۵
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            {!data.items.length && (
              <p className="sf-state">محصولی با این مشخصات پیدا نشد.</p>
            )}
            <Pager
              total={data.total}
              page={page}
              size={data.pageSize}
              onChange={(value) => change("page", String(value))}
            />
          </>
        )}
      </State>
      </div>
    </>
  );
}
function Product({ api, scope, root, slug, CustomerProductComments }) {
  const Comments = CustomerProductComments;
  const load = useMemo(
    () => (signal) => api.product(scope, slug, signal),
    [api, scope, slug],
  );
  const state = useResource(load);
  return (
    <State state={state}>
      {(product) => (
        <>
          <Metadata
            title={product.seo?.metaTitle || product.title}
            description={product.seo?.metaDescription}
            seo={product.seo || {}}
          />
          <Link className="sf-back" to={`${root}/shop`}>
            بازگشت به فروشگاه
          </Link>
          <div className="sf-product-detail">
            <div className="sf-product-image">
              {product.seo?.ogImageUrl ? (
                <img src={product.seo.ogImageUrl} alt={product.title} />
              ) : (
                <span>سنجاب</span>
              )}
            </div>
            <div>
              <p className="sf-label">
                {product.stock > 0 ? "موجود" : "ناموجود"}
              </p>
              <h1>{product.title}</h1>
              <p className="sf-price">{money(product.priceRials)}</p>
              <Link
                className="sf-primary"
                to={`${root}/shop/cart?productId=${product.id}`}
              >
                {product.stock > 0 ? "ورود و خرید محصول" : "مشاهده حساب مشتری"}
              </Link>
              <dl>
                {(product.customFields || []).map((field) => (
                  <div key={field.key}>
                    <dt>{field.key}</dt>
                    <dd>{field.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <section className="sf-paper">
            <h2>درباره محصول</h2>
            <SafeBody
              html={product.description}
              api={api}
              scope={scope}
              root={root}
            />
            {product.itemGroups && <p>درس‌ها پس از خرید در دسترس هستند.</p>}
          </section>
          <section className="sf-paper">
            <Comments scopeId={scope} productId={product.id} />
          </section>
        </>
      )}
    </State>
  );
}
function BlogIndex({ api, scope, root, type, slug }) {
  const [params, setParams] = useSearchParams();
  const page = Math.max(1, Number(params.get("page")) || 1);
  const load = useMemo(
    () => (signal) => api.posts(scope, page, type, slug, signal),
    [api, scope, page, type, slug],
  );
  const state = useResource(load);
  return (
    <>
      <Metadata title="وبلاگ" />
      <div className="sf-hero sf-hero-blog">
        <p>وبلاگ</p>
        <h1>بخوانید و بیشتر بدانید.</h1>
        <span>تازه‌ترین نوشته‌ها، راهنماها و تجربه‌ها.</span>
      </div>
      <State state={state}>
        {(data) => (
          <>
            {data.term && (
              <div className="sf-paper">
                <h2>{data.term.title}</h2>
                <p>{data.term.description}</p>
                <Link to={`${root}/blog`}>همه نوشته‌ها</Link>
              </div>
            )}
            <div className="sf-grid">
              {data.items.map((post) => (
                <Link
                  className="sf-card"
                  key={post.id}
                  to={`${root}/blog/posts/${post.slug}`}
                >
                  <div className="sf-article-image">
                    {post.media?.featuredImageId ? (
                      <img
                        src={api.media(scope, post.media.featuredImageId)}
                        alt={post.title}
                        loading="lazy"
                      />
                    ) : (
                      <span>سنجاب</span>
                    )}
                  </div>
                  <div className="sf-card-body">
                    <span className="sf-label">
                      {post.author?.name || "وبلاگ"}
                    </span>
                    <h2>{post.title}</h2>
                    <p>{post.excerpt}</p>
                    <span>خواندن نوشته ←</span>
                  </div>
                </Link>
              ))}
            </div>
            {!data.items.length && (
              <p className="sf-state">هنوز نوشته‌ای منتشر نشده است.</p>
            )}
            <Pager
              total={data.total}
              page={page}
              size={data.pageSize}
              onChange={(value) => {
                const next = new URLSearchParams(params);
                next.set("page", String(value));
                setParams(next);
              }}
            />
          </>
        )}
      </State>
    </>
  );
}
function Article({ api, scope, root, slug, CustomerBlogComments }) {
  const Comments = CustomerBlogComments;
  const load = useMemo(
    () => (signal) => api.article(scope, slug, signal),
    [api, scope, slug],
  );
  const state = useResource(load);
  return (
    <State state={state}>
      {(article) => (
        <>
          <Metadata
            title={article.seo?.metaTitle || article.title}
            description={article.seo?.metaDescription || article.excerpt}
            seo={article.seo || {}}
            schemas={article.schemas || []}
          />
          <Link className="sf-back" to={`${root}/blog`}>
            بازگشت به وبلاگ
          </Link>
          <article className="sf-paper sf-article">
            <header>
              <span className="sf-label">{article.author?.name}</span>
              <h1>{article.title}</h1>
              <time dateTime={article.publishedAt}>
                {new Date(article.publishedAt).toLocaleDateString("fa-IR")}
              </time>
              <p>{article.excerpt}</p>
            </header>
            {article.media?.featuredImageId && (
              <img
                className="sf-cover"
                src={api.media(scope, article.media.featuredImageId)}
                alt={
                  article.assets.find(
                    (asset) => asset.id === article.media.featuredImageId,
                  )?.altText || article.title
                }
              />
            )}
            <SafeBody html={article.body} api={api} scope={scope} root={root} />
            <div className="sf-gallery">
              {(article.media?.galleryIds || []).map((id) => (
                <figure key={id}>
                  <img
                    src={api.media(scope, id)}
                    alt={
                      article.assets.find((asset) => asset.id === id)
                        ?.altText || article.title
                    }
                    loading="lazy"
                  />
                  <figcaption>
                    {article.assets.find((asset) => asset.id === id)?.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
            {(article.media?.videoIds || []).map((id) => (
              <video
                key={id}
                controls
                preload="metadata"
                src={api.media(scope, id)}
              />
            ))}
            {(article.media?.attachmentIds || []).map((id) => (
              <p key={id}>
                <a href={api.media(scope, id)} download>
                  {article.assets.find((asset) => asset.id === id)
                    ?.originalName || "دریافت فایل"}
                </a>
              </p>
            ))}
            <div className="sf-terms">
              {article.terms.map((term) => (
                <Link
                  key={term.id}
                  to={`${root}/blog/${term.type}/${term.slug}`}
                >
                  {term.title}
                </Link>
              ))}
            </div>
          </article>
          <section className="sf-paper">
            <Comments scopeId={scope} postId={article.id} />
          </section>
          {article.related.length > 0 && (
            <section>
              <h2>نوشته‌های مرتبط</h2>
              <div className="sf-grid">
                {article.related.map((post) => (
                  <Link
                    className="sf-card sf-card-body"
                    key={post.id}
                    to={`${root}/blog/posts/${post.slug}`}
                  >
                    <h3>{post.title}</h3>
                    <p>{post.excerpt}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </State>
  );
}
export function Storefront({
  baseUrl,
  view,
  CustomerShop,
  CustomerBlogComments,
  CustomerProductComments,
}) {
  const domain = useContext(DomainContext);
  const params = useParams();
  const [search] = useSearchParams();
  let scope;
  try {
    scope = domain ? domain.scopeId : storefrontScope(params.businessId);
  } catch (error) {
    return (
      <div className="sf-state" role="alert">
        {error.message}
      </div>
    );
  }
  const feature =
    view.startsWith("blog") || view === "article" ? "blog" : "shop";
  if (domain && !domain[`${feature}Enabled`])
    return (
      <div dir="rtl" role="alert" className="sf-state">
        این بخش برای این دامنه فعال نیست.
      </div>
    );
  if (domain && params.businessId)
    return <Navigate to={`/${feature}`} replace />;
  const callbackPath =
    !domain && view === "shop-cart"
      ? checkoutReturnPath(search.toString(), scope)
      : null;
  if (callbackPath) return <Navigate to={callbackPath} replace />;
  return (
    <ScopedStorefront
      key={scope}
      scope={scope}
      params={params}
      baseUrl={baseUrl}
      view={view}
      CustomerShop={CustomerShop}
      CustomerBlogComments={CustomerBlogComments}
      CustomerProductComments={CustomerProductComments}
    />
  );
}
function ScopedStorefront({
  scope,
  params,
  baseUrl,
  view,
  CustomerShop,
  CustomerBlogComments,
  CustomerProductComments,
}) {
  const domain = useContext(DomainContext);
  const Cart = CustomerShop;
  const api = useMemo(() => createPublicApi(baseUrl), [baseUrl]);
  const root = domain ? "" : storefrontRoot(scope);
  return (
    <BusinessSiteRuntime api={api} scope={scope} root={root}>
      <StorefrontFrame {...{ scope, params, view, CustomerBlogComments, CustomerProductComments, Cart, api, root, domain }} />
    </BusinessSiteRuntime>
  );
}
function StorefrontFrame({ scope, params, view, CustomerBlogComments, CustomerProductComments, Cart, api, root, domain }) {
  const site = useContext(BusinessSiteContext);
  const academy = scope > 0 && site?.template === "academy";
  return (
      <div
        className={`sf-site${scope === 0 && (view.startsWith("shop") || view === "product") ? " sf-pos" : ""}${academy ? " sf-academy" : ""}`}
        dir="rtl"
        lang="fa"
      >
        <header className="sf-header">
          <Link className="sf-brand" to={root ? `${root}/shop` : "/"}>
            {academy ? site?.businessTitle || "فروشگاه" : "سنجاب"}
            <span>
              {scope > 0 ? "فروشگاه و وبلاگ کسب‌وکار" : "فروشگاه و وبلاگ"}
            </span>
          </Link>
          <nav aria-label="ناوبری سایت">
            {(!domain || domain.shopEnabled) && (
              <Link
                to={`${root}/shop`}
                aria-current={
                  view.startsWith("shop") || view === "product"
                    ? "page"
                    : undefined
                }
              >
                فروشگاه
              </Link>
            )}
            {(!domain || domain.blogEnabled) && (
              <Link
                to={`${root}/blog`}
                aria-current={
                  view.startsWith("blog") || view === "article"
                    ? "page"
                    : undefined
                }
              >
                وبلاگ
              </Link>
            )}
            {(!domain || domain.shopEnabled) && (
              <Link to={`${root}/shop/cart`}>سبد خرید و سفارش‌ها</Link>
            )}
          </nav>
        </header>
        <main className="sf-main">
          {view === "shop" && <ShopIndex api={api} scope={scope} root={root} />}{" "}
          {view === "product" && (
            <Product
              key={params.slug}
              api={api}
              scope={scope}
              root={root}
              slug={params.slug}
              CustomerProductComments={CustomerProductComments}
            />
          )}{" "}
          {view === "blog" && <BlogIndex api={api} scope={scope} root={root} />}{" "}
          {view === "blog-archive" && (
            <BlogIndex
              api={api}
              scope={scope}
              root={root}
              type={params.type}
              slug={params.slug}
            />
          )}{" "}
          {view === "article" && (
            <Article
              key={params.slug}
              api={api}
              scope={scope}
              root={root}
              slug={params.slug}
              CustomerBlogComments={CustomerBlogComments}
            />
          )}{" "}
          {view === "shop-cart" && (
            <>
              <Metadata
                title="حساب مشتری"
                seo={{ index: false, follow: false }}
              />
              <div className="sf-paper">
                <Cart scopeId={scope} />
              </div>
            </>
          )}
        </main>
        <footer className="sf-footer">
          {(!domain || domain.shopEnabled) && (
            <Link to={`${root}/shop`}>فروشگاه</Link>
          )}
          {(!domain || domain.blogEnabled) && (
            <Link to={`${root}/blog`}>وبلاگ</Link>
          )}
          <span>
            {scope === 0 && (view.startsWith("shop") || view === "product")
              ? "© سنجاب — فروشگاه"
              : "سنجاب"}
          </span>
        </footer>
      </div>
  );
}
