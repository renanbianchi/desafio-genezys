import { useAlert } from '@/hooks/useAlert';
import React, { createContext, useContext } from 'react';

interface AlertContextType {
  alert: { type: 'success' | 'error'; message: string } | null;
  showAlert: (type: 'success' | 'error', message: string) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export function AlertProvider({ children }: { children: React.ReactNode }) {
  const alertHook = useAlert();

  return (
    <AlertContext.Provider value={alertHook}>{children}</AlertContext.Provider>
  );
}

export function useAlertContext() {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error('useAlertContext must be used within an AlertProvider');
  }
  return context;
}
