import {MMKV} from 'react-native-mmkv';

export const localStorage = new MMKV();

export const setDataInLocalStorage = (key: string, data: any) => {
  localStorage.set(key, JSON.stringify(data));
};
export const getDataFromLocalStorage = (key: string) => {
  return localStorage.getString(key);
};
