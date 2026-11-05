import { DomainHostBoundary } from "./shared/storefront/DomainHostBoundary";
import DomainHome from "./pages/public/DomainHome";
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import StorePage from "./pages/store/StorePage";

const PublicStorefront = lazy(() => import("./pages/public/PublicStorefront"));

export default function App() {
  return (
    <DomainHostBoundary
      baseUrl={import.meta.env.VITE_PUBLIC_API_URL || ""}
      platformHosts={import.meta.env.VITE_PLATFORM_HOSTS || ""}
    >
      <BrowserRouter>
        <Suspense
          fallback={
            <p role="status" dir="rtl">
              در حال دریافت صفحه…
            </p>
          }
        >
          <Routes>
            <Route
              path="/"
              element={
                <DomainHome>
                  <HomePage />
                </DomainHome>
              }
            />
            <Route
              path="/store"
              element={
                <DomainHome>
                  <StorePage />
                </DomainHome>
              }
            />
            <Route path="/shop" element={<PublicStorefront view="shop" />} />
            <Route
              path="/shop/products/:slug"
              element={<PublicStorefront view="product" />}
            />
            <Route
              path="/shop/cart"
              element={<PublicStorefront view="shop-cart" />}
            />
            <Route path="/blog" element={<PublicStorefront view="blog" />} />
            <Route
              path="/blog/posts/:slug"
              element={<PublicStorefront view="article" />}
            />
            <Route
              path="/blog/:type/:slug"
              element={<PublicStorefront view="blog-archive" />}
            />
            <Route
              path="/business/:businessId/shop"
              element={<PublicStorefront view="shop" />}
            />
            <Route
              path="/business/:businessId/shop/products/:slug"
              element={<PublicStorefront view="product" />}
            />
            <Route
              path="/business/:businessId/shop/cart"
              element={<PublicStorefront view="shop-cart" />}
            />
            <Route
              path="/business/:businessId/blog"
              element={<PublicStorefront view="blog" />}
            />
            <Route
              path="/business/:businessId/blog/posts/:slug"
              element={<PublicStorefront view="article" />}
            />
            <Route
              path="/business/:businessId/blog/:type/:slug"
              element={<PublicStorefront view="blog-archive" />}
            />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </DomainHostBoundary>
  );
}
