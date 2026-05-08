import React, { useRef, useCallback } from 'react';

/**
 * useDebounce - Returns a debounced version of the callback that accepts parameters
 * @param callback - The function to debounce
 * @param delay - The debounce delay in milliseconds
 * @returns A debounced function that can be called with any arguments
 */
const useDebounce = <T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );

  return debouncedCallback;
};

export default useDebounce;
