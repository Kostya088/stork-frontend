import DiaryPage from "@/components/diary/DiaryPage/DiaryPage";

interface DiaryEntryRoutePageProps {
  params: Promise<{ entryId: string }>;
}

export default async function DiaryEntryRoutePage({ params }: DiaryEntryRoutePageProps) {
  const { entryId } = await params;

  return <DiaryPage initialSelectedId={entryId} detailOnly />;
}