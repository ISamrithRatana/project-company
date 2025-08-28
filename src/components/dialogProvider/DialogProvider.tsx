"use client"
import React, { createContext, useContext, useState } from "react"

// 1️⃣ Define the shape of our context
type DialogContextType = {
  open: boolean
  message: string | null
  showDialog: (msg: string) => void
  hideDialog: () => void
}

// 2️⃣ Create context with default values
const DialogContext = createContext<DialogContextType | undefined>(undefined)

// 3️⃣ Hook for easy access
export function useDialog() {
  const context = useContext(DialogContext)
  if (!context) throw new Error("useDialog must be used within DialogProvider")
  return context
}

// 4️⃣ Provider component
export function DialogProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const showDialog = (msg: string) => {
    setMessage(msg)
    setOpen(true)
  }

  const hideDialog = () => {
    setOpen(false)
    setMessage(null)
  }

  return (
    <DialogContext.Provider value={{ open, message, showDialog, hideDialog }}>
      {children}
      {/* The actual dialog UI */}
      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <p>{message}</p>
            <button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
              onClick={hideDialog}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </DialogContext.Provider>
  )
}
