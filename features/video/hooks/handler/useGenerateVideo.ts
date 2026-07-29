"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import type { Dispatch, SetStateAction } from "react";
import type { UseFormReturn } from "react-hook-form";

import { useGenerationError } from "@/features/shared/hooks/handler/useGenerationError";
import type { FormValues } from "@/features/video/types/formSchema";

type Params = {
  setVideo: Dispatch<SetStateAction<string | undefined>>;
  form: UseFormReturn<FormValues>;
};

export const useGenerateVideo = ({ setVideo, form }: Params) => {
  const router = useRouter();
  const { handleError } = useGenerationError();

  const generate = async (values: FormValues) => {
    try {
      setVideo(undefined);
      const response = await axios.post("/api/video", values);
      setVideo(response.data[0]);
      form.reset();
    } catch (error) {
      handleError(error);
    } finally {
      router.refresh();
    }
  };

  return { generate };
};
