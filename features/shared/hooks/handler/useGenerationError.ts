"use client";

import { toast } from "react-hot-toast";

import { useProModal } from "@/features/shared/hooks/use-pro-modal";

export const useGenerationError = () => {
  const proModal = useProModal();

  const handleError = (error: unknown) => {
    const status = (error as { response?: { status?: number } })?.response
      ?.status;
    if (status === 403) {
      proModal.onOpen();
      return;
    }
    toast.error("Something went wrong.");
  };

  return { handleError };
};
