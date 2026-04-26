"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import css from "./FeelingCheckCard.module.css";

export default function FeelingCheckCard() {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const handleClick = () => {
    if (!isAuthenticated) {
      router.push("/register");
      return;
    }

    // TODO: open AddDiaryEntryModal when modal is ready
    console.log("Open AddDiaryEntryModal");
  };

  return (
    <section className={css.card}>
      <h2 className={css.title}>Як ви себе почуваєте?</h2>
      <p className={css.text}>Рекомендація на сьогодні:</p>
      <p className={css.text}>Занотуйте незвичні відчуття у тілі.</p>

      <button type="button" className={css.button} onClick={handleClick}>
        Зробити запис у щоденник
      </button>
    </section>
  );
}