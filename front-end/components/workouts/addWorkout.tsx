import { useTranslation } from "next-i18next";

type AddWorkoutsButtonProps = {
    onClick: () => void;
};

const AddWorkoutsButton: React.FC<AddWorkoutsButtonProps> = ({ onClick }) => {
    const { t } = useTranslation(); 

    return (
        <button className="btn btn-primary" onClick={onClick}>
            {t("workouts.addWorkouts")}
        </button>
    );
};

export default AddWorkoutsButton;