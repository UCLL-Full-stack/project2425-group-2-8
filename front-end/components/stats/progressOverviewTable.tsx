import React from "react";
import { Stats, Workout } from "@/types";
import { useTranslation } from "next-i18next";

type Props = {
    stats: Stats[];
    completedWorkouts: Workout[]; 
  };
  
  const ProgressOverviewTable: React.FC<Props> = ({ stats, completedWorkouts }) => {
    const { t } = useTranslation();
  
    const calculateBMI = (weight: number, length: number) => {
      const heightM = length / 100;
      const bmi = weight / (heightM * heightM);
      return bmi.toFixed(2);
    };
  
    const getMonthName = (date: Date) => {
      const months = [
        t("stats.months.january"), t("stats.months.february"), t("stats.months.march"),
        t("stats.months.april"), t("stats.months.may"), t("stats.months.june"),
        t("stats.months.july"), t("stats.months.august"), t("stats.months.september"),
        t("stats.months.october"), t("stats.months.november"), t("stats.months.december"),
      ];
      return months[date.getMonth()];
    };

    const getCompletedWorkoutsCount = () => {
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
      
        return completedWorkouts.filter(
          (workout) => new Date(workout.date) >= oneMonthAgo
        ).length;
      };
  
    const getProgressOverview = () => {
      if (stats.length < 2) return null;
  
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  
      const statsLastMonth = stats.filter((stat) => new Date(stat.date) >= oneMonthAgo);
  
      if (statsLastMonth.length < 2) return null;
  
      const startMonth = new Date(statsLastMonth[0].date);
      const endMonth = new Date(statsLastMonth[statsLastMonth.length - 1].date);
  
      const weightChange = statsLastMonth[statsLastMonth.length - 1].weight - statsLastMonth[0].weight;
      const bmiChange =
        parseFloat(
          calculateBMI(
            statsLastMonth[statsLastMonth.length - 1].weight,
            statsLastMonth[statsLastMonth.length - 1].length
          )
        ) -
        parseFloat(calculateBMI(statsLastMonth[0].weight, statsLastMonth[0].length));
      const prChange = statsLastMonth[statsLastMonth.length - 1].pr - statsLastMonth[0].pr;

      const completedWorkoutsCount = getCompletedWorkoutsCount();
  
      return (
        <div className="progress-overview mt-4">
          <h4>{t("stats.progressOverview")}</h4>
          <p>
            {t("stats.changePeriod")}: {getMonthName(startMonth)} - {getMonthName(endMonth)}
          </p>
          <table className="table mt-3">
            <thead>
              <tr>
                <th>{t("stats.placeholder.metric")}</th>
                <th>{t("stats.placeholder.change")}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{t("stats.workoutscompleted")}</td>
                <td>{completedWorkoutsCount}</td> 
              </tr>
              <tr>
                <td>{t("stats.placeholder.weight")}</td>
                <td>{weightChange >= 0 ? `+${weightChange}` : weightChange}</td>
              </tr>
              <tr>
                <td>{t("stats.placeholder.bmi")}</td>
                <td>{bmiChange >= 0 ? `+${bmiChange.toFixed(2)}` : bmiChange.toFixed(2)}</td>
              </tr>
              <tr>
                <td>{t("stats.placeholder.pr")}</td>
                <td>{prChange >= 0 ? `+${prChange}` : prChange}</td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    };
  
    return <>{getProgressOverview()}</>;
};
  
export default ProgressOverviewTable;
  