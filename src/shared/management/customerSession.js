import { useEffect, useState } from "react";
const memory = new Map();
const keyFor = (scopeId) => `sanjab.customer.${scopeId}`;
function read(scopeId) {
  if (memory.has(scopeId)) return memory.get(scopeId);
  try { return window.sessionStorage.getItem(keyFor(scopeId)) || ""; }
  catch { return ""; }
}
export function useCustomerSession(scopeId) {
  const [token, setToken] = useState(() => read(scopeId));
  useEffect(() => {
    const update = () => setToken(read(scopeId));
    window.addEventListener("sanjab-customer-session", update);
    window.addEventListener("storage", update);
    update();
    return () => { window.removeEventListener("sanjab-customer-session", update); window.removeEventListener("storage", update); };
  }, [scopeId]);
  function saveToken(value) {
    try { if (value) window.sessionStorage.setItem(keyFor(scopeId), value); else window.sessionStorage.removeItem(keyFor(scopeId)); memory.delete(scopeId); }
    catch { memory.set(scopeId, value); }
    setToken(value);
    window.dispatchEvent(new window.Event("sanjab-customer-session"));
  }
  return [token, saveToken];
}
