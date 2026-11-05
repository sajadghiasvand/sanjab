import { test } from 'node:test';
import assert from 'node:assert/strict';
import { splitProfileAddress, joinProfileAddress } from './profileAddress.js';

test('extracts and saves province and city without duplicating the address', () => {
    const saved = 'قزوین، الوند، خیابان اصلی، پلاک ۱۲';
    assert.deepEqual(splitProfileAddress(saved), { province: 'قزوین', city: 'الوند', address: 'خیابان اصلی، پلاک ۱۲' });
    assert.equal(joinProfileAddress(splitProfileAddress(saved)), saved);
});

test('preserves unstructured and empty legacy addresses intact', () => {
    assert.deepEqual(splitProfileAddress('خیابان اصلی، پلاک ۱۲'), { province: '', city: '', address: 'خیابان اصلی، پلاک ۱۲' });
    assert.deepEqual(splitProfileAddress(''), { province: '', city: '', address: '' });
});
