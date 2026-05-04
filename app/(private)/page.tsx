import GreetingBlock from '@/components/dashboard/GreetingBlock/GreetingBlock';
import StatusBlock from '@/components/dashboard/StatusBlock/StatusBlock';
import BabyTodayCard from '@/components/dashboard/BabyTodayCard/BabyTodayCard';
import MomTipCard from '@/components/dashboard/MomTipCard/MomTipCard';
import TasksReminderCard from '@/components/dashboard/TasksReminderCard/TasksReminderCard';
import FeelingCheckCard from '@/components/dashboard/FeelingCheckCard/FeelingCheckCard';
import styles from './page.module.css';
import { getPublicWeek } from '@/lib/api/serverApi';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

export default async function DashboardPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['weeks', 'public', 1],
    queryFn: () => getPublicWeek(1),
  });

  const dehydratedState = dehydrate(queryClient);
  const publicWeekData = queryClient.getQueryData<
    import('@/types/weekInfo').WeekDashboardInfo
  >(['weeks', 'public', 1]);

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className={styles.dashboard}>
        <GreetingBlock />

        <div className={styles.grid}>
          <div className={styles.leftColumn}>
            <StatusBlock />

            <BabyTodayCard initialWeekData={publicWeekData} />

            <MomTipCard />
          </div>

          <div className={styles.rightColumn}>
            <TasksReminderCard />
            <FeelingCheckCard />
          </div>
        </div>
      </div>
    </HydrationBoundary>
  );
}
