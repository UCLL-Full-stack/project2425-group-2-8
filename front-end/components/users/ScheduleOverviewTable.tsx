import { User, Workout } from "@/types";
import { useEffect, useState } from "react";
import WorkoutService from "@/services/WorkoutService";
import WorkoutForm from "../workouts/workoutForm";
import AddWorkoutsButton from "../workouts/addWorkout";
import { useTranslation } from "next-i18next";
import DeleteButton from "../workouts/deleteButton";

type Props = {
  users: Array<User>;
};

const ScheduleOverviewtable: React.FC<Props> = ({ users }: Props) => {
  const [visibleFormEmail, setVisibleFormEmail] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [userWorkouts, setUserWorkouts] = useState<Workout[] | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loggedInUser, setLoggedInUser] = useState<{
    token: string;
    email: string;
    fullname: string;
  } | null>(null);

  const [editWorkoutId, setEditWorkoutId] = useState<number | null>(null);
  const [newDate, setNewDate] = useState<string>(""); 

  const { t } = useTranslation();

  useEffect(() => {
    const user = sessionStorage.getItem("loggedInUser");
    if (user) {
      setLoggedInUser(JSON.parse(user));
    }
  }, []);

  useEffect(() => {
    if (loggedInUser?.email) {
      fetchUserWorkoutsByEmail(loggedInUser.email);
    }
  }, [loggedInUser]);

  const fetchUserWorkoutsByEmail = async (email: string) => {
    const user = users.find((user) => user.email === email);
    if (user && user.id !== undefined) {
      try {
        const response = await WorkoutService.getWorkoutsByUserId(user.id);
        const workouts = await response.json();
        setUserWorkouts(workouts.length > 0 ? workouts : []);
      } catch (error) {
        setErrorMessage(t("workouts.noFound"));
      }
    }
  };

  const handleAddWorkout = () => {
    if (loggedInUser?.email) {
      setVisibleFormEmail(loggedInUser.email);
      setErrorMessage(null);
      setSuccessMessage(null);
    }
  };

  const handleConfirm = async (workoutData: {
    subject: string;
    date: string;
    userIds: Array<number>;
  }) => {
    try {
      await WorkoutService.addWorkout({ ...workoutData });
      setSuccessMessage(t("workouts.addedSuccess"));
      setErrorMessage(null);
      if (loggedInUser?.email) fetchUserWorkoutsByEmail(loggedInUser.email);
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error) {
      setErrorMessage(t("workouts.addedFailed"));
      setSuccessMessage(null);
    }
  };

  const handleDeleteWorkout = async (workoutId: number | undefined) => {
    if (workoutId === undefined) return;
    try {
      await WorkoutService.deleteWorkoutById(workoutId);
      setUserWorkouts((prevWorkouts) =>
        prevWorkouts
          ? prevWorkouts.filter((workout) => workout.id !== workoutId)
          : []
      );
      setSuccessMessage(t("workouts.deletedSuccess"));
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error) {
      setErrorMessage(t("workouts.deletedFailed"));
      setTimeout(() => setErrorMessage(null), 3000);
    }
  };

  const handleRescheduleWorkout = async (workoutId: number, newDate: string) => {
    try {
      newDate = `${newDate}T00:00:00.000Z`
      await WorkoutService.rescheduleWorkout(workoutId, newDate);
      setSuccessMessage(t("workouts.rescheduledSuccess"));
      setErrorMessage(null);
      if (loggedInUser?.email) fetchUserWorkoutsByEmail(loggedInUser.email);
      setEditWorkoutId(null);
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error) {
      setErrorMessage(t("workouts.rescheduledFailed"));
    }
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
          <h3>
            {t("workouts.overview")} {loggedInUser?.fullname}
          </h3>
          {successMessage && (
            <div className="alert alert-success">{successMessage}</div>
          )}
          {errorMessage && (
            <div className="alert alert-danger">{errorMessage}</div>
          )}
          <div className="stats-overview mt-4">
            {userWorkouts && userWorkouts.length > 0 ? (
              <table className="table mt-3">
                <thead>
                  <tr>
                    <th>{t("workouts.subject")}</th>
                    <th>{t("workouts.date")}</th>
                    <th>{t("workouts.users")}</th>
                    <th>{t("workouts.changeDate")}</th>
                    <th>{t("workouts.delete")}</th>
                  </tr>
                </thead>
                <tbody>
                  {userWorkouts.map((workout) => (
                    <tr key={workout.id}>
                      <td>{workout.subject}</td>
                      <td>{new Date(workout.date).toLocaleDateString()}</td>
                      <td>
                        {workout.users
                          .map(
                            (user) =>
                              `${user.profile?.firstName || ""} ${
                                user.profile?.name || ""
                              }`.trim()
                          )
                          .join(", ")}
                      </td>
                      <td>
                        {editWorkoutId === workout.id ? (
                          <div>
                            <input
                              type="date"
                              value={newDate}
                              onChange={(e) => setNewDate(e.target.value)}
                            />
                            <button
                              className="btn btn-primary btn-sm"
                              onClick={() =>
                                handleRescheduleWorkout(workout.id!, newDate)
                              }
                            >
                              {t("workouts.confirm")}
                            </button>
                          </div>
                        ) : (
                          <button
                            className="btn btn-primary btn-sm"
                            onClick={() => {
                              setEditWorkoutId(workout.id!);
                              setNewDate(workout.date.split("T")[0]);
                            }}
                          >
                            {t("workouts.changeDate")}
                          </button>
                        )}
                      </td>
                      <td>
                        <DeleteButton
                          workoutId={workout.id!}
                          onDelete={() => handleDeleteWorkout(workout.id)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-muted">{t("workouts.noToShow")}</p>
            )}
          </div>
          <AddWorkoutsButton onClick={handleAddWorkout} />
          {visibleFormEmail === loggedInUser.email && (
            <WorkoutForm
              onConfirm={(data) => handleConfirm(data)}
              onCancel={handleExit}
              successMessage={successMessage || ""}
            />
          )}
        </div>
      )}
    </>
  );
};

export default ScheduleOverviewtable;
