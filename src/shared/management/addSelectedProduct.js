export async function addSelectedProduct(api, scopeId, productId) {
  const cart = await api.cart(scopeId);
  if (cart.items.some(item => item.productId === productId)) return false;
  await api.setItem(scopeId, productId, 1);
  return true;
}
