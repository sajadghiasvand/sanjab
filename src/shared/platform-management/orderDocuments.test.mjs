import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createShopApi } from './shopApi.js';

test('uploads order documents as authenticated multipart data', async () => {
  let request;
  const api = createShopApi({ baseUrl: 'https://example.test', getToken: () => 'buyer-token', fetchImpl: async (url, options) => { request = { url, options }; return { ok: true, json: async () => ({ uploaded: true }) }; } });
  await api.uploadDocument(0, 7, 'nid', new Blob(['%PDF-1.4'], { type: 'application/pdf' }));
  assert.equal(request.url, 'https://example.test/api/shop/0/orders/7/documents/nid');
  assert.equal(request.options.headers.Authorization, 'Bearer buyer-token');
  assert.equal(request.options.headers['Content-Type'], undefined);
  assert.ok(request.options.body instanceof FormData);
});

test('requests paid orders from the server for document completion', async () => {
  let url;
  const api = createShopApi({ baseUrl: 'https://example.test', getToken: () => null, fetchImpl: async value => { url = value; return { ok: true, json: async () => ({ items: [], total: 0 }) }; } });
  await api.orders(0, 2, undefined, true);
  assert.equal(url, 'https://example.test/api/shop/0/orders?page=2&paidOnly=true');
});
