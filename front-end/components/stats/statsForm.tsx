import React, { useState } from "react";

type StatsFormProps = {
    onConfirm: (data: { weight: number; length: number; pr: number }) => void;
    onCancel: () => void;
    errorMessage: string | null;
    successMessage: string | null;
};

const StatsForm: React.FC<StatsFormProps> = ({ onConfirm, onCancel, errorMessage, successMessage }) => {
    const [formData, setFormData] = useState({
        weight: "",
        length: "",
        pr: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        onConfirm({
            weight: parseFloat(formData.weight),
            length: parseFloat(formData.length),
            pr: parseFloat(formData.pr),
        });
    };

    return (
        <div className="stats-form">
            {successMessage && <p style={{ color: "green", fontWeight: "bold" }}>{successMessage}</p>}
            {errorMessage && <p style={{ color: "red", fontWeight: "bold" }}>{errorMessage}</p>}
            <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                placeholder="Weight"
                className="form-control mb-2"
            />
            <input
                type="number"
                name="length"
                value={formData.length}
                onChange={handleChange}
                placeholder="Length"
                className="form-control mb-2"
            />
            <input
                type="number"
                name="pr"
                value={formData.pr}
                onChange={handleChange}
                placeholder="PR"
                className="form-control mb-2"
            />
            <button className="btn btn-secondary me-2" onClick={onCancel}>
                Exit
            </button>
            <button className="btn btn-primary" onClick={handleSubmit}>
                Confirm
            </button>
        </div>
    );
};

export default StatsForm;