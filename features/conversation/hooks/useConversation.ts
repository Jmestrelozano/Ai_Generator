"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useSendConversation } from "@/features/conversation/hooks/handler/useSendConversation";
import {
  formSchema,
  type FormValues,
} from "@/features/conversation/types/formSchema";
import type { ChatMessage } from "@/features/conversation/types/message";

export const useConversation = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { prompt: "" },
  });

  const { send } = useSendConversation({ messages, setMessages, form });

  return {
    messages,
    form,
    isLoading: form.formState.isSubmitting,
    onSubmit: form.handleSubmit(send),
  };
};
