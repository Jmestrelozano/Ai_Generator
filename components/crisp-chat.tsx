"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("ccbfe6a5-dee8-45a7-8b8a-81446fc7cff2");
  }, []);

  return null;
};
