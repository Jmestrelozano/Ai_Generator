"use client";

import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";

export const useSubscribeStripe = () => {
  const [loading, setLoading] = useState(false);

  const subscribe = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/stripe");
      window.location.href = response.data.url;
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { loading, subscribe };
};
