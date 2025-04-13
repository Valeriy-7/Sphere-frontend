import * as React from 'react';

export type ToastVariant = 'default' | 'destructive' | 'success';

export interface ToastOptions {
  title?: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
}

export interface Toast extends ToastOptions {
  id: string;
  onDismiss: () => void;
}

type ToastContextType = {
  toasts: Toast[];
  addToast: (options: ToastOptions) => void;
  removeToast: (id: string) => void;
};

const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

export const useToastContext = () => {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error('useToastContext должен использоваться внутри ToastProvider');
  }
  return context;
};

export function useToast() {
  return {
    toast: (options: ToastOptions) => {
      console.log('Тост:', options);
      // В реальном приложении здесь будет вызов addToast из контекста
    },
  };
}
