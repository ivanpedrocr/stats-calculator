export const countString = (str) => {
  const arr = str.split(" ");
  const items = {};
  arr.forEach((i) => {
    items[i] = (items[i] || 0) + 1;
  });
  const total = +Object.keys(items)[0]
    ? arr.map((x) => +x).reduce((prev, curr) => prev + curr)
    : Object.values(items).reduce((prev, curr) => prev + curr);
  const sortedArr = +Object.keys(items)[0]
  ? arr.map((x) => +x).sort((a, b) => a - b)
  : arr
  return {
    total,
    items,
    arr:sortedArr
  };
};
export const parseString = (str) => {
  const replaceComma = str.replace(/\,/g, "");
  const parsedString = replaceComma.replace(/(\r\n|\r|\n)|\t/g, " ");
  return parsedString;
};

export function chunkify(a, n) {
  if (n < 2) return [a];

  const max = Math.max(...a);
  const interval = +(max/n).toFixed()
  let result = []

  // let len = a.length,
  //   out = [],
  //   i = 0,
  //   size;

  for (let i = 1; i < max; i+= interval) {
    result.push(a.filter(function(d){
      return ((i+interval > d) && d >= i);  // check if the number between lower and upper bound
      }));
    }
  // if (len % n === 0) {
  //   size = Math.floor(len / n);
  //   while (i < len) {
  //     out.push(a.slice(i, (i += size)));
  //   }
  // } else if (balanced) {
  //   while (i < len) {
  //     size = Math.ceil((len - i) / n--);
  //     out.push(a.slice(i, (i += size)));
  //   }
  // } else {
  //   n--;
  //   size = Math.floor(len / n);
  //   if (len % size === 0) size--;
  //   while (i < size * n) {
  //     out.push(a.slice(i, (i += size)));
  //   }
  //   out.push(a.slice(size * n));
  // }

  return result;
}
