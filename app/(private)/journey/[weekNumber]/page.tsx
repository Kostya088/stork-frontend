import GreetingBlock from "@/components/dashboard/GreetingBlock/GreetingBlock";
import WeekSelector from "@/components/journey/WeekSelector/WeekSelector";
import JourneyDetails from "@/components/journey/JourneyDetails/JourneyDetails";
// import styles from "./page.module.css";

interface Props {
  params: Promise<{ weekNumber: string }>;
}

export default async function JourneyDetailsPage({ params }: Props) {
  const { weekNumber } = await params;
  const week = Number(weekNumber);

  return (
    // <div className={styles.page}>
    <div>
      <GreetingBlock />

      <WeekSelector selectedWeek={week} />
      <JourneyDetails weekNumber={week} />
    </div>
  );
}
