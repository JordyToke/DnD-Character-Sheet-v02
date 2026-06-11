import { useEffect, useState } from 'react';

const useLocalStorage = <T,>(
  key: string,
  initialValue: T,
): [T, (val: T | ((prevValue: T) => T)) => void, () => void] => {
  // a hook for getting and setting data from local storage
  // local storage is unsecure do not use for secrets

  /** gets item from localStorage and returns its parsed value */
  const getItem = (): T | undefined => {
    try {
      const data = window.localStorage.getItem(key);
      return data ? (JSON.parse(data) as T) : undefined;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  };

  const [value, setValue] = useState<T>(initialValue);

  // load state from local storage if present, ensure window has loaded with useEffect
  useEffect(() => {
    const storedValue = getItem();
    const initial: T = storedValue ?? initialValue;
    setValue(initial);
  }, []);

  /** sets new item state and updates localStorage */
  const setItem = (newValueOrUpdater: T | ((prevValue: T) => T)) => {
    try {
      const newValue =
        typeof newValueOrUpdater === 'function' ?
          (newValueOrUpdater as (prevValue: T) => T)(value)
        : newValueOrUpdater;
      setValue(newValue);
      window.localStorage.setItem(key, JSON.stringify(newValue));
      console.log(`${key} successfully saved to localStorage!`);
    } catch (error) {
      console.log(error);
    }
  };

  /** removes item from localStorage */
  const removeItem = () => {
    try {
      setValue(initialValue);
      window.localStorage.removeItem(key);
    } catch (error) {
      console.log(error);
    }
  };

  return [value, setItem, removeItem];
};

export default useLocalStorage;
