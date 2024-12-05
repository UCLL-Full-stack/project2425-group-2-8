import { useTranslation } from "next-i18next";

type AddStatsButtonProps = {
    onClick: () => void;
};
// const { t } = useTranslation();

const AddStatsButton: React.FC<AddStatsButtonProps> = ({ onClick }) => (
    <button className="btn btn-primary" onClick={onClick}>
        {/* {t("stats.addstats") */}
        Add stats
    </button>
);

export default AddStatsButton;