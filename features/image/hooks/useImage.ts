"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useGenerateImage } from "@/features/image/hooks/handler/useGenerateImage";
import {
  formSchema,
  type FormValues,
} from "@/features/image/types/formSchema";

export const useImage = () => {
  const [photos, setPhotos] = useState<string[]>([]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      amount: "1",
      resolution: "512x512",
    },
  });

  const { generate } = useGenerateImage({ setPhotos });

  return {
    photos,
    form,
    isLoading: form.formState.isSubmitting,
    onSubmit: form.handleSubmit(generate),
  };
};
