import { test } from 'node:test';
import assert from 'node:assert/strict';
import { addSelectedProduct } from './addSelectedProduct.js';

test('adds the selected product once and preserves an existing quantity', async () => {
  const items = [];
  const calls = [];
  const api = {
    cart: async () => ({ items }),
    setItem: async (...args) => { calls.push(args); items.push({ productId: args[1], quantity: args[2] }); },
  };
  assert.equal(await addSelectedProduct(api, 0, 42), true);
  items[0].quantity = 3;
  assert.equal(await addSelectedProduct(api, 0, 42), false);
  assert.deepEqual(calls, [[0, 42, 1]]);
  assert.equal(items[0].quantity, 3);
});

test('does not report success when adding fails', async () => {
  const api = { cart: async () => ({ items: [] }), setItem: async () => { throw new Error('ناموجود'); } };
  await assert.rejects(addSelectedProduct(api, 0, 42), /ناموجود/);
});
