import Breadcrumbs from "@/components/layout/Breadcrumbs/Breadcrumbs";
import {
  DesktopSidebar,
  MobileSidebarOverlay,
} from "@/components/layout/SideBar/SideBar";
import Header from "@/components/layout/Header/Header";
import css from "./layout.module.css";

type Props = {
  children: React.ReactNode;
};

export default function PrivateLayout({ children }: Props) {
  return (
    <div className={css.layout}>
      <aside className={css.sidebarDesktop}>
        <DesktopSidebar />
      </aside>
      <div className={css.main}>
        <Header showMobileButton={true} hideOnDesktop={true} hideOnAuth={false} />
        <Breadcrumbs />
        {children}
      </div>
      <MobileSidebarOverlay />
    </div>
  );
}