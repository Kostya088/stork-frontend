'use client';
import ProfileAvatar from '@/components/profile/ProfileAvatar/ProfileAvatar';
import ProfileEditForm from '@/components/profile/ProfileEditForm/ProfileEditForm';
import { getMe } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import { useQuery } from '@tanstack/react-query';

export default function ProfilePage() {
  const setUser = useAuthStore((state) => state.setUser);

  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const user = await getMe();
      setUser(user);
      return user;
    },
  });

  if (isLoading) return <p>Завантаження...</p>;
  if (isError || !user)
    return <p>Сталася помилка. Спробуйте перегрузити сторінку</p>;

  return (
    <>
      <ProfileAvatar user={user} />
      <ProfileEditForm user={user} />
    </>
  );
}
