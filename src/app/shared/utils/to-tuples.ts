export function toTuples<T>(items: T[], ofSize: number): T[][] {
  return items.reduce((a, b) => {
      if (a[a.length - 1].length >= ofSize) {
        a.push([b]);
      } else {
        a[a.length - 1].push(b);
      }
      return a;
    },
    [[] as T[]]
  );
}
