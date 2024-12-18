import { useTranslation } from "next-i18next";

type AddStatsButtonProps = {
    onClick: () => void;
};

const AddStatsButton: React.FC<AddStatsButtonProps> = ({ onClick }) => {
    const { t } = useTranslation(); 

    return (
        <button className="btn btn-primary" onClick={onClick}>
            {t("stats.addstats")}
        </button>
    );
};

export default AddStatsButton;