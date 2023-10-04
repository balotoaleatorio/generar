const baloto = {
  balls: Array.from({ length: 43 }, (_, i) => i + 1),
  sample: 5,
  combinations: 962598,
  numbers: 16 * 962598,
};

function random24bits(): number {
  const array = new Uint8Array(3);
  self.crypto.getRandomValues(array);
  let result = 0;
  for (let i = 0; i < array.length; i++) {
    result |= array[i] << (i * 8);
  }
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

const prime = 31;

function computeKey(n: number, r: number): number {
  let result = 7;
  result = prime * result + n;
  result = prime * result + r;
  return result;
}

const combinationsMemo = new Map<number, number>();

export function combinations(elements: number, sample: number): number {
  if (elements < sample) {
    throw new Error("sample is greater than the number of elements", {
      cause: { code: "InvalidArgument", values: [elements, sample] }
    });
  }

  const key = computeKey(elements, sample);
  const retrieved = combinationsMemo.get(key);
  if (retrieved !== undefined) {
    return retrieved;
  }

  let result = elements;
  for (let i = 1; i < sample; i++) {
    result *= elements - i;
  }
  result /= factorial(sample);

  combinationsMemo.set(key, result);
  return result;
}

export function computeCombination<T>(elements: T[], sample: number, ordinal: number): T[] {
  const out = new Array<T>(sample);

  let s = sample;
  let o = ordinal;
  for (let n = elements.length - 1; n >= 0; n--) {
    const y = (n >= s) ? combinations(n, s) : 0;
    if (o >= y) {
      o -= y;
      s--;
      out[s] = elements[n];
      if (s == 0) {
        break;
      }
    }
  }
  return out;
}

export type Ticket = {
  special: number;
  regular: number[];
}

export function generate(): Ticket {
  let rand: number;
  do {
    rand = random24bits();
  } while (rand >= baloto.numbers);

  const special = Math.floor(rand / baloto.combinations) + 1;
  const ordinal = rand % baloto.combinations;
  const regular = computeCombination(baloto.balls, baloto.sample, ordinal);
  return { special, regular };
}
