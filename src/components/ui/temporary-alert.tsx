import { AlertCircle, CheckCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useAlertContext } from '@/context/AlertContext';

export default function TemporaryAlert() {
  const { alert } = useAlertContext();

  if (!alert) {
    return null;
  }

  return (
    <div className="fixed top-30 right-4 z-50 transition-opacity duration-500 ease-in-out">
      <Alert variant={alert.type === 'error' ? 'destructive' : 'default'}>
        {alert.type === 'error' ? (
          <AlertCircle className="h-4 w-4" />
        ) : (
          <CheckCircle className="h-4 w-4" />
        )}
        <AlertTitle>{alert.type === 'error' ? 'Erro' : 'Sucesso'}</AlertTitle>
        <AlertDescription>{alert.message}</AlertDescription>
      </Alert>
    </div>
  );
}
