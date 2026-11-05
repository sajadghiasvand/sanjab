import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { DomainContext } from "../../shared/storefront/domainContext";
export default function DomainHome({ children }) {
  const domain = useContext(DomainContext);
  return domain ? (
    <Navigate to={domain.shopEnabled ? "/shop" : "/blog"} replace />
  ) : (
    children
  );
}
