"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import type { Dispatch, SetStateAction } from "react";
import type { UseFormReturn } from "react-hook-form";

import { useGenerationError } from "@/features/shared/hooks/handler/useGenerationError";
import type { ChatMessage } from "@/features/conversation/types/message";
import type { FormValues } from "@/features/conversation/types/formSchema";

type Params = {
  messages: ChatMessage[];
  setMessages: Dispatch<SetStateAction<ChatMessage[]>>;
  form: UseFormReturn<FormValues>;
};

export const useSendConversation = ({
  messages,
  setMessages,
  form,
}: Params) => {
  const router = useRouter();
  const { handleError } = useGenerationError();

  const send = async (values: FormValues) => {
    try {
      const userMessage: ChatMessage = {
        role: "user",
        content: values.prompt,
      };
      const newMessages = [...messages, userMessage];

      const response = await axios.post("/api/conversation", {
        messages: newMessages,
      });
      setMessages((current) => [...current, userMessage, response.data]);
      form.reset();
    } catch (error) {
      handleError(error);
    } finally {
      router.refresh();
    }
  };

  return { send };
};
