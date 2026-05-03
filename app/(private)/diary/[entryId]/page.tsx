import DiaryPage from '@/components/diary/DiaryPage/DiaryPage';
import { Metadata } from 'next';

interface DiaryEntryRoutePageProps {
  params: Promise<{ entryId: string }>;
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Деталі запису | Щоденник Leleka',
    description: 'Перегляд запису щоденника',
  };
}

export default async function DiaryEntryRoutePage({
  params,
}: DiaryEntryRoutePageProps) {
  const { entryId } = await params;

  return <DiaryPage initialSelectedId={entryId} detailOnly />;
}
