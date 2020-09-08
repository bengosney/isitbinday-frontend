export const CammelToTitle = (s) => s.charAt(0).toUpperCase() + s.slice(1).replace(/[A-Z]/g, (letter) => ` ${letter}`);
