"use client";

import { useState } from "react";
import ReferHero from "./ReferHero";
import ReferralModal from "./MyReferralLink";

export default function ReferralController() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <ReferHero openModal={() => setOpenModal(true)} />

      {openModal && (
        <ReferralModal onClose={() => setOpenModal(false)} />
      )}
    </>
  );
}