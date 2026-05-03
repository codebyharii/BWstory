import { useState } from 'react';
import { useAuth } from './useAuth';

interface ProfileData {
  name: string;
  location: string;
  profession: string;
  bio: string;
  posts: number;
  followers: number;
  following: number;
}

export const useProfile = () => {
  const { user, editProfile } = useAuth();
  const [saving, setSaving] = useState(false);

  // In a real app this would come from the store or API
  const profile: ProfileData = {
    name: user?.name ?? 'Guest',
    location: user?.location ?? '',
    profession: user?.profession ?? '',
    bio: '',
    posts: 15,
    followers: 85000,
    following: 12000,
  };

  const updateProfile = async (data: Partial<ProfileData>) => {
    setSaving(true);
    await new Promise((res) => setTimeout(res, 800));
    editProfile({ name: data.name, location: data.location, profession: data.profession });
    setSaving(false);
  };

  return { profile, saving, updateProfile };
};
