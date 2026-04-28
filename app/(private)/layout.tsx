"use client";

import Breadcrumbs from "@/components/layout/Breadcrumbs/Breadcrumbs";
import { DesktopSidebar } from "@/components/layout/SideBar/SideBar";
import css from "./layout.module.css";
import { usePathname } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

export default function PrivateLayout({ children }: Props) {
  const pathname = usePathname();
  const isAuthPage =
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/profile/edit";
  return (
    <div className={`${css.layout} ${isAuthPage ? css.noSidebar : ""}`}>
      {!isAuthPage && (
        <aside className={css.sidebarDesktop}>
          <DesktopSidebar />
        </aside>
      )}
      <div className={css.main}>
        <Breadcrumbs />
        {children}
      </div>
    </div>
  );
}
