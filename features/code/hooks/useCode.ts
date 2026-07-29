"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useSendCode } from "@/features/code/hooks/handler/useSendCode";
import { formSchema, type FormValues } from "@/features/code/types/formSchema";
import type { ChatMessage } from "@/features/code/types/message";

export const useCode = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { prompt: "" },
  });

  const { send } = useSendCode({ messages, setMessages, form });

  return {
    messages,
    form,
    isLoading: form.formState.isSubmitting,
    onSubmit: form.handleSubmit(send),
  };
};
