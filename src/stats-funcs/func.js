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
  const replaceSpace = str.trim().replace(/\s\s+/g, ' ')
  const replaceComma = replaceSpace.replace(/,/g, "");
  const parsedString = replaceComma.replace(/(\r\n|\r|\n)|\t/g, " ");
  return parsedString;
};

export function chunkify(a, n) {
  if (n < 2) return [a];

  const max = Math.max(...a);
  const min = Math.min(...a)
  const interval = ceil10(((max-min)/(n+1)), -6)
  let result = []

  // let len = a.length,
  //   out = [],
  //   i = 0,
  //   size;
n=0
  for (let i = min; i < max; i+= interval) {
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

function decimalAdjust(type, value, exp) {
  // If the exp is undefined or zero...
  if (typeof exp === 'undefined' || +exp === 0) {
    return Math[type](value);
  }
  value = +value;
  exp = +exp;
  // If the value is not a number or the exp is not an integer...
  if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
    return NaN;
  }
  // Shift
  value = value.toString().split('e');
  value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
  // Shift back
  value = value.toString().split('e');
  return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
}

const round10 = (value, exp) => decimalAdjust('round', value, exp);
export const floor10 = (value, exp) => decimalAdjust('floor', value, exp);
export const ceil10 = (value, exp) => decimalAdjust('ceil', value, exp);
