"use client";

import GreetingBlock from "@/components/dashboard/GreetingBlock/GreetingBlock";
import StatusBlock from "@/components/dashboard/StatusBlock/StatusBlock";
import BabyTodayCard from "@/components/dashboard/BabyTodayCard/BabyTodayCard";
import MomTipCard from "@/components/dashboard/MomTipCard/MomTipCard";
import TasksReminderCard from "@/components/dashboard/TasksReminderCard/TasksReminderCard";
import FeelingCheckCard from "@/components/dashboard/FeelingCheckCard/FeelingCheckCard";
import styles from "./page.module.css";

export default function DashboardPage() {
  return (
    <div className={styles.dashboard}>
      <div className={styles.greeting}>
        <GreetingBlock />
      </div>

      <div className={styles.status}>
        <div className={styles.statusRow}>
          <StatusBlock type="week" />
          <StatusBlock type="daysLeft" />
        </div>
      </div>

      <div className={styles.baby}>
        <BabyTodayCard />
      </div>

      <div className={styles.tip}>
        <MomTipCard />
      </div>

      <div className={styles.tasks}>
        <TasksReminderCard />
      </div>

      <div className={styles.feeling}>
        <FeelingCheckCard />
      </div>
    </div>
  );
}
