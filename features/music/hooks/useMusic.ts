"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useGenerateMusic } from "@/features/music/hooks/handler/useGenerateMusic";
import {
  formSchema,
  type FormValues,
} from "@/features/music/types/formSchema";

export const useMusic = () => {
  const [music, setMusic] = useState<string>();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { prompt: "" },
  });

  const { generate } = useGenerateMusic({ setMusic, form });

  return {
    music,
    form,
    isLoading: form.formState.isSubmitting,
    onSubmit: form.handleSubmit(generate),
  };
};
