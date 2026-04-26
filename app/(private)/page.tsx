"use client";

import GreetingBlock from "@/components/dashboard/GreetingBlock/GreetingBlock";
import StatusBlock from "@/components/dashboard/StatusBlock/StatusBlock";
import BabyTodayCard from "@/components/dashboard/BabyTodayCard/BabyTodayCard";
import MomTipCard from "@/components/dashboard/MomTipCard/MomTipCard";
import TasksReminderCard from "@/components/dashboard/TasksReminderCard/TasksReminderCard";
import FeelingCheckCard from "@/components/dashboard/FeelingCheckCard/FeelingCheckCard";
import Breadcrumbs from "@/components/layout/Breadcrumbs/Breadcrumbs";
import styles from "./page.module.css";

export default function DashboardPage() {
  return (
    <div className={styles.dashboard}>
      <Breadcrumbs />

      <GreetingBlock />

      <div className={styles.grid}>
        <div className={styles.leftColumn}>
          <div className={styles.statusGrid}>
            <StatusBlock />
          </div>

          <BabyTodayCard />

          <MomTipCard />
        </div>

        <div className={styles.rightColumn}>
          <TasksReminderCard />
          <FeelingCheckCard />
        </div>
      </div>
    </div>
  );
  return (
    <>
      <p>DashboardPage</p>
    </>
  );
}
