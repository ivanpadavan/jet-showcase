export type Keyable = string | number | symbol;
// tslint:disable max-line-length
export function listToObject<T, K extends Keyable>(l: T[], keyCb: (e: T, i?: number) => K): { [key in K]: T };
export function listToObject<T, R, K extends Keyable>(l: T[], keyCb: (e: T, i?: number) => K, transformCb: (e: T, i?: number) => R): { [key in K]: R };
export function listToObject<T, R, K extends Keyable>(l: T[], keyCb: (e: T, i?: number) => K, transformCb?: (e: T, i?: number) => R): { [key in K]: R } | { [key in K]: T } {
  const result: any = {};
  if (transformCb) {
    l.forEach((v, i) => {
      const key = keyCb(v, i);
      result[key] = transformCb(v, i);
    });
  } else {
    l.forEach((v, i) => {
      const key = keyCb(v, i);
      result[key] = v;
    });
  }
  return result;
}
