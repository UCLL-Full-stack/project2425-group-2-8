import React, { useState } from "react";

type StatsFormProps = {
  onConfirm: (data: { weight: number; length: number; pr: number }) => void;
  onCancel: () => void;
  successMessage: string | null;
};

const StatsForm: React.FC<StatsFormProps> = ({
  onConfirm,
  onCancel,
  successMessage,
}) => {
  const [formData, setFormData] = useState({
    weight: "",
    length: "",
    pr: "",
  });
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const { weight, length, pr } = formData;
    if (!weight || !length || !pr) {
      return "Please enter a value in all fields";
    }
    return null;
  };

  const handleSubmit = () => {
    const error = validateForm();
    if (error) {
      setValidationError(error);
    } else {
      setValidationError(null);
      onConfirm({
        weight: parseFloat(formData.weight),
        length: parseFloat(formData.length),
        pr: parseFloat(formData.pr),
      });
    }
  };

  return (
    <div className="stats-form">
      {successMessage && (
        <p style={{ color: "green", fontWeight: "bold" }}>{successMessage}</p>
      )}
      {validationError && (
        <p style={{ color: "red", fontWeight: "bold" }}>{validationError}</p>
      )}
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
