import { parse } from "path";
import React, { useState } from "react";
import { useTranslation } from "next-i18next";

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
  const [localSuccessMessage, setLocalSuccessMessage] = useState(successMessage);

  const { t } = useTranslation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValidationError(null);
    setLocalSuccessMessage(null);
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const { weight, length, pr } = formData;
    if (!weight || !length || !pr) {
      return t("stats.messages.allrequired");
    } else if (
      parseFloat(weight) <= 0 ||
      parseFloat(length) <= 0 ||
      parseFloat(pr) <= 0
    ) {
      return t("stats.messages.allpositive");
    }
    return null;
  };

  const handleSubmit = () => {
    const error = validateForm();
    if (error) {
      setValidationError(error);
    } else {
      onConfirm({
        weight: parseFloat(formData.weight),
        length: parseFloat(formData.length),
        pr: parseFloat(formData.pr),
      });
    }
  };

  return (
    <div className="stats-form">
      {validationError ? (
        <p style={{ color: "red", fontWeight: "bold" }}>{validationError}</p>
      ) : successMessage ? (
        <p style={{ color: "green", fontWeight: "bold" }}>{successMessage}</p>
      ) : null}
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
        {t("stats.exit")}
      </button>
      <button className="btn btn-primary" onClick={handleSubmit}>
        {t("stats.confirm")}
      </button>
    </div>
  );
};

export default StatsForm;
