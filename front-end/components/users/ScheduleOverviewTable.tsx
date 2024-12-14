import { User } from "@/types";
import { useEffect, useState } from "react";

type Props = {
  users: Array<User>;
};

const ScheduleOverviewtable: React.FC<Props> = ({ users }: Props) => {
    const [userWorkouts, setUserWorkouts] = useState<Workouts[] | null>(null);
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
        const response = await WorkoutService.getWorkoutsByUserIc(user.id);
        const workouts = await response.json();
        setUserWorkouts(workouts.length > 0 ? workouts : []);
      } catch (error) {
        setErrorMessage("Failed to load user stats.");
      }
    }
  };

  return (
    <>
      <h3>Workouts voor </h3>
    </>
  );
};
export default ScheduleOverviewtable;
