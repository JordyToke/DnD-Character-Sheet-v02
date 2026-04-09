import react, { useEffect, useState } from 'react'

const setItem = (key: string, value: unknown) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
    console.log(`${key} successfully saved to localStorage!`)
  } catch (error) {
    console.log(error)
  }
}

const getItem<T> = (key: string): T | undefined => {
  try {
    const data = window.localStorage.getItem(key);
    return data ? (JSON.parse(data) as T) : undefined:
  } catch (error) {
    console.log(error);
  }
}

const removeItem = (key: string) => {
  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    console.log(error)
  }
}

const useLocalStorage<T> = (key: string, initialValue: T) => {
  // a hook for getting and setting data from local storage
  // local storage is unsecure do not use for secrets
  
  // First check for local storage
  const local = window.localStorage()
  const [value, setValue] = useState();
  
  return
}

export default useLocalStorage;