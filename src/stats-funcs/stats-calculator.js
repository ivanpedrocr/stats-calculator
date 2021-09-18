import { countString, parseString } from "./func";

const StatsCalculator = (input) => {
  const data = parseString(input);
  const { total, items, arr } = countString(data);
  const n = arr.length;
  const mean = total / n;
  const median =
    n % 2 === 0
      ? (+arr[Math.floor(n / 2 - 1)] + arr[Math.floor(n / 2)]) / 2
      : +arr[Math.floor(n / 2)];
  const sDev = Math.sqrt(
    arr.map((x) => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / (n - 1)
  );
  const frequencyArr = Object.entries(items).map(([key, frequency]) => ({
    key,
    frequency,
  }));
  const mode = frequencyArr
    .filter((i) => i.frequency === Math.max(...Object.values(items)))
    .map(({ key }) => key);
  const min = Math.min(...arr);
  const max = Math.max(...arr);
  const range = max - min;
  const q1 =
    n % 2 === 0
      ? (+arr[Math.floor(n / 4 - 1)] + arr[Math.floor(n / 4)]) / 2
      : arr[Math.floor(n / 4)];
  const q3 =
    n % 2 === 0
      ? (+arr[Math.floor((3 * n) / 4 - 1)] + +arr[Math.floor((3 * n) / 4)]) / 2
      : arr[Math.floor((3 * n) / 4)];
  const IQR = q3 - q1;
  return { n, mean: mean.toFixed(2), median, mode, frequencyArr, sDev: sDev.toFixed(2), range, q1, q3, IQR, arr };
};
export default StatsCalculator;
