"use client";

// Компонент для рендеру div-а "Хедер профіля"

import { updateUserAvatar } from "@/lib/api/clientApi";
import { User } from "@/types/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import toast from "react-hot-toast";

interface ProfileAvatarProps {
  user: User | null;
}

export default function ProfileAvatar({ user }: ProfileAvatarProps) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateUserAvatar,
    onSuccess: () => {
      toast.success("Ваш аватар оновлено");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const fileInput = useRef<HTMLInputElement>(null);

  const openFileWindows = () => {
    fileInput.current?.click();
  };

  const updateAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    // якщо немає фото -> завершити функцію
    if (!file) return;

    // якщо фото не визначеного формату -> вивести тос-повідомлення про це і завершити функцію
    if (!["image/jpeg", "image/jpg", "image/webp"].includes(file.type)) {
      toast.error("Загрузіть будь-ласка файли форматів .jpeg, .jpg або .webp");
      return;
    }

    // Відправка фото під ключем 'avatar'
    const formData = new FormData();
    formData.append("avatar", file);
    mutation.mutate(formData);
  };

  return (
    <div className={css}>
      <div className={css}>
        {user?.avatar ? (
          <Image
            className={css}
            src={user.avatar}
            alt={user.name}
            height={132}
            width={132}
          />
        ) : (
          <div className={css}>Avatar</div>
        )}
      </div>

      <div>
        <h1 className={css}>{user?.name}</h1>
        <p className={css}>{user?.email}</p>
        <input type="file" hidden ref={fileInput} onChange={updateAvatar} />
        <button className={css} onClick={openFileWindows}>
          {mutation.isPending ? "Йде завантаження " : "Завантажити нове фото"}
        </button>
      </div>
    </div>
  );
}
