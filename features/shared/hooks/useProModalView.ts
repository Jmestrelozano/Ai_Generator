"use client";

import { useProModal } from "@/features/shared/hooks/use-pro-modal";
import { useSubscribeStripe } from "@/features/shared/hooks/handler/useSubscribeStripe";
import { tools } from "@/features/shared/constants";

export const useProModalView = () => {
  const proModal = useProModal();
  const { loading, subscribe } = useSubscribeStripe();

  return {
    isOpen: proModal.isOpen,
    onClose: proModal.onClose,
    tools,
    loading,
    onSubscribe: subscribe,
  };
};
