
import * as React from 'react';

export type ToastVariant = 'default' | 'destructive';

export interface Toast {
  id: string;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  variant?: ToastVariant;
}

export type ToasterToast = Toast & {
  onDismiss: (id: string) => void;
};

interface ToastContextType {
  toasts: ToasterToast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
  toast: (props: Omit<Toast, 'id'>) => void;
}

export const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = React.useContext(ToastContext);
  
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  
  return context;
};

export function toast(props: Omit<Toast, 'id'>) {
  // We need to ensure this function works outside of React components
  // For that, we would need a global event system
  
  // A basic implementation using a global custom event
  const event = new CustomEvent('add-toast', { detail: props });
  document.dispatchEvent(event);
  
  return {
    dismiss: () => {
      // Ideally, we'd need a toast ID, but we don't have one here
      // In a real implementation, we would need to return an ID from this function
    },
    update: (props: Omit<Toast, 'id'>) => {
      // Similar issue as dismiss
    },
  };
}

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = React.useState<ToasterToast[]>([]);
  
  const addToast = React.useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, {
      ...toast,
      id,
      onDismiss: (id) => removeToast(id)
    }]);
    
    // Auto dismiss after 5 seconds
    setTimeout(() => {
      removeToast(id);
    }, 5000);
  }, []);
  
  const removeToast = React.useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  // Direct toast method for component use
  const toastMethod = React.useCallback((props: Omit<Toast, 'id'>) => {
    addToast(props);
  }, [addToast]);
  
  React.useEffect(() => {
    const handleAddToast = (e: Event) => {
      const customEvent = e as CustomEvent<Omit<Toast, 'id'>>;
      addToast(customEvent.detail);
    };
    
    document.addEventListener('add-toast', handleAddToast);
    
    return () => {
      document.removeEventListener('add-toast', handleAddToast);
    };
  }, [addToast]);
  
  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast, toast: toastMethod }}>
      {children}
    </ToastContext.Provider>
  );
};

// Optional standalone toast component to render toasts outside of the React tree
export const Toaster: React.FC = () => {
  const { toasts, removeToast } = useToast();
  
  return (
    <div className="fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all mb-2 bg-background text-foreground ${
            toast.variant === 'destructive' ? 'border-destructive bg-destructive text-destructive-foreground' : ''
          }`}
        >
          <div className="flex flex-col gap-1">
            {toast.title && <div className="text-sm font-semibold">{toast.title}</div>}
            {toast.description && <div className="text-sm opacity-90">{toast.description}</div>}
          </div>
          {toast.action}
          <button
            onClick={() => removeToast(toast.id)}
            className="absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100"
          >
            <span className="sr-only">Close</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
};
