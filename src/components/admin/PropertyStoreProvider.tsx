"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { seedProperties } from "@/data/properties";
import { readDemoProperties, resetDemoProperties, writeDemoProperties } from "@/lib/demo-storage";
import type { Property } from "@/types/property";

type PropertyStoreValue = {
  properties: Property[];
  loaded: boolean;
  storageWarning: string | null;
  setProperties: (next: Property[] | ((current: Property[]) => Property[])) => void;
  resetDemoData: () => void;
};

const PropertyStoreContext = createContext<PropertyStoreValue | null>(null);

export function PropertyStoreProvider({ children }: { children: ReactNode }) {
  const [properties, setProperties] = useState<Property[]>(seedProperties);
  const [loaded, setLoaded] = useState(false);
  const [storageWarning, setStorageWarning] = useState<string | null>(null);

  useEffect(() => {
    setProperties(readDemoProperties());
    setLoaded(true);
    const handleStorage = (event: StorageEvent) => {
      if (event.key === null || event.key === "agyedabe-enterprise-demo-properties-v1") setProperties(readDemoProperties());
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    setStorageWarning(writeDemoProperties(properties) ? null : "Browser storage is unavailable or full. Changes may not persist after refresh.");
  }, [loaded, properties]);

  const resetDemoData = useCallback(() => {
    setProperties(resetDemoProperties());
    setStorageWarning(null);
  }, []);

  const value = useMemo(() => ({ properties, loaded, storageWarning, setProperties, resetDemoData }), [properties, loaded, storageWarning, resetDemoData]);
  return <PropertyStoreContext.Provider value={value}>{children}</PropertyStoreContext.Provider>;
}

export function usePropertyStore() {
  const value = useContext(PropertyStoreContext);
  if (!value) throw new Error("usePropertyStore must be used within PropertyStoreProvider.");
  return value;
}
