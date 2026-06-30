"use client";

import { useState } from "react";
import { LoginModal } from "@/components/auth/login-modal";
import { RegisterModal } from "@/components/auth/register-modal";

type ActiveModal = "login" | "register" | null;

interface AuthModalsContextValue {
  openLogin: () => void;
  openRegister: () => void;
}

export function useAuthModalsTriggers(
  setActiveModal: (modal: ActiveModal) => void,
): AuthModalsContextValue {
  return {
    openLogin: () => setActiveModal("login"),
    openRegister: () => setActiveModal("register"),
  };
}

export function AuthModals({
  children,
}: {
  children: (triggers: AuthModalsContextValue) => React.ReactNode;
}) {
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);

  return (
    <>
      {children({
        openLogin: () => setActiveModal("login"),
        openRegister: () => setActiveModal("register"),
      })}

      <LoginModal
        open={activeModal === "login"}
        onOpenChange={(open) => setActiveModal(open ? "login" : null)}
        onSwitchToRegister={() => setActiveModal("register")}
      />

      <RegisterModal
        open={activeModal === "register"}
        onOpenChange={(open) => setActiveModal(open ? "register" : null)}
        onSwitchToLogin={() => setActiveModal("login")}
      />
    </>
  );
}
