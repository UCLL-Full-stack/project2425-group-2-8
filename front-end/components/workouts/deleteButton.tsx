import WorkoutService from "@/services/WorkoutService";
import React from "react";
import { useTranslation } from "next-i18next";

interface DeleteButtonProps {
  workoutId: number;
  onDelete: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ workoutId, onDelete }) => {
  const handleDelete = async () => {
    onDelete();
  };
  const { t } = useTranslation(); 

  return (
    <button className="btn btn-primary" onClick={handleDelete}>
      {t("schedule.deleteworkout")}
    </button>
  );
};

export default DeleteButton;
