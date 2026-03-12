"use client";

import { useState } from "react";
import { ModalContext } from "./ModalContext";

import ReferralModal from "../modals/ReferralModal";
import LeaderboardModal from "../modals/LeaderboardModal";

export default function ModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [modalType, setModalType] = useState<string | null>(null);

  const openModal = (type: string) => {
    setModalType(type);
  };

  const closeModal = () => {
    setModalType(null);
  };

  return (
    <ModalContext.Provider value={{ openModal }}>
      {children}

      {modalType === "referral" && (
        <ReferralModal onClose={closeModal} />
      )}

      {modalType === "other" && (
        <LeaderboardModal onClose={closeModal} />
      )}
    </ModalContext.Provider>
  );
}