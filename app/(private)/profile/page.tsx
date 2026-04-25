"use client";
import ProfileAvatar from "@/components/profile/ProfileAvatar/ProfileAvatar";
import { getMe } from "@/lib/api/clientApi";
import { useQuery } from "@tanstack/react-query";

export default function ProfilePage() {
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const user = await getMe();
      return user;
    },
  });

  if (isLoading) return <p>Завантаження...</p>;
  if (isError || !user)
    return <p>Сталася помилка. Спробуйте перегрузити сторінку</p>;

  return (
    <>
      <ProfileAvatar user={user} />
      <ProfileEditForm />
    </>
  );
}
