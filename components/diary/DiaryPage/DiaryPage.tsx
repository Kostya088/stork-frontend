"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./DiaryPage.module.css";
import DiaryList from "@/components/diary/DiaryList/DiaryList";
import DiaryEntryDetails from "@/components/diary/DiaryEntryDetails/DiaryEntryDetails";
import Modal from "@/components/modal/Modal/Modal";
import AddDiaryEntryForm from "@/components/modal/modalForms/AddDiaryEntryForm/AddDiaryEntryForm";
// import ConfirmationModal from "@/components/modal/ConfirmationModal/ConfirmationModal";
import {
  createDiary,
  // deleteDiary,
  getDiaries,
  getEmotions,
  updateDiary,
  type CreateDiaryData,
  type UpdateDiaryData,
} from "@/lib/api/clientApi";
import type { DiaryEntry } from "@/types/diaryEntry";
import type { Emotion } from "@/types/emotion";

interface DiaryPageProps {
  initialSelectedId?: string;
  detailOnly?: boolean;
}

const resolveEntryEmotions = (
  entry: DiaryEntry,
  emotions: Emotion[],
): DiaryEntry => {
  const emotionsById = new Map(
    emotions.map((emotion) => [emotion._id, emotion]),
  );

  return {
    ...entry,
    emotions: entry.emotions.map((emotion) => {
      if (typeof emotion !== "string") return emotion;
      return emotionsById.get(emotion) ?? emotion;
    }),
  };
};

export default function DiaryPage({
  initialSelectedId,
  detailOnly = false,
}: DiaryPageProps) {
  const router = useRouter();
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [emotions, setEmotions] = useState<Emotion[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(
    initialSelectedId ?? null,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEntryModalOpen, setIsEntryModalOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<DiaryEntry | null>(null);
  // const [entryToDelete, setEntryToDelete] = useState<DiaryEntry | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const [entriesData, emotionsData] = await Promise.all([
          getDiaries(),
          getEmotions(),
        ]);

        if (!isMounted) return;

        setEntries(
          entriesData.map((entry) => resolveEntryEmotions(entry, emotionsData)),
        );
        setEmotions(emotionsData);

        if (initialSelectedId) {
          setSelectedId(initialSelectedId);
          return;
        }

        if (entriesData.length > 0) {
          setSelectedId((currentId) => currentId ?? entriesData[0]._id);
        }
      } catch {
        if (isMounted) {
          setError("Не вдалося завантажити записи щоденника");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void fetchData();

    return () => {
      isMounted = false;
    };
  }, [initialSelectedId]);

  const selectedEntry = useMemo(() => {
    if (!selectedId) return null;
    return entries.find((entry) => entry._id === selectedId) ?? null;
  }, [entries, selectedId]);

  const handleSelectEntry = (entry: DiaryEntry) => {
    setSelectedId(entry._id);

    if (window.matchMedia("(max-width: 1023px)").matches) {
      router.push(`/diary/${entry._id}`);
    }
  };

  const handleCreateClick = () => {
    setEditingEntry(null);
    setIsEntryModalOpen(true);
  };

  const handleEditClick = (entry: DiaryEntry) => {
    setEditingEntry(entry);
    setIsEntryModalOpen(true);
  };

  const handleSubmitEntry = async (data: CreateDiaryData | UpdateDiaryData) => {
    try {
      setIsSubmitting(true);
      setError(null);

      if (editingEntry) {
        const updatedEntry = resolveEntryEmotions(
          await updateDiary(editingEntry._id, data),
          emotions,
        );
        setEntries((currentEntries) =>
          currentEntries.map((entry) =>
            entry._id === updatedEntry._id ? updatedEntry : entry,
          ),
        );
        setSelectedId(updatedEntry._id);
      } else {
        const createdEntry = resolveEntryEmotions(
          await createDiary(data as CreateDiaryData),
          emotions,
        );
        setEntries((currentEntries) => [createdEntry, ...currentEntries]);
        setSelectedId(createdEntry._id);
      }

      setIsEntryModalOpen(false);
      setEditingEntry(null);
    } catch {
      setError(
        "Не вдалося зберегти запис. Перевірте дані та спробуйте ще раз.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // const handleDeleteConfirm = async () => {
  //   if (!entryToDelete) return;

  //   try {
  //     setIsSubmitting(true);
  //     setError(null);
  //     await deleteDiary(entryToDelete._id);
  //     setEntries((currentEntries) => {
  //       const nextEntries = currentEntries.filter(
  //         (entry) => entry._id !== entryToDelete._id,
  //       );
  //       if (selectedId === entryToDelete._id) {
  //         setSelectedId(nextEntries[0]?._id ?? null);
  //       }
  //       return nextEntries;
  //     });
  //     setEntryToDelete(null);

  //     if (detailOnly) {
  //       router.push("/diary");
  //     }
  //   } catch {
  //     setError("Не вдалося видалити запис. Спробуйте ще раз.");
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  return (
    <main className={`${styles.page} ${detailOnly ? styles.detailPage : ""}`}>
      {error && <p className={styles.error}>{error}</p>}

      <section className={styles.content}>
        {!detailOnly && (
          <DiaryList
            entries={entries}
            selectedEntryId={selectedId}
            isLoading={isLoading}
            onSelectEntry={handleSelectEntry}
            onCreateEntry={handleCreateClick}
          />
        )}

        {detailOnly && (
          <DiaryEntryDetails
            entry={selectedEntry}
            isLoading={isLoading}
            isStandalone
            onBack={() => router.push("/diary")}
            onEdit={handleEditClick}
            onDelete={() => {}}
          />
        )}

        {!detailOnly && (
          <div className={styles.desktopDetails}>
            <DiaryEntryDetails
              entry={selectedEntry}
              isLoading={isLoading}
              onEdit={handleEditClick}
              onDelete={() => {}}
            />
          </div>
        )}
      </section>

      <Modal
        isOpen={isEntryModalOpen}
        onClose={() => {
          setIsEntryModalOpen(false);
          setEditingEntry(null);
        }}
      >
        <AddDiaryEntryForm
          entry={editingEntry}
          emotions={emotions}
          isSubmitting={isSubmitting}
          onSubmit={handleSubmitEntry}
        />
      </Modal>

      {/* <ConfirmationModal
        isOpen={Boolean(entryToDelete)}
        title="Видалити запис?"
        confirmButtonText="Видалити"
        cancelButtonText="Скасувати"
        isLoading={isSubmitting}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setEntryToDelete(null)}
      /> */}
    </main>
  );
}
