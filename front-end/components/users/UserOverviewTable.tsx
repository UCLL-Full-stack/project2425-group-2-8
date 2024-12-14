import React, { useEffect, useState } from "react";
import { Stats, User } from "@/types";
import AddStatsButton from "../stats/addStats";
import StatsForm from "../stats/statsForm";
import StatsService from "@/services/StatsService";
import { jwtDecode } from "jwt-decode";
import { useTranslation } from "next-i18next";

type Props = {
  users: Array<User>;
};

const UserOverviewTable: React.FC<Props> = ({ users }: Props) => {
  const [visibleFormEmail, setVisibleFormEmail] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [userStats, setUserStats] = useState<Stats[] | null>(null);
  const [loggedInUser, setLoggedInUser] = useState<{
    token: string;
    email: string;
    fullname: string;
  } | null>(null);

  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    if (user) {
      setLoggedInUser(JSON.parse(user));
    }
  }, []);

  useEffect(() => {
    if (loggedInUser?.email) {
      fetchUserStatsByEmail(loggedInUser.email);
    }
  }, [loggedInUser]);

  const fetchUserStatsByEmail = async (email: string) => {
    const user = users.find((user) => user.email === email);
    if (user && user.id !== undefined) {
      try {
        const response = await StatsService.getStatsByUserId(user.id);
        const stats = await response.json();
        setUserStats(stats.length > 0 ? stats : []);
      } catch (error) {
        setErrorMessage("Failed to load user stats.");
      }
    }
  };

  const handleAddStats = () => {
    if (loggedInUser?.email) {
      setVisibleFormEmail(loggedInUser.email);
      setErrorMessage(null);
      setSuccessMessage(null);
    }
  };

  const handleConfirm = async (statsData: {
    weight: number;
    length: number;
    pr: number;
  }) => {
    const user = users.find((user) => user.email === loggedInUser?.email);

    if (user && user.id !== undefined) {
      try {
        await StatsService.addStats({ ...statsData, userId: user.id });
        setSuccessMessage("Stats added successfully!");
        setErrorMessage(null);
        if (loggedInUser?.email) fetchUserStatsByEmail(loggedInUser.email);

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
      {loggedInUser && (
        <div className="user-overview">
          <h3>Overzicht van statistieken voor {loggedInUser?.fullname}</h3>
          <div className="stats-overview mt-4">
            <h4>Overview of your stats</h4>
            {userStats && userStats.length > 0 ? (
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
                  {userStats.map((stat, index) => (
                    <tr key={index}>
                      <td>{new Date(stat.date).toLocaleDateString()}</td>
                      <td>{stat.weight}</td>
                      <td>{stat.length}</td>
                      <td>{stat.pr}</td>
                      <td>{calculateBMI(stat.weight, stat.length)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-muted">
                No stats to show for you, add some stats to show them here.
              </p>
            )}
          </div>
          <AddStatsButton onClick={handleAddStats} />
          {visibleFormEmail === loggedInUser.email && (
            <StatsForm
              onConfirm={(data) => handleConfirm(data)}
              onCancel={handleExit}
              successMessage={successMessage}
            />
          )}
        </div>
      )}
    </>
  );
};

export default UserOverviewTable;
