

type AddStatsButtonProps = {
    onClick: () => void;
};

const AddStatsButton: React.FC<AddStatsButtonProps> = ({ onClick }) => (
    <button className="btn btn-primary" onClick={onClick}>
        Add Stats
    </button>
);

export default AddStatsButton;