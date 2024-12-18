import { useTranslation } from "next-i18next";

type AddWorkoutsButtonProps = {
    onClick: () => void;
};
// const { t } = useTranslation();

const AddWorkoutsButton: React.FC<AddWorkoutsButtonProps> = ({ onClick }) => (
    <button className="btn btn-primary" onClick={onClick}>
        {/* {t("stats.addstats")} */}
        Add workout
    </button>
);

export default AddWorkoutsButton;