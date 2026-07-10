export const round = (num: number, places = 2): number => {
  const mod = parseInt('1'.padEnd(places + 1, '0'));
  return Math.round(num * mod) / mod;
};
