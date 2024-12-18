import WorkoutService from "@/services/WorkoutService";
import React from "react";

interface DeleteButtonProps {
  workoutId: number;
  onDelete: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ workoutId, onDelete }) => {
  const handleDelete = async () => {
    onDelete();
  };

  return (
    <button className="btn btn-primary" onClick={handleDelete}>
      Delete
    </button>
  );
};

export default DeleteButton;
