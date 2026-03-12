"use client";

import { createContext, useContext } from "react";

type ModalContextType = {
  openModal: (type: string) => void;
};

export const ModalContext = createContext<ModalContextType>({
  openModal: () => {},
});

export const useModal = () => useContext(ModalContext);