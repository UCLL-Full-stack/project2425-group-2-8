import WorkoutService from "@/services/WorkoutService";
import React from "react";

interface DeleteButtonProps {
  workoutId: number;
  onDelete: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ workoutId, onDelete }) => {
  const handleDelete = async () => {
    console.log(`Deleting workout with ID: ${workoutId}`);
    onDelete();
  };

  return (
    <button className="btn btn-primary" onClick={handleDelete}>
      Delete
    </button>
  );
};

export default DeleteButton;
