export const defaultSortByProp = <T>(cb: (it: T) => string | number | boolean, reverse = false) =>
  (a: T, b: T) => {
    const first = cb(a);
    const second = cb(b);
    const toReturn = first === second ? 0 : first < second ? -1 : 1;
    if (reverse) {
      return -1 * toReturn;
    }
    return toReturn;
  };
