"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import type { Dispatch, SetStateAction } from "react";
import { useGenerationError } from "@/features/shared/hooks/handler/useGenerationError";
import type { FormValues } from "@/features/image/types/formSchema";

type Params = {
  setPhotos: Dispatch<SetStateAction<string[]>>;
};

export const useGenerateImage = ({ setPhotos }: Params) => {
  const router = useRouter();
  const { handleError } = useGenerationError();

  const generate = async (values: FormValues) => {
    try {
      setPhotos([]);
      const response = await axios.post("/api/image", values);
      const urls = response.data.map((image: { url: string }) => image.url);
      setPhotos(urls);
    } catch (error) {
      handleError(error);
    } finally {
      router.refresh();
    }
  };

  return { generate };
};
