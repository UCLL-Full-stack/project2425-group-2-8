// pages/user/[userId].tsx
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import UserService from "@/services/UserService";
import ProfileOverview from "@/components/users/ProfileOverview";

const UserProfilePage: React.FC = () => {
  const router = useRouter();
  const { userId } = router.query;
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const getUserById = async () => {
    const userResponse = await UserService.getUserById(Number(userId));
    const user = await userResponse.json();
    setUser(user);
  };

  useEffect(() => {
    if (userId) getUserById();
  }, [userId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return user ? <ProfileOverview user={user} /> : <div>Loading...</div>;
};

export default UserProfilePage;
