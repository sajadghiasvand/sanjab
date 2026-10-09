import { Storefront } from "../../shared/storefront";
import {
  CustomerShop,
  CustomerBlogComments,
  CustomerProductComments,
} from "../../shared/management/CustomerAccess";
const baseUrl = (import.meta.env.VITE_PUBLIC_API_URL || "").replace(/\/$/, "");
function Shop(props) {
  return <CustomerShop {...props} baseUrl={baseUrl} />;
}
function BlogComments(props) {
  return <CustomerBlogComments {...props} baseUrl={baseUrl} />;
}
function ProductComments(props) {
  return <CustomerProductComments {...props} baseUrl={baseUrl} />;
}
export default function PublicStorefront({ view }) {
  return (
    <Storefront
      baseUrl={baseUrl}
      view={view}
      CustomerShop={Shop}
      CustomerBlogComments={BlogComments}
      CustomerProductComments={ProductComments}
    />
  );
}
