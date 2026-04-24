"use client";

import { useState } from "react";
import css from "./UserAvatarSelector.module.css";
import Image from "next/image";

interface UserAvatarSelectorProps {
  onSelectFile: (file: File) => void;
}

const UserAvatarSelector = ({ onSelectFile }: UserAvatarSelectorProps) => {
  const [image, setImage] = useState("/myfrontwork/images/Avatar Image.png");
  const handleClick = () => {
    const inputElem = document.createElement("input");
    inputElem.setAttribute("type", "file");
    inputElem.addEventListener("change", (i) => {
      console.log(inputElem.files);
      const file = inputElem?.files?.[0] as File;
      const url = URL.createObjectURL(file);
      setImage(url);
      onSelectFile(file);
    });
    inputElem.click();
  };

  return (
    <div className={css["userAvatarSelector"]}>
      <Image
        className={css.avatar}
        alt="avatar"
        width={164}
        height={164}
        src={image}
      />
      <button className={css.btn} onClick={handleClick} type="submit">
        Завантажити фото
      </button>
    </div>
  );
};

export default UserAvatarSelector;
