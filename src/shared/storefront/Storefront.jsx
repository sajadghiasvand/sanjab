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
function AcademyFilters({ filters, change }) {
  return <div className="sf-filters">{[["search", "جستجو"], ["level", "سطح دوره"], ["minPrice", "حداقل قیمت (ریال)"], ["maxPrice", "حداکثر قیمت (ریال)"]].map(([key, label]) => <label key={key}>{label}<input value={filters[key]} maxLength={key.includes("Price") ? 14 : 200} inputMode={key.includes("Price") ? "numeric" : undefined} onChange={(event) => change(key, event.target.value)} /></label>)}<label>مرتب‌سازی<select value={filters.sort} onChange={(event) => change("sort", event.target.value)}><option value="newest">جدیدترین</option><option value="popular">پرفروش‌ترین</option><option value="price-asc">ارزان‌ترین</option><option value="price-desc">گران‌ترین</option></select></label></div>;
}
function AcademyArticles({ api, scope, root, enabled }) {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    if (!enabled) return undefined;
    const controller = new AbortController();
    api.posts(scope, 1, undefined, undefined, controller.signal).then((data) => { if (!controller.signal.aborted) setPosts(Array.isArray(data.items) ? data.items.slice(0, 4) : []); }).catch(() => {});
    return () => controller.abort();
  }, [api, scope, enabled]);
  if (!posts.length) return null;
  return <section className="sf-academy-articles"><div className="sf-academy-heading"><div className="sf-academy-title"><span className="sf-academy-title-icon" aria-hidden="true">▤</span><div><h2>مطالب آموزشی</h2><span>تازه‌ترین نوشته‌ها</span></div></div><Link to={`${root}/blog`}>مشاهده همه ←</Link></div><div className="sf-grid">{posts.map((post) => <Link className="sf-card" key={post.id} to={`${root}/blog/posts/${post.slug}`}><div className="sf-article-image">{post.media?.featuredImageId ? <img src={api.media(scope, post.media.featuredImageId)} alt={post.title} loading="lazy" /> : <span>سنجاب</span>}</div><div className="sf-card-body"><h2>{post.title}</h2>{post.excerpt && <p>{post.excerpt}</p>}<span className="sf-academy-card-action">خواندن مطلب ←</span></div></Link>)}</div></section>;
}
function CatalogCategories({ api, scope, selected, change }) {
  const load = useMemo(() => (signal) => api.categories(scope, signal), [api, scope]);
  const state = useResource(load);
  if (state.loading) return <p role="status" className="sf-catalog-category-state">در حال دریافت دسته‌بندی‌ها…</p>;
  if (state.error) return <p role="alert" className="sf-catalog-category-state">دریافت دسته‌بندی‌ها ناموفق بود: {state.error}</p>;
  if (!state.data?.length) return null;
  return <nav className="sf-catalog-categories" aria-label="دسته‌بندی محصولات"><button type="button" className={!selected ? "is-active" : ""} aria-pressed={!selected} onClick={() => change("category", "")}><strong>همه محصولات</strong><span>همه دسته‌ها</span><i aria-hidden="true">✦</i></button>{state.data.map((category) => <button key={category.id} type="button" className={selected === String(category.id) ? "is-active" : ""} aria-pressed={selected === String(category.id)} onClick={() => change("category", String(category.id))}><strong>{category.title}</strong><span>{Number(category.productCount).toLocaleString("fa-IR")} محصول</span><i aria-hidden="true">◈</i></button>)}</nav>;
}
function CatalogToolbar({ root, filters, change }) {
  const [search, setSearch] = useState(filters.search);
  useEffect(() => setSearch(filters.search), [filters.search]);
  return <div className="sf-catalog-toolbar"><nav className="sf-catalog-crumb" aria-label="مسیر صفحه"><Link to={`${root}/shop`}>صفحه اصلی</Link><span aria-hidden="true">‹</span><span>محصولات و دوره‌ها</span></nav><form className="sf-catalog-search" onSubmit={(event) => { event.preventDefault(); change("search", search.trim()); }}><label className="sf-catalog-search-label" htmlFor="sf-catalog-search">جستجو در محصولات</label><input id="sf-catalog-search" value={search} onChange={(event) => setSearch(event.target.value)} maxLength={200} placeholder="جستجو در میان محصولات و دوره‌ها" /><button type="submit">جستجو</button></form></div>;
}
function ShopIndex({ api, scope, root, catalogPage = false }) {
  const site = useContext(BusinessSiteContext);
  const domain = useContext(DomainContext);
  const academy = scope > 0 && site?.template === "academy";
  const [params, setParams] = useSearchParams();
  const page = Math.max(1, Number(params.get("page")) || 1);
  const filters = useMemo(
    () =>
      Object.fromEntries(
        ["category", "search", "level", "minPrice", "maxPrice", "sort", "page"].map(
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
  const heroProduct = academy ? state.data?.items.find((item) => item.imageIds?.length || item.seo?.ogImageUrl) : null;
  const heroImage = heroProduct?.imageIds?.length ? api.productImage(scope, heroProduct.imageIds[0]) : heroProduct?.seo?.ogImageUrl;
  const change = (key, value) => {
    const next = new URLSearchParams(params);
    value ? next.set(key, value) : next.delete(key);
    if (key !== "page") next.delete("page");
    setParams(next, { replace: true });
  };
  return (
    <>
      <Metadata title={catalogPage ? "محصولات و دوره‌ها" : "فروشگاه"} />
      {catalogPage && <><CatalogToolbar root={root} filters={filters} change={change} /><CatalogCategories api={api} scope={scope} selected={filters.category} change={change} /></>}
      {!catalogPage && academy && <nav className="sf-academy-shortcuts" aria-label="دسترسی سریع">
        <a href="#sf-catalog"><span aria-hidden="true">✦</span>دوره‌ها</a>
        {(!domain || domain.blogEnabled) && <Link to={`${root}/blog`}><span aria-hidden="true">▤</span>مطالب آموزشی</Link>}
        <Link to={`${root}/shop/cart`}><span aria-hidden="true">▣</span>سبد خرید</Link>
        <Link to={`${root}/shop/cart`}><span aria-hidden="true">♙</span>حساب کاربری</Link>
      </nav>}
      {!catalogPage && <div className={`sf-hero${academy ? " sf-academy-home-hero" : ""}`}>
        <p>{academy ? "آموزش و تجربه" : "فروشگاه"}</p>
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
        {academy && <a className="sf-academy-hero-link" href="#sf-catalog">مشاهده دوره‌ها <span aria-hidden="true">←</span></a>}
      </div>}
      {(academy || catalogPage) && <div className="sf-academy-heading sf-catalog-heading"><div className="sf-academy-title"><span className="sf-academy-title-icon" aria-hidden="true">✦</span><div><h2>دوره‌های آموزشی</h2><span>محصولات و آموزش‌های منتشرشده</span></div></div>{catalogPage ? <label className="sf-catalog-sort">مرتب‌سازی <select value={filters.sort} onChange={(event) => change("sort", event.target.value)}><option value="newest">جدیدترین</option><option value="popular">پرفروش‌ترین</option><option value="price-asc">ارزان‌ترین</option><option value="price-desc">گران‌ترین</option></select></label> : <Link to={`${root}/shop/products`}>مشاهده همه <span aria-hidden="true">←</span></Link>}</div>}
      <div id="sf-catalog">
      {academy && !catalogPage && <details className="sf-academy-filter-toggle" open={Boolean(filters.search || filters.level || filters.minPrice || filters.maxPrice || filters.sort !== "newest")}><summary>جستجو و فیلتر دوره‌ها</summary>
        <AcademyFilters filters={filters} change={change} />
      </details>}
      {!academy && !catalogPage && <div className="sf-filters">
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
      </div>}
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
                    {product.imageIds?.length || product.seo?.ogImageUrl ? (
                      <img
                        src={product.imageIds?.length ? api.productImage(scope, product.imageIds[0]) : product.seo.ogImageUrl}
                        alt={product.title}
                        loading="lazy"
                      />
                    ) : (
                      <span>سنجاب</span>
                    )}
                  </div>
                  <div className="sf-card-body">
                    {!academy && <span className="sf-label">
                      {product.stock > 0 ? "موجود" : "ناموجود"}
                    </span>}
                    <h2>{product.title}</h2>
                    {scope === 0 && (
                      <span className="sf-card-cta">مشاهده و خرید</span>
                    )}
                    {!academy && <p>{product.seo?.metaDescription || "مشاهده جزئیات محصول"}</p>}
                    {!!product.itemGroups?.length && <div className="sf-course-summary"><strong>سرفصل‌ها</strong>{product.itemGroups.map((group, index) => <p key={index}>{group.name}{group.items?.length ? `: ${group.items.map((item) => item.key).join("، ")}` : ""}</p>)}</div>}
                    {academy && <div className="sf-academy-card-meta">{!!product.itemGroups?.length && <span>{product.itemGroups.reduce((total, group) => total + (group.items || []).length, 0).toLocaleString("fa-IR")} جلسه</span>}<span>{product.stock > 0 ? "موجود" : "ناموجود"}</span></div>}
                    <div className="sf-card-bottom">
                      {academy && <span className="sf-academy-card-action">مشاهده و خرید ←</span>}
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
      {academy && !catalogPage && <section className="sf-academy-about"><div className="sf-academy-about-mark" aria-hidden="true"><span>✦</span><strong>{site?.businessTitle || "فروشگاه"}</strong></div><div><span className="sf-academy-eyebrow">آشنایی با مجموعه</span><h2>{site?.businessTitle || "فروشگاه و دوره‌ها"}</h2><p>محصولات و دوره‌های این مجموعه را بررسی کنید و محتوای خریداری‌شده را در حساب خود ببینید.</p><a href="#sf-catalog">مشاهده دوره‌ها ←</a></div></section>}
      {academy && !catalogPage && <AcademyArticles api={api} scope={scope} root={root} enabled={!domain || domain.blogEnabled} />}
    </>
  );
}
function BusinessProduct({ product, api, scope, root, Comments, access, retry }) {
  const images = (product.imageIds || []).map((id) => api.productImage(scope, id));
  if (!images.length && product.seo?.ogImageUrl) images.push(product.seo.ogImageUrl);
  const [selectedImage, setSelectedImage] = useState(0);
  const groups = access.status === "purchased" ? access.groups : product.itemGroups || [];
  const lessonCount = groups.reduce((total, group) => total + (group.items || []).length, 0);
  return (
    <div className="sf-course-product">
      <nav className="sf-course-breadcrumb" aria-label="مسیر صفحه">
        <Link to={`${root}/shop`}>فروشگاه</Link><span aria-hidden="true">/</span><span>{product.title}</span>
      </nav>
      <div className="sf-course-layout">
        <div className="sf-course-content">
          <div className="sf-course-media">
            {images.length ? <img src={images[selectedImage] || images[0]} alt={product.title} /> : <span>سنجاب</span>}
          </div>
          {images.length > 1 && <div className="sf-course-thumbnails" aria-label="تصاویر محصول">{images.map((image, index) => <button type="button" className={index === selectedImage ? "is-active" : ""} key={image} onClick={() => setSelectedImage(index)} aria-label={`نمایش تصویر ${index + 1}`} aria-pressed={index === selectedImage}><img src={image} alt="" /></button>)}</div>}
          <section className="sf-course-section">
            <h2>توضیحات {groups.length ? "دوره" : "محصول"}</h2>
            <SafeBody html={product.description} api={api} scope={scope} root={root} />
          </section>
          {!!groups.length && <section className="sf-course-section sf-course-lessons"><div className="sf-course-section-heading"><h2>جلسات دوره</h2><span>{lessonCount.toLocaleString("fa-IR")} جلسه</span></div>{groups.map((group, index) => <div className="sf-course-group" key={index}><h3>{group.name}</h3>{(group.items || []).map((item, itemIndex) => <div className="sf-course-lesson" key={itemIndex}><span className="sf-course-lesson-number">{(itemIndex + 1).toLocaleString("fa-IR")}</span><span>{item.key}</span>{access.status === "purchased" ? (/^https?:\/\//i.test(item.value || "") ? <a href={item.value} target="_blank" rel="noopener noreferrer">مشاهده درس یا فایل</a> : <span>{item.value}</span>) : <span className="sf-course-private">پس از خرید</span>}</div>)}</div>)}{access.status !== "purchased" && <p className="sf-course-note">محتوای هر درس پس از خرید و پرداخت در دسترس است.</p>}</section>}
          <section className="sf-course-section sf-course-comments"><h2>نظرات</h2><Comments scopeId={scope} productId={product.id} /></section>
        </div>
        <aside className="sf-course-aside"><div className="sf-course-purchase"><span className="sf-course-kicker">{groups.length ? "دوره آموزشی" : "محصول"}</span><h1>{product.title}</h1><span className="sf-course-stock">{product.stock > 0 ? "موجود" : "ناموجود"}</span><div className="sf-course-price"><span>قیمت</span><strong>{money(product.priceRials)}</strong></div>{access.status === "purchased" ? <span className="sf-primary sf-course-buy">خریداری شده</span> : access.status === "checking" ? <span role="status">در حال بررسی خرید…</span> : access.status === "error" ? <button type="button" onClick={retry}>خطا در بررسی خرید؛ تلاش دوباره</button> : <Link className="sf-primary sf-course-buy" to={`${root}/shop/cart?productId=${product.id}`}>{product.stock > 0 ? (groups.length ? "ثبت نام در دوره" : "خرید محصول") : "مشاهده حساب مشتری"}</Link>}{(product.customFields || []).length > 0 && <dl>{product.customFields.map((field, index) => <div key={index}><dt>{field.key}</dt><dd>{field.value}</dd></div>)}</dl>}</div></aside>
      </div>
    </div>
  );
}
function Product({ api, scope, root, slug, CustomerProductComments, CustomerProductAccess }) {
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
          {CustomerProductAccess ? <CustomerProductAccess scopeId={scope} productId={product.id}>{(access, retry) => <BusinessProduct key={product.id} product={product} api={api} scope={scope} root={root} Comments={Comments} access={access} retry={retry} />}</CustomerProductAccess> : scope > 0 ? <BusinessProduct key={product.id} product={product} api={api} scope={scope} root={root} Comments={Comments} access={{ status: "guest" }} /> : <>
          <Link className="sf-back" to={`${root}/shop`}>
            بازگشت به فروشگاه
          </Link>
          <div className="sf-product-detail">
            <div className="sf-product-image">
              {product.imageIds?.length || product.seo?.ogImageUrl ? (
                <img src={product.imageIds?.length ? api.productImage(scope, product.imageIds[0]) : product.seo.ogImageUrl} alt={product.title} />
              ) : (
                <span>سنجاب</span>
              )}
            </div>
            <div>
              {product.imageIds?.length > 1 && <div className="sf-gallery">{product.imageIds.slice(1).map((id) => <img key={id} src={api.productImage(scope, id)} alt={product.title} loading="lazy" />)}</div>}
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

          </section>
          {!!product.itemGroups?.length && <section className="sf-paper"><h2>سرفصل‌های دوره</h2>{product.itemGroups.map((group, index) => <div key={index}><h3>{group.name}</h3><ul>{(group.items || []).map((item, itemIndex) => <li key={itemIndex}>{item.key}</li>)}</ul></div>)}<p>محتوای هر درس پس از خرید و پرداخت در دسترس است.</p></section>}
          <section className="sf-paper">
            <Comments scopeId={scope} productId={product.id} />
          </section>
          </>}
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
  CustomerAccount,
  CustomerBlogComments,
  CustomerProductComments,
  CustomerProductAccess,
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
      CustomerAccount={CustomerAccount}
      CustomerBlogComments={CustomerBlogComments}
      CustomerProductComments={CustomerProductComments}
      CustomerProductAccess={CustomerProductAccess}
    />
  );
}
function ScopedStorefront({
  scope,
  params,
  baseUrl,
  view,
  CustomerShop,
  CustomerAccount,
  CustomerBlogComments,
  CustomerProductComments,
  CustomerProductAccess,
}) {
  const domain = useContext(DomainContext);
  const Cart = CustomerShop;
  const Account = CustomerAccount;
  const api = useMemo(() => createPublicApi(baseUrl), [baseUrl]);
  const root = domain ? "" : storefrontRoot(scope);
  return (
    <BusinessSiteRuntime api={api} scope={scope} root={root}>
      <StorefrontFrame {...{ scope, params, view, CustomerBlogComments, CustomerProductComments, CustomerProductAccess, Cart, Account, api, root, domain }} />
    </BusinessSiteRuntime>
  );
}
function AcademyIcon({ type }) {
  const paths = {
    home: <><path d="M3 10.5 12 3l9 7.5" /><path d="M5.5 9.5V21h13V9.5M10 21v-7h4v7" /></>,
    courses: <><path d="m2 8 10-5 10 5-10 5L2 8Z" /><path d="M6 10.5V16c3.5 2.5 8.5 2.5 12 0v-5.5M21 9v7" /></>,
    blog: <><path d="M4 4h16v16H4zM8 8h8M8 12h8M8 16h5" /></>,
    cart: <><path d="M3 4h2l2 11h11l2-8H6M9 20h.01M17 20h.01" /><circle cx="9" cy="20" r="1" /><circle cx="17" cy="20" r="1" /></>,
    user: <><circle cx="12" cy="8" r="3.5" /><path d="M5 21v-2a7 7 0 0 1 14 0v2" /></>,
  };
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{paths[type]}</svg>;
}
function AcademyHeader({ site, root, domain, view, Account, scope }) {
  const shop = !domain || domain.shopEnabled, blog = !domain || domain.blogEnabled;
  const home = shop ? `${root}/shop` : `${root}/blog`;
  return <header className="sf-academy-header"><div className="sf-academy-header-inner">
    <Link className="sf-academy-logo" to={home}><strong>{site?.businessTitle || "فروشگاه"}</strong><span>فروشگاه و آموزش</span></Link>
    <nav className="sf-academy-menu" aria-label="ناوبری سایت">
      {shop && <><Link to={`${root}/shop`} aria-current={view === "shop" ? "page" : undefined}><AcademyIcon type="home" />صفحه اصلی</Link><Link to={`${root}/shop/products`} aria-current={view === "shop-products" ? "page" : undefined}><AcademyIcon type="courses" />دوره‌ها و محصولات</Link></>}
      {blog && <Link to={`${root}/blog`} aria-current={view.startsWith("blog") || view === "article" ? "page" : undefined}><AcademyIcon type="blog" />وبلاگ</Link>}
    </nav>
    {shop && <div className="sf-academy-header-actions"><Link className="sf-academy-cart" to={`${root}/shop/cart`} aria-label="سبد خرید و سفارش‌ها"><AcademyIcon type="cart" /></Link>{Account ? <Account scopeId={scope} accountUrl={`${root}/shop/cart`} /> : <Link className="sf-academy-signin" to={`${root}/shop/cart`}><AcademyIcon type="user" /><span>ورود / حساب کاربری</span></Link>}</div>}
  </div></header>;
}
function AcademyFooter({ site, root, domain }) {
  const shop = !domain || domain.shopEnabled, blog = !domain || domain.blogEnabled;
  return <footer className="sf-academy-site-footer"><div className="sf-academy-footer-body">
    <div className="sf-academy-footer-head"><div><span className="sf-academy-footer-badge" aria-hidden="true">✦</span><div><strong>همراه شما در مسیر یادگیری</strong><p>دوره‌ها و محصولات مجموعه را ببینید.</p></div></div><strong className="sf-academy-footer-brand">{site?.businessTitle || "فروشگاه"}</strong></div>
    <section className="sf-academy-footer-about"><h2>درباره {site?.businessTitle || "فروشگاه"}</h2><p>محصولات و آموزش‌های منتشرشده را در فروشگاه ببینید و سفارش‌های خود را در حساب کاربری پیگیری کنید.</p></section>
    <nav className="sf-academy-footer-links" aria-label="پیوندهای پایین صفحه">{shop && <Link to={`${root}/shop`}>فروشگاه و دوره‌ها</Link>}{blog && <Link to={`${root}/blog`}>وبلاگ</Link>}{shop && <Link to={`${root}/shop/cart`}>حساب کاربری و سفارش‌ها</Link>}</nav>
  </div><div className="sf-academy-footer-bar"><div><span>تمامی حقوق این وب‌سایت متعلق به {site?.businessTitle || "این مجموعه"} است.</span><a href="#sf-top" aria-label="بازگشت به بالای صفحه">↑</a></div></div></footer>;
}
function StorefrontFrame({ scope, params, view, CustomerBlogComments, CustomerProductComments, CustomerProductAccess, Cart, Account, api, root, domain }) {
  const site = useContext(BusinessSiteContext);
  const [search] = useSearchParams();
  const academy = scope > 0 && site?.template === "academy";
  return (
      <div
        className={`sf-site${scope === 0 && (view.startsWith("shop") || view === "product") ? " sf-pos" : ""}${academy ? " sf-academy" : ""}`}
        dir="rtl"
        lang="fa"
        id="sf-top"
      >
        {academy ? <AcademyHeader site={site} root={root} domain={domain} view={view} Account={Account} scope={scope} /> : <header className="sf-header">
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
              <>{Account && <Account scopeId={scope} accountUrl={`${root}/shop/cart`} />}<Link to={`${root}/shop/cart`}>سبد خرید و سفارش‌ها</Link></>
            )}
          </nav>
        </header>}
        <main className="sf-main">
          {view === "shop" && <ShopIndex api={api} scope={scope} root={root} />}
          {view === "shop-products" && <ShopIndex api={api} scope={scope} root={root} catalogPage />}{" "}
          {view === "product" && (
            <Product
              key={params.slug}
              api={api}
              scope={scope}
              root={root}
              slug={params.slug}
              CustomerProductComments={CustomerProductComments}
              CustomerProductAccess={CustomerProductAccess}
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
          {(view === "shop-cart" || view === "shop-orders") && (
            <>
              <Metadata
                title="حساب مشتری"
                seo={{ index: false, follow: false }}
              />
              <div className="sf-paper">
                <Cart scopeId={scope} productId={search.get("productId") || undefined} catalogUrl={`${root}/shop/products`} ordersOnly={view === "shop-orders"} />
              </div>
            </>
          )}
        </main>
        {academy ? <AcademyFooter site={site} root={root} domain={domain} /> : <footer className="sf-footer">
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
        </footer>}
      </div>
  );
}
