import React, { useEffect, useState } from "react";
import { Stats, User, Workout } from "@/types";
import AddStatsButton from "../stats/addStats";
import StatsForm from "../stats/statsForm";
import StatsService from "@/services/StatsService";
import WorkoutService from "@/services/WorkoutService";
import { useTranslation } from "next-i18next";
import ProgressOverviewTable from "@/components/stats/progressOverviewTable";

type Props = {
  users: Array<User>;
};

const UserOverviewTable: React.FC<Props> = ({ users }: Props) => {
  const [visibleFormEmail, setVisibleFormEmail] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [userStats, setUserStats] = useState<Stats[] | null>(null);
  const [userWorkouts, setUserWorkouts] = useState<Workout[]>([]);
  const [loggedInUser, setLoggedInUser] = useState<{
    token: string;
    email: string;
    fullname: string;
  } | null>(null);

  const { t } = useTranslation();

  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    if (user) {
      setLoggedInUser(JSON.parse(user));
    }
  }, []);

  useEffect(() => {
    if (loggedInUser?.email) {
      fetchUserStatsByEmail(loggedInUser.email);
      fetchUserWorkoutsByEmail(loggedInUser.email);
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
        setErrorMessage((t("users.loaderror")));
      }
    }
  };

  const fetchUserWorkoutsByEmail = async (email: string) => {
    const user = users.find((user) => user.email === email);
    if (user && user.id !== undefined) {
      try {
        const response = await WorkoutService.getWorkoutsByUserId(user.id);
        const workouts = await response.json();
        setUserWorkouts(workouts.length > 0 ? workouts : []);
      } catch (error) {
        console.error("users.loaderror");
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
        setSuccessMessage((t("users.statssucces")));
        setErrorMessage(null);
        if (loggedInUser?.email) fetchUserStatsByEmail(loggedInUser.email);

        setTimeout(() => setSuccessMessage(null), 3000);
      } catch (error) {
        setErrorMessage((t("users.statserror")));
        setSuccessMessage(null);
      }
    }
  };

  const calculateBMI = (weight: number, length: number) => {
    const heightM = length / 100;
    const bmi = weight / (heightM * heightM);
    return bmi.toFixed(2);
  };

  const getBMI = (bmi: number) => {
    if (bmi >= 30) {
      return (t("stats.obese"));
    } else if (bmi >= 25) {
      return (t("stats.overweight"));
    } else if (bmi >= 18.5) {
      return (t("stats.healthy"));
    } else {
      return (t("stats.underweight"));
    }
  };

  const calculateAverageBMI = (stats: Stats[]) => {
    const totalBMI = stats.reduce((acc, stat) => {
      return acc + parseFloat(calculateBMI(stat.weight, stat.length));
    }, 0);
    return (totalBMI / stats.length).toFixed(2);
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
          <h3>{t("stats.overview")} {loggedInUser?.fullname}</h3>
          <div className="stats-overview mt-4">
            {userStats && userStats.length > 0 ? (
              <table className="table mt-3">
                <thead>
                  <tr>
                    <th>{t("stats.placeholder.date")}</th>
                    <th>{t("stats.placeholder.weight")}</th>
                    <th>{t("stats.placeholder.length")}</th>
                    <th>PR</th>
                    <th>BMI</th>
                  </tr>
                </thead>
                <tbody>
                  {userStats.map((stat, index) => {
                    const bmi = calculateBMI(stat.weight, stat.length);
                    return (
                      <tr key={index}>
                        <td>{new Date(stat.date).toLocaleDateString()}</td>
                        <td>{stat.weight}</td>
                        <td>{stat.length}</td>
                        <td>{stat.pr}</td>
                        <td>
                          {bmi} ({getBMI(parseFloat(bmi))})
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <p className="text-muted">
                {t("stats.error")}
              </p>
            )}

            {userStats && userStats.length > 0 && (
              <p className="text-end">
                {t("stats.bmi")} {calculateAverageBMI(userStats)} (
                {getBMI(parseFloat(calculateAverageBMI(userStats)))}
                )
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
          {userStats && userStats.length > 0 && <ProgressOverviewTable stats={userStats} completedWorkouts={userWorkouts}></ProgressOverviewTable>}
        </div>
      )}
    </>
  );
};

export default UserOverviewTable;
