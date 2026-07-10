export const UCFirst = (s: string): string => s.charAt(0).toUpperCase() + s.slice(1);
export const CammelToTitle = (s: string): string =>
  UCFirst(s).replace(/([a-z0-9])([A-Z])/g, (match, p1, p2) => `${p1} ${p2}`);
export const SnakeToTitle = (s: string): string => UCFirst(s).replace(/_([A-Z])/gi, (match, p1) => ` ${UCFirst(p1)}`);
export const ToTitleCase = (s: string): string => CammelToTitle(SnakeToTitle(s));
