"use client"

import { useCallback } from 'react'
import { toast as sonnerToast } from "sonner"

interface Toast {
  (message: string): void
  success: (message: string) => void
  error: (message: string) => void
  warning: (message: string) => void
  info: (message: string) => void
}

export function useToast(): { toast: Toast } {
  const toast: Toast = useCallback(
    (message: string) => {
      sonnerToast(message)
    },
    []
  ) as Toast

  toast.success = (message: string) => sonnerToast.success(message)
  toast.error = (message: string) => sonnerToast.error(message)
  toast.warning = (message: string) => sonnerToast.warning(message)
  toast.info = (message: string) => sonnerToast.info(message)

  return { toast }
}