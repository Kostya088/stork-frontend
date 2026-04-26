"use client";

import { useState } from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import css from "./UserAvatarSelector.module.css";
import { getMe } from "@/lib/api/clientApi";

interface UserAvatarSelectorProps {
  onSelectFile: (file: File) => void;
}

const UserAvatarSelector = ({ onSelectFile }: UserAvatarSelectorProps) => {
  const [image, setImage] = useState<string | null>(null);

  const { data: user } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
  });

  const handleClick = () => {
    const inputElem = document.createElement("input");
    inputElem.type = "file";
    inputElem.accept = "image/*";

    inputElem.addEventListener("change", () => {
      const file = inputElem.files?.[0];
      if (!file) return;

      const url = URL.createObjectURL(file);
      setImage(url);
      onSelectFile(file);
    });

    inputElem.click();
  };

  const imageSrc =
    image ||
    (typeof user?.avatar === "string" && user.avatar.trim() !== ""
      ? user.avatar
      : null);

  return (
    <div className={css.userAvatarSelector}>
      {imageSrc ? (
        <Image
          className={css.avatar}
          alt="avatar"
          width={164}
          height={164}
          src={imageSrc}
        />
      ) : (
        <div className={css.avatar} />
      )}

      <button className={css.btn} onClick={handleClick} type="button">
        Завантажити фото
      </button>
    </div>
  );
};

export default UserAvatarSelector;
