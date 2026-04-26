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
      <GreetingBlock />
      <StatusBlock />
      <BabyTodayCard />
      <MomTipCard />
      <TasksReminderCard />
      <FeelingCheckCard />
    </div>
  );
  return (
    <>
      <p>DashboardPage</p>
    </>
  );
}
