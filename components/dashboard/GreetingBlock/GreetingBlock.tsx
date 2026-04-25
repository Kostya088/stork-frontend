"use client";

import { useAuthStore } from "@/lib/store/authStore";
import css from "./GreetingBlock.module.css";

function getGreeting() {
  const hour = new Date().getHours();

  if (hour >= 6 && hour < 12) return "Доброго ранку";
  if (hour >= 12 && hour < 18) return "Доброго дня";
  if (hour >= 18 && hour < 24) return "Доброго вечора";
  return "Доброї ночі";
}

export default function GreetingBlock() {
  const user = useAuthStore((state) => state.user);
  const name = user?.name ?? "Ганно";

  return (
    <section className={css.block}>
      <h1 className={css.title}>
        {getGreeting()}, {name}!
      </h1>
    </section>
  );
}