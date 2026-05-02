import DiaryPage from "@/components/diary/DiaryPage/DiaryPage";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Щоденник | Leleka",
    description: "Ваші записи щоденника",
  };
}

export default function DiaryRoutePage() {
  return <DiaryPage />;
}
