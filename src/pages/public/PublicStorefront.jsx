import { Storefront } from "../../shared/storefront";
import {
  CustomerShop,
  CustomerBlogComments,
  CustomerProductComments,
} from "../../shared/management/CustomerAccess";
import { CustomerAccount } from "../../shared/management/CustomerAccount";
import { CustomerProductAccess } from "../../shared/management/CustomerProductAccess";
const baseUrl = (import.meta.env.VITE_PUBLIC_API_URL || "").replace(/\/$/, "");
function Shop(props) {
  return <CustomerShop {...props} baseUrl={baseUrl} />;
}
function Account(props) { return <CustomerAccount {...props} baseUrl={baseUrl} />; }
function ProductAccess(props) { return <CustomerProductAccess {...props} baseUrl={baseUrl} />; }
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
      CustomerAccount={Account}
      CustomerProductAccess={ProductAccess}
      CustomerBlogComments={BlogComments}
      CustomerProductComments={ProductComments}
    />
  );
}
