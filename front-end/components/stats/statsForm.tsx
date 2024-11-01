import { useState } from "react";
import { Stats } from "@/types";

type StatsFormProps = {
    onSubmit: (stats: Omit<Stats, 'id' | 'date'>) => void;
    onClose: () => void;
    userId: number;
};

const StatsForm: React.FC<StatsFormProps> = ({ onSubmit, onClose, userId }) => {
    const [weight, setWeight] = useState<number>(0);
    const [length, setLength] = useState<number>(0);
    const [pr, setPr] = useState<number>(0);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ weight, length, pr, userId });
    };

    return (
        <form onSubmit={handleSubmit} className="stats-form">
            <div>
                <label>Weight:</label>
                <input type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value))} required />
            </div>
            <div>
                <label>Length:</label>
                <input type="number" value={length} onChange={(e) => setLength(Number(e.target.value))} required />
            </div>
            <div>
                <label>Personal Record (PR):</label>
                <input type="number" value={pr} onChange={(e) => setPr(Number(e.target.value))} required />
            </div>
            <div className="form-buttons">
                <button type="button" onClick={onClose} className="btn btn-secondary">
                    Exit
                </button>
                <button type="submit" className="btn btn-success">
                    Confirm
                </button>
            </div>
        </form>
    );
};

export default StatsForm;