import { useEffect, useMemo, useState } from "react";
import { createPublicApi } from "./api";
import { DomainContext } from "./domainContext";
export function DomainHostBoundary({ baseUrl, platformHosts = "", children }) {
  const hostname = window.location.hostname.toLowerCase();
  const platform =
    platformHosts
      .split(",")
      .map((host) => host.trim().toLowerCase())
      .filter(Boolean)
      .includes(hostname) ||
    ["localhost", "127.0.0.1", "[::1]"].includes(hostname);
  const api = useMemo(() => createPublicApi(baseUrl), [baseUrl]);
  const [state, setState] = useState({
    loading: !platform,
    domain: null,
    error: "",
  });
  useEffect(() => {
    if (platform) return;
    const controller = new AbortController();
    api
      .resolveHostname(hostname, controller.signal)
      .then((domain) => {
        if (!controller.signal.aborted)
          setState({ loading: false, domain, error: "" });
      })
      .catch((error) => {
        if (!controller.signal.aborted)
          setState({ loading: false, domain: null, error: error.message });
      });
    return () => controller.abort();
  }, [api, hostname, platform]);
  if (!platform && state.loading)
    return (
      <div dir="rtl" className="sf-state" role="status">
        در حال دریافت اطلاعات سایت…
      </div>
    );
  if (!platform && state.error)
    return (
      <div dir="rtl" className="sf-state" role="alert">
        این دامنه فعال نیست یا اطلاعات سایت دریافت نشد.
      </div>
    );
  return (
    <DomainContext.Provider
      value={platform || state.domain?.platform ? null : state.domain}
    >
      {children}
    </DomainContext.Provider>
  );
}
