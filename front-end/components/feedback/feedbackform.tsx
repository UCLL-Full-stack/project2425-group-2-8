import React, { useState } from "react";
import { useTranslation } from "next-i18next";

type FeedbackFormProps = {
  onSubmit: (data: { name: string; email: string; message: string }) => void;
  successMessage: string | null;
};

const FeedbackForm: React.FC<FeedbackFormProps> = ({ onSubmit, successMessage }) => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [validationError, setValidationError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValidationError(null);
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const { name, email, message } = formData;
    if (!name || !email || !message) {
      return t("feedback.required");
    }
    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const error = validateForm();
    if (error) {
      setValidationError(error);
    } else {
      onSubmit(formData);
      setFormData({ name: "", email: "", message: "" }); 
    }
  };

  return (
    <div className="feedback-form">
      {validationError && <p style={{ color: "red", fontWeight: "bold" }}>{validationError}</p>}
      {successMessage && <p style={{ color: "green", fontWeight: "bold" }}>{successMessage}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            {t("feedback.name")}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-control"
            placeholder={t("feedback.placeholder.name")}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            {t("feedback.email")}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-control"
            placeholder={t("feedback.placeholder.email")}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="message" className="form-label">
            {t("feedback.feedbackmess")}
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="form-control"
            rows={4}
            placeholder={t("feedback.placeholder.mess")}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {t("feedback.button")}
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;
