"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useGenerateVideo } from "@/features/video/hooks/handler/useGenerateVideo";
import {
  formSchema,
  type FormValues,
} from "@/features/video/types/formSchema";

export const useVideo = () => {
  const [video, setVideo] = useState<string>();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { prompt: "" },
  });

  const { generate } = useGenerateVideo({ setVideo, form });

  return {
    video,
    form,
    isLoading: form.formState.isSubmitting,
    onSubmit: form.handleSubmit(generate),
  };
};
