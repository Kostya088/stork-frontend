"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { logout as logoutApi } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import ConfirmationModal from "@/components/modals/ConfirmationModal/ConfirmationModal";
import Image from "next/image";
import Link from "next/link";
import css from "./UserBar.module.css";

export default function UserBar() {
  const [isPending, startTransition] = useTransition();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated,
  );

  const handleLogout = async () => {
    try {
      await logoutApi();
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
              width={180}
              height={38}
              src={user.avatar}
              alt={user.name}
              className={css.avatarImage}
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
      <ConfirmationModal
        isOpen={isLogoutModalOpen}
        title="Ви точно хочете вийти?"
        confirmButtonText="Так"
        cancelButtonText="Ні"
        isLoading={isPending}
        onConfirm={handleLogout}
        onCancel={() => setIsLogoutModalOpen(false)}
      />
    </div>
  );
}
