import {
  FC,
  PropsWithChildren,
  createContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { StoreKeysEnum, getFromStore } from "../utils/store";

export interface ContextProps {
  organizationId: string;
  apiKey: string;
  setOrganizationId?: (val: string) => void;
  setApiKey?: (val: string) => void;
}

export const StoreContext = createContext<ContextProps>({
  apiKey: "",
  organizationId: "",
});

StoreContext.displayName = "ChatContext";

export const StoreWrapper: FC<PropsWithChildren> = ({ children }) => {
  const [apiKey, setApiKey] = useState<string>("");
  const [organizationId, setOrganizationId] = useState<string>("");

  const storeValue = useMemo<ContextProps>(
    () => ({
      organizationId,
      apiKey,
      setApiKey,
      setOrganizationId,
    }),
    [organizationId, apiKey]
  );

  useEffect(() => {
    Promise.all([
      getFromStore(StoreKeysEnum.ORGANIZATION_ID),
      getFromStore(StoreKeysEnum.API_KEY),
    ]).then(([organizationId, apiKey]) => {
      if (organizationId) {
        setOrganizationId(organizationId);
      }

      if (apiKey) {
        setApiKey(apiKey);
      }
    });
  }, []);

  return (
    <StoreContext.Provider value={storeValue}>{children}</StoreContext.Provider>
  );
};
