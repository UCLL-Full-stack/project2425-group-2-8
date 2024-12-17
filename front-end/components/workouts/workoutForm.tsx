import { useState } from "react";
import { useTranslation } from "next-i18next";

type WorkoutFormPropsm = {
    onConfirm: (data: {subject: string; date: string; userIds: Array<number>}) => void;
    onCancel: () => void;
    successMessage: string | null;
}

const WorkoutForm: React.FC<WorkoutFormPropsm> = ({
    onConfirm, 
    onCancel, 
    successMessage,
}) => {
    const [formData, setFormData] = useState({
        subject: "",
        date: "",
        userIds: [],
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
          [name]:
            name === "userIds"
              ? value.split(",").map((id) => Number(id.trim())) 
              : name === "date"
              ? value 
              : value,
        }));
      };

      const validateForm = () => {
        const { subject, date, userIds } = formData;
        if (!subject || !date || !userIds) {
          return t("workout.messages.allrequired");
        }

        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0); 

        if (selectedDate < today) {
          return (`You can't schedule workouts in the past`); 
        }

        
        return null;
      };

      const handleSubmit = () => {
        const error = validateForm();
        if (error) {
            setValidationError(error);
        } else {
            const isoDate = `${formData.date}T00:00:00.000Z`; 
            onConfirm({
                subject: formData.subject,
                date: isoDate,
                userIds: formData.userIds
            });

            setTimeout(() => {
              onCancel(); 
            }, 3000);
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
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Subject"
            className="form-control mb-2"
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            placeholder="Date"
            className="form-control mb-2"
          />
          <input
            type="text"
            name="userIds"
            value={formData.userIds}
            onChange={handleChange}
            placeholder="UserIds"
            className="form-control mb-2"
          />
          <button className="btn btn-secondary me-2" onClick={onCancel}>
            {t("workout.exit")}
          </button>
          <button className="btn btn-primary" onClick={handleSubmit}>
            {t("workout.confirm")}
          </button>
        </div>
      );
};

export default WorkoutForm;