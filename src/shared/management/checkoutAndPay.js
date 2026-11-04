export async function checkoutAndPay(api, scopeId, body, onCreated) {
  const order = await api.checkout(scopeId, body);
  onCreated(order);
  const payment = await api.pay(scopeId, order.id);
  if (!payment.url) throw new Error('آدرس درگاه پرداخت دریافت نشد.');
  return payment.url;
}
