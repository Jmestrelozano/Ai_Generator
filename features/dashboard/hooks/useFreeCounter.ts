"use client";

import { useEffect, useState } from "react";

import { useProModal } from "@/features/shared/hooks/use-pro-modal";

export const useFreeCounter = () => {
  const [mounted, setMounted] = useState(false);
  const proModal = useProModal();

  useEffect(() => {
    setMounted(true);
  }, []);

  return {
    mounted,
    onUpgrade: proModal.onOpen,
  };
};
