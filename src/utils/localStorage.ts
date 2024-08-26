import { AES, enc } from "crypto-js";

const SECRET_KEY = import.meta.env.VITE_SECRET_KEY as string;

export const saveToLocalStorage = <T>(key: string, value: T) => {
  const serializedValue = AES.encrypt(JSON.stringify(value), SECRET_KEY);
  localStorage.setItem(key, serializedValue.toString());
};

export const loadFromLocalStorage = <T>(key: string) => {
  const storedData = localStorage.getItem(key);

  if (storedData) {
    const bytes = AES.decrypt(storedData, SECRET_KEY);
    const decryptedData = JSON.parse(bytes.toString(enc.Utf8));

    return decryptedData as T;
  }
};

export const removeFromLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};
