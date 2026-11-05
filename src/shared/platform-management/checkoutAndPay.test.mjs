import { test } from 'node:test';
import assert from 'node:assert/strict';
import { checkoutAndPay } from './checkoutAndPay.js';

test('creates an order and requests its payment before returning the gateway URL', async () => {
  const calls = [];
  const api = {
    checkout: async (scope, body) => { calls.push(['checkout', scope, body]); return { id: 7 }; },
    pay: async (scope, id) => { calls.push(['pay', scope, id]); return { url: 'https://payment.example/7' }; },
  };
  let created;
  const url = await checkoutAndPay(api, 0, { checkoutKey: 'key' }, order => { created = order; });
  assert.equal(url, 'https://payment.example/7');
  assert.deepEqual(created, { id: 7 });
  assert.deepEqual(calls, [['checkout', 0, { checkoutKey: 'key' }], ['pay', 0, 7]]);
});

test('keeps the created order available if requesting payment fails', async () => {
  const api = { checkout: async () => ({ id: 8 }), pay: async () => { throw new Error('gateway error'); } };
  let created;
  await assert.rejects(checkoutAndPay(api, 0, {}, order => { created = order; }), /gateway error/);
  assert.equal(created.id, 8);
});

test('does not redirect if payment has no URL', async () => {
  const api = { checkout: async () => ({ id: 8 }), pay: async () => ({}) };
  await assert.rejects(checkoutAndPay(api, 0, {}, () => {}), /آدرس درگاه/);
});
