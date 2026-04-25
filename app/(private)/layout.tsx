import Header from "@/components/layout/Header/Header";
import Breadcrumbs from "@/components/layout/Breadcrumbs/Breadcrumbs";
import SideBar from "@/components/layout/SideBar/SideBar";
import css from "./layout.module.css";

type Props = {
  children: React.ReactNode;
};

export default function PrivateLayout({ children }: Props) {
  return (
    <div className={css.layout}>
      <Header showMobileButton={true} hideOnDesktop={true} />
      <aside className={css.sidebarDesktop}>
        <SideBar />
      </aside>
      <main className={css.main}>
        <Breadcrumbs />
        {children}
      </main>
    </div>
  );
}
