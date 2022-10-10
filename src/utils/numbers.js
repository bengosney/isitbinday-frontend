export const round = (num, places = 2) => {
  const mod = parseInt('1'.padEnd(places + 1, '0'));
  return Math.round(num * mod) / mod;
};
