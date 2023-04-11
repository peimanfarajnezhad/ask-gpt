import * as SecureStore from "expo-secure-store";

export enum StoreKeysEnum {
  API_KEY = "API_KEY",
  ORGANIZATION_ID = "ORGANIZATION_ID",
}

export async function saveToStore(key: string, value: string) {
  await SecureStore.setItemAsync(key, value);
}

export async function getFromStore(key: string): Promise<string> {
  let result = await SecureStore.getItemAsync(key);
  return result ?? "";
}
