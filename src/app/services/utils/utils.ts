export const setStorage = (key: string, value: string) => {
  localStorage.setItem(key, JSON.stringify(value));
};
export const getStorage = (key: string) => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};
export const removeStorage = (key: string) => {
  localStorage.removeItem(key);
};

export function isDefined<T>(val: T | undefined): val is T {
  return typeof val !== 'undefined'
};