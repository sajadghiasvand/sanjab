import { test } from 'node:test';
import assert from 'node:assert/strict';
import { clearPaymentReturn } from './paymentReturn.js';

test('clears the old payment result without losing other navigation parameters', () => {
  assert.equal(clearPaymentReturn('https://example.test/store?shopScopeId=0&orderId=3&paymentStatus=pending&paymentResult=cancelled&code=0&campaign=pos#buy'), '/store?campaign=pos#buy');
});
