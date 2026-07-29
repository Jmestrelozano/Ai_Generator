"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import type { Dispatch, SetStateAction } from "react";
import type { UseFormReturn } from "react-hook-form";

import { useGenerationError } from "@/features/shared/hooks/handler/useGenerationError";
import type { FormValues } from "@/features/music/types/formSchema";

type Params = {
  setMusic: Dispatch<SetStateAction<string | undefined>>;
  form: UseFormReturn<FormValues>;
};

export const useGenerateMusic = ({ setMusic, form }: Params) => {
  const router = useRouter();
  const { handleError } = useGenerationError();

  const generate = async (values: FormValues) => {
    try {
      setMusic(undefined);
      const response = await axios.post("/api/music", values);
      setMusic(response.data.audio);
      form.reset();
    } catch (error) {
      handleError(error);
    } finally {
      router.refresh();
    }
  };

  return { generate };
};
