import React, { useEffect } from 'react';
import { CheckCircle2, AlertTriangle, Sparkles } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'warning' | 'info';
  text: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onRemove: (id: string) => void;
}

export default function Toast({ toasts, onRemove }: ToastProps) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  );
}

function ToastItem({ toast, onRemove }: { toast: ToastMessage; onRemove: (id: string) => void, key?: string }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove(toast.id);
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast.id, onRemove]);

  const bgStyles = {
    success: 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/80 dark:text-emerald-200 dark:border-emerald-800/60',
    warning: 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/80 dark:text-amber-200 dark:border-amber-800/60',
    info: 'bg-indigo-50 text-indigo-800 border-indigo-200 dark:bg-indigo-950/80 dark:text-indigo-200 dark:border-indigo-800/60',
  };

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-500" />,
    info: <Sparkles className="w-5 h-5 text-indigo-500" />,
  };

  return (
    <div
      onClick={() => onRemove(toast.id)}
      className={`pointer-events-auto flex items-center gap-3 p-4 rounded-xl border shadow-lg glass-panel transition-all duration-300 transform translate-y-0 scale-100 cursor-pointer animate-slide-up ${bgStyles[toast.type]}`}
      id={`toast-${toast.id}`}
    >
      {icons[toast.type]}
      <p className="text-sm font-medium font-sans">{toast.text}</p>
    </div>
  );
}
