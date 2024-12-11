import { useState, useCallback } from 'react';

type AlertType = 'success' | 'error';

interface AlertState {
  type: AlertType;
  message: string;
}

export function useAlert() {
  const [alert, setAlert] = useState<AlertState | null>(null);

  const showAlert = useCallback((type: AlertType, message: string) => {
    setAlert({ type, message });
    setTimeout(() => {
      setAlert(null);
    }, 5000);
  }, []);

  return { alert, showAlert };
}
