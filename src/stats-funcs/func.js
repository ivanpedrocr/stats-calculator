export const countString = (str) => {
  const arr = str.split(" ");
  const items = {};
  arr.forEach((i) => {
    items[i] = (items[i] || 0) + 1;
  });
  const total = +Object.keys(items)[0]
    ? arr.map((x) => +x).reduce((prev, curr) => prev + curr)
    : Object.values(items).reduce((prev, curr) => prev + curr);
  return {
    total,
    items,
    arr: +Object.keys(items)[0]
      ? arr.map((x) => +x).sort((a, b) => a - b)
      : arr,
  };
};
export const parseString = (str) => {
  const replaceComma = str.replace(/\,/g, "");
  const parsedString = replaceComma.replace(/(\r\n|\r|\n)|\t/g, " ");
  return parsedString;
};

export function chunkify(a, n, balanced = true) {
  if (n < 2) return [a];

  let len = a.length,
    out = [],
    i = 0,
    size;

  if (len % n === 0) {
    size = Math.floor(len / n);
    while (i < len) {
      out.push(a.slice(i, (i += size)));
    }
  } else if (balanced) {
    while (i < len) {
      size = Math.ceil((len - i) / n--);
      out.push(a.slice(i, (i += size)));
    }
  } else {
    n--;
    size = Math.floor(len / n);
    if (len % size === 0) size--;
    while (i < size * n) {
      out.push(a.slice(i, (i += size)));
    }
    out.push(a.slice(size * n));
  }

  return out;
}
