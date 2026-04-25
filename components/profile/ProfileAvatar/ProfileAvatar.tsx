"use client";

import { updateUserAvatar } from "@/lib/api/clientApi";
import { User } from "@/types/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface ProfileAvatarProps {
  user: User | null;
}

export default function ProfileAvatar({ user }: ProfileAvatarProps) {
  const queryClient = useQueryClient();
  const mutationFn = useMutation({
    mutationFn: updateUserAvatar,
    onSuccess: () => {
      toast.success("Ваш аватар оновлено");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const updateAvatar;
}
