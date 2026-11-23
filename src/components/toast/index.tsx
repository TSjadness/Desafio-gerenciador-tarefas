"use client";

import React, { createContext, useCallback, useContext, useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import { ToastContainer, ToastItem } from "./styles";

type ToastType = "sucesso" | "erro";

type Toast = {
  id: number;
  tipo: ToastType;
  mensagem: string;
};

type ToastContextProps = {
  showToast: (mensagem: string, tipo?: ToastType) => void;
};

const ToastContext = createContext<ToastContextProps | null>(null);


export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((mensagem: string, tipo: ToastType = "sucesso") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, tipo, mensagem }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3500);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <ToastContainer>
        {toasts.map((toast) => (
          <ToastItem key={toast.id} $tipo={toast.tipo} role="status">
            {toast.tipo === "sucesso" ? <CheckCircle size={18} /> : <XCircle size={18} />}
            {toast.mensagem}
          </ToastItem>
        ))}
      </ToastContainer>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast precisa estar dentro do ToastProvider");
  }
  return context;
};
