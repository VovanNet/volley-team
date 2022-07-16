import { useState, useEffect, Dispatch, SetStateAction } from "react";

function getStorageValue<T>(key: string, defaultValue: T) : T {
  // getting stored value
  const saved = localStorage.getItem(key);
  if (saved) {
    return JSON.parse(saved) as T;
  }
  return defaultValue;
}

export const useLocalStorage = <T>(key: string, defaultValue: T): [T, Dispatch<SetStateAction<T>>] => {
  const [value, setValue] = useState(() => {
    return getStorageValue(key, defaultValue);
  });

  useEffect(() => {
    // storing input name
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};