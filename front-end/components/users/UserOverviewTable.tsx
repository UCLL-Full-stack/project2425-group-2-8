import React, { useEffect, useState } from "react";
import { Stats, User } from "@/types";
import AddStatsButton from "../stats/addStats";
import StatsForm from "../stats/statsForm";
import StatsService from "@/services/StatsService";

type Props = {
  users: Array<User>;
};

const UserOverviewTable: React.FC<Props> = ({ users }: Props) => {
  const [visibleFormEmail, setVisibleFormEmail] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [userStats, setUserStats] = useState<Record<number, Stats[]> | null>(
    null
  );

  useEffect(() => {
    users.forEach((user) => {
      if (user.id !== undefined) {
        fetchUserStats(user.id);
      }
    });
  }, [users]);

  const fetchUserStats = async (userId: number) => {
    try {
      const response = await StatsService.getStatsByUserId(userId);
      const stats = await response.json();
      setUserStats((prev) => ({
        ...prev,
        [userId]: stats.length > 0 ? stats : null,
      }));
    } catch (error) {
      setErrorMessage("Failed to load user stats.");
    }
  };

  const handleAddStats = (email: string) => {
    setVisibleFormEmail(email);
    setErrorMessage(null);
    setSuccessMessage(null);
  };

  const handleConfirm = async (
    email: string,
    statsData: { weight: number; length: number; pr: number }
  ) => {
    const user = users.find((user) => user.email === email);

    if (user && user.id !== undefined) {
      try {
        await StatsService.addStats({ ...statsData, userId: user.id });
        setSuccessMessage("Stats added successfully!");
        setErrorMessage(null);
        fetchUserStats(user.id);

        setTimeout(() => setSuccessMessage(null), 3000);
      } catch (error) {
        setErrorMessage("Failed to add stats. Please try again.");
        setSuccessMessage(null);
      }
    }
  };

  const calculateBMI = (weight: number, length: number) => {
    const heightM = length / 100;
    const bmi = weight / (heightM * heightM);
    return bmi.toFixed(2);
  };

  const handleExit = () => {
    setVisibleFormEmail(null);
    setErrorMessage(null);
    setSuccessMessage(null);
  };

  return (
    <>
      {users && (
        <table className="table table-hover">
          <tbody>
            {users.map((user, index) => (
              <React.Fragment key={index}>
                <tr>
                  <td>{user.email}</td>
                  <td>
                    <AddStatsButton
                      onClick={() => handleAddStats(user.email)}
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    <div className="stats-overview mt-4">
                      <h4>Overview of your stats</h4>
                      {user.id !== undefined &&
                      userStats &&
                      userStats[user.id] ? (
                        <table className="table mt-3">
                          <thead>
                            <tr>
                              <th>Date</th>
                              <th>Weight</th>
                              <th>Length</th>
                              <th>PR</th>
                              <th>BMI</th>
                            </tr>
                          </thead>
                          <tbody>
                            {userStats[user.id].map((stat, index) => (
                              <tr key={index}>
                                <td>
                                  {new Date(stat.date).toLocaleDateString()}
                                </td>
                                <td>{stat.weight}</td>
                                <td>{stat.length}</td>
                                <td>{stat.pr}</td>
                                <td>
                                  {calculateBMI(stat.weight, stat.length)}
                                </td>
                                <td></td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      ) : (
                        <p className="text-muted">
                          No stats to show for you, add some stats to show them
                          here.
                        </p>
                      )}
                    </div>
                  </td>
                </tr>
                {visibleFormEmail === user.email && (
                  <tr>
                    <td colSpan={2}>
                      <StatsForm
                        onConfirm={(data) => handleConfirm(user.email, data)}
                        onCancel={handleExit}
                        successMessage={successMessage}
                      />
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default UserOverviewTable;
