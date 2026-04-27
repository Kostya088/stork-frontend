"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { logout as logoutApi } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { useSidebarStore } from "@/lib/store/sidebarStore";
import Image from "next/image";
import Link from "next/link";
import css from "./UserBar.module.css";
import Modal from "@/components/modal/Modal/Modal";
import ConfirmationContent from "@/components/modal/ConfirmationContent/ConfirmationContent";

export default function UserBar() {
  const [, startTransition] = useTransition();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated,
  );
  const closeSidebar = useSidebarStore((state) => state.close);
  const closeLogoutModal = () => setIsLogoutModalOpen(false);

  const handleLogout = async () => {
    try {
      await logoutApi();
      closeLogoutModal();
      closeSidebar();
      clearIsAuthenticated();
      startTransition(() => {
        router.push("/login");
      });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (!user) return null;

  return (
    <div className={css.wrapper}>
      <Link href="/profile" className={css.container}>
        <div className={css.avatar}>
          {user.avatar ? (
            <Image
              width={40}
              height={40}
              src={user.avatar}
              alt={user.name}
              className={css.avatarImage}
              loading="eager"
            />
          ) : (
            <span className={css.avatarPlaceholder}>
              {user.name.charAt(0).toUpperCase()}
            </span>
          )}
        </div>
        <div className={css.info}>
          <span className={css.name}>{user.name}</span>
          <span className={css.email}>{user.email}</span>
        </div>
      </Link>
      <button
        className={css.logoutButton}
        onClick={() => setIsLogoutModalOpen(true)}
        aria-label="Вихід"
      >
        <svg className={css.logoutIcon}>
          <use href="/icons/sprite.svg#icon-logout" />
        </svg>
      </button>

      <Modal isOpen={isLogoutModalOpen} onClose={closeLogoutModal}>
        <ConfirmationContent
          title="Ви точно хочете вийти?"
          onConfirm={handleLogout}
          onCancel={closeLogoutModal}
        />
      </Modal>
    </div>
  );
}
