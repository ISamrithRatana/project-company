"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

// 1️⃣ Define the shape of our context
type DialogContextType = {
  open: boolean;
  content: ReactNode | null;
  showDialog: (content: ReactNode) => void;
  hideDialog: () => void;
};

// 2️⃣ Create context with default values
const DialogContext = createContext<DialogContextType | undefined>(undefined);

// 3️⃣ Hook for easy access
export function useDialog() {
  const context = useContext(DialogContext);
  if (!context) throw new Error("useDialog must be used within DialogProvider");
  return context;
}

// 4️⃣ Provider component
export function DialogProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState<ReactNode | null>(null);

  const showDialog = (node: ReactNode) => {
    setContent(node);
    setOpen(true);
  };

  const hideDialog = () => {
    setOpen(false);
    setContent(null);
  };

  return (
    <DialogContext.Provider value={{ open, content, showDialog, hideDialog }}>
      {/* The actual dialog UI */}
      {children}
      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full">
            {content}
          </div>
        </div>
      )}
    </DialogContext.Provider>
  );
}
