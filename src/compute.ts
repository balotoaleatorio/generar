const array = new Int8Array(3);
self.crypto.getRandomValues(array);

const combinationsCache = new Map<number, number>();

export function combinations(n: number, r: number): number {
  if (n < r) {
    return 0;
  }

  const key = computeKey(n, r);
  const retrieved = combinationsCache.get(key);
  if (retrieved !== undefined) {
    return retrieved;
  }

  let result = n;
  for (let i = 1; i < r; i++) {
    result *= n - i;
  }
  result /= factorial(r);

  combinationsCache.set(key, result);
  return result;
}

const prime = 31;

function computeKey(n: number, r: number): number {
  let result = 7;
  result = prime * result + n;
  result = prime * result + r;
  return result;
}

const factorials: number[] = [1];

export function factorial(n: number): number {
  const len = factorials.length;
  if (n < len) {
    return factorials[n];
  }

  let last = factorials[len - 1];
  for (let i = len; i < n + 1; i++) {
    last *= i;
    factorials.push(last);
  }
  return last;
}
