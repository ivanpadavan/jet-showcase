import { debounce } from 'lodash-es';

export function LocalStorage({ initialValue, debounceTime }: { initialValue: any, debounceTime?: number }) {
  return (target: object, propName: string) => {
    let value;
    try {
      value = JSON.parse(localStorage.getItem(propName));
    } catch (e) {
      value = null;
    }
    const boxed = { value: value || initialValue };

    function getValue(): any {
      return boxed.value;
    }

    let setValueInLocalStorage = (val: any) => localStorage.setItem(propName, JSON.stringify(val));
    if (debounceTime) {
      setValueInLocalStorage = debounce(setValueInLocalStorage, debounceTime);
    }

    function setValue(val: any) {
      boxed.value = val;
      setValueInLocalStorage(val);
    }

    Object.defineProperty(target, propName, {
      configurable: true,
      enumerable: true,
      get: getValue,
      set: setValue
    });
  };
}
