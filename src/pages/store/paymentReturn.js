export function clearPaymentReturn(url) {
  const next = new URL(url);
  for (const key of ['shopScopeId', 'orderId', 'paymentStatus', 'paymentResult', 'code']) next.searchParams.delete(key);
  return `${next.pathname}${next.search}${next.hash}`;
}
