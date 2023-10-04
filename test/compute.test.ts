import { expect, test } from 'vitest';
import { combinations, computeCombination, factorial, generate } from '../src/compute';

test('factorial(5) to equal 120', () => {
  expect(factorial(5)).toBe(120);
});

test('factorial(7) to equal 5040', () => {
  expect(factorial(7)).toBe(5040);
});

test('combinations(4,3) to equal 4', () => {
  expect(combinations(4, 3)).toBe(4);
});

test('combinations(3,4) to throw', () => {
  expect(() => combinations(3, 4)).toThrowError();
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

test('computeCombination(1-8,3,0) to be [1,2,3]', () => {
  expect(computeCombination([1, 2, 3, 4, 5, 6, 7, 8], 3, 0)).toStrictEqual([1, 2, 3]);
});

test('computeCombination(1-8,3,7) to be [1,4,5]', () => {
  expect(computeCombination([1, 2, 3, 4, 5, 6, 7, 8], 3, 7)).toStrictEqual([1, 4, 5]);
});

test('computeCombination(1-8,3,11) to be [1,3,6]', () => {
  expect(computeCombination([1, 2, 3, 4, 5, 6, 7, 8], 3, 11)).toStrictEqual([1, 3, 6]);
});

test('generate() produces valid Baloto numbers', () => {
  const ticket = generate();

  // checks special ball is an integer between 1 and 16 inclusive
  expect(ticket.special).toSatisfy(betweenInclusive(1, 16));
  expect(ticket.special).toSatisfy(isInteger);

  expect(ticket.regular.length).toBe(5);
  expect(ticket.regular).toSatisfy(allUnique);
  ticket.regular.forEach(r => {
    expect(r).toSatisfy(betweenInclusive(1, 43));
    expect(r).toSatisfy(isInteger);
  });

}, { repeats: 1000 });

function betweenInclusive(lower: number, upper: number): (value: number) => boolean {
  return value => value >= lower && value <= upper;
}

function isInteger(value: number): boolean {
  return value === Math.round(value);
}

function allUnique(numbers: number[]): boolean {
  const unique = numbers.filter((value, idx) => numbers.indexOf(value) === idx);
  return unique.length === numbers.length;
}
