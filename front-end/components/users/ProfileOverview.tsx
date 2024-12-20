import React from "react";

type Profile = {
  firstName: string;
  name: string;
  dateOfBirth: string;
};

type User = {
    email: string;
    role: string;
    profile: Profile;
};

interface ProfileOverviewProps {
  user: User;
}

const ProfileOverview: React.FC<ProfileOverviewProps> = ({ user }) => {
  if (!user) return <div>Loading profile...</div>;

  console.log(user)
  const { email, role, profile } = user;
  return (
    <div className="profile-content">
      <h1>
        Profiel van {profile.firstName} {profile.name}
      </h1>
      <p>Email: {email}</p>
      <p>Rol: {role}</p>
      <p>Geboortedatum: {new Date(profile.dateOfBirth).toLocaleDateString()}</p>
    </div>
  );
};

export default ProfileOverview;
