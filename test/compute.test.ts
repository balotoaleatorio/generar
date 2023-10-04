import { expect, test } from 'vitest';
import { combinations, factorial } from '../src/compute';

test('factorial(5) to equal 120', () => {
  expect(factorial(5)).toBe(120);
});

test('factorial(7) to equal 5040', () => {
  expect(factorial(7)).toBe(5040);
});

test('combinations(4,3) to equal 4', () => {
  expect(combinations(4, 3)).toBe(4);
});

test('combinations(3,4) to equal 0', () => {
  expect(combinations(3, 4)).toBe(0);
});

test('combinations(5,5) to equal 1', () => {
  expect(combinations(5, 5)).toBe(1);
});

test('combinations(8,3) to equal 56', () => {
  expect(combinations(8, 3)).toBe(56);
});

test('combinations(43,5) to equal 962598', () => {
  expect(combinations(43, 5)).toBe(962598);
});
