import { User, Workout } from "@/types";
import { useEffect, useState } from "react";
import WorkoutService from "@/services/WorkoutService";
import WorkoutForm from "../workouts/workoutForm";
import AddWorkoutsButton from "../workouts/addWorkout";
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

  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
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
        console.log(workouts);
        setUserWorkouts(workouts.length > 0 ? workouts : []);
      } catch (error) {
        setErrorMessage("Failed to load user workouts.");
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
      setSuccessMessage("Workout added successfully!");
      setErrorMessage(null);
      if (loggedInUser?.email) fetchUserWorkoutsByEmail(loggedInUser.email);
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error) {
      setErrorMessage("Failed to add stats. Please try again.");
      setSuccessMessage(null);
    }
  };

  const handleDeleteWorkout = async (workoutId: number | undefined) => {
    console.log("e");
    if (workoutId === undefined) return;
    try {
      await WorkoutService.deleteWorkoutById(workoutId);
      setUserWorkouts((prevWorkouts) =>
        prevWorkouts
          ? prevWorkouts.filter((workout) => workout.id !== workoutId)
          : []
      );
      setSuccessMessage("Workout deleted successfully!");
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error) {
      setErrorMessage("Failed to delete the workout. Please try again.");
      setTimeout(() => setErrorMessage(null), 3000);
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
          <h3>Overzicht van workouts voor {loggedInUser?.fullname}</h3>
          {successMessage && (
            <div className="alert alert-success">{successMessage}</div>
          )}
          {errorMessage && (
            <div className="alert alert-danger">{errorMessage}</div>
          )}
          <div className="stats-overview mt-4">
            <h4>Workouts</h4>
            {userWorkouts && userWorkouts.length > 0 ? (
              <table className="table mt-3">
                <thead>
                  <tr>
                    <th>Subject</th>
                    <th>Date</th>
                    <th>Users</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {userWorkouts.map((workout, index) => (
                    <tr key={index}>
                      <td>{workout.subject}</td>
                      <td>{new Date(workout.date).toLocaleDateString()}</td>
                      <td>
                        {workout.users
                          .map((user) =>
                            `${user.profile?.firstName || ""} ${
                              user.profile?.name || ""
                            }`.trim()
                          )
                          .join(", ")}{" "}
                      </td>
                      <td>
                        {workout.id !== undefined && (
                          <DeleteButton
                            workoutId={workout.id}
                            onDelete={() => handleDeleteWorkout(workout.id!)}
                          />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-muted">
                No workouts to show for you, add some stats to show them here.
              </p>
            )}
          </div>
          <AddWorkoutsButton onClick={handleAddWorkout} />
          {visibleFormEmail === loggedInUser.email && (
            <WorkoutForm
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
export default ScheduleOverviewtable;
