import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import userService from "@/services/UserService";

type User = {
  id?: number;
  email: string;
  role?: string;
  profile?: {
    firstName: string;
    name: string;
  };
};

type Props = {
  users: Array<User>;
};

const LoginCredentials: React.FC<Props> = ({ users }: Props) => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const userPasswords: Record<string, string> = {
    "albert@admin.com": "Albert1234",
    "duvel@trainer.com": "Duvel1234",
    "stella@email.com": "Stella1234",
  };

  const handleUserClick = (userId: number | undefined) => {
    if (userId) {
      router.push(`/user/${userId}`);
    }
  };

  return (
    <div className="login-credentials">
      <h3>Users lijst</h3>
      {error && <p className="text-danger">{error}</p>}
      {users.length > 0 ? (
        <table className="table mt-3">
          <thead>
            <tr>
              <th>Naam</th>
              <th>Email</th>
              <th>Rol</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <React.Fragment key={user.id}>
                <tr
                  onClick={() => handleUserClick(user.id)}
                  style={{ cursor: "pointer" }} 
                >
                  <td>
                    {user.profile
                      ? `${user.profile.firstName} ${user.profile.name}`
                      : "N/A"}
                  </td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                </tr>
                <tr>
                  <td colSpan={3} style={{ fontStyle: "italic", color: "#555" }}>
                    Wachtwoord: {userPasswords[user.email]}
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-muted">Geen gebruikers gevonden.</p>
      )}
    </div>
  );
};

export default LoginCredentials;
