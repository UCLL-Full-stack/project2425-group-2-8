import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { User } from "@/types";
import UserService from "@/services/UserService";
import DeleteButton from "./deleteButton";

type WorkoutFormPropsm = {
  onConfirm: (data: {
    subject: string;
    date: string;
    userIds: Array<number>;
  }) => void;
  onCancel: () => void;
  successMessage: string | null;
};

const WorkoutForm: React.FC<WorkoutFormPropsm> = ({
  onConfirm,
  onCancel,
  successMessage,
}) => {
  const [formData, setFormData] = useState<{
    subject: string;
    date: string;
    userIds: number[];
    userEmail: string;
    selectedEmail: string;
  }>({
    subject: "",
    date: "",
    userIds: [],
    userEmail: "",
    selectedEmail: "",
  });
  const [validationError, setValidationError] = useState<string | null>(null);
  const [localSuccessMessage, setLocalSuccessMessage] = useState(successMessage);
  const [users, setAllUsers] = useState<User[] | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [userSuggestions, setUserSuggestions] = useState<User[] | null>(null);
  const [loggedInUser, setLoggedInUser] = useState<{
    token: string;
    email: string;
    fullname: string;
    id: number;
  } | null>(null);

  const { t } = useTranslation();

  useEffect(() => {
    const user = sessionStorage.getItem("loggedInUser");
    if (user) {
      const parsedUser = JSON.parse(user);
      const fetchUser = async () => {
        try {
          const response = await UserService.getUserByEmail(parsedUser.email);
          const userData = await response.json();
          setLoggedInUser(userData); 
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      };

      fetchUser();
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (loggedInUser) {
      setFormData((prevData) => ({
        ...prevData,
        userIds: [...prevData.userIds, loggedInUser.id],
      }));
    }
  }, [loggedInUser]);

  const fetchUsers = async () => {
    try {
      const response = await UserService.getAllUsers();
      const users = await response.json();
      setAllUsers(users.length > 0 ? users : []);
    } catch (error) {
      setErrorMessage(t("workouts.noUsersFound"));
    }
  };

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

  const searchUsersContaining = async (e: { target: { value: any; }; }) => {
    const searchItem = e.target.value;

    if (searchItem.length > 2 && users) {
      const filteredUsers = users.filter(user =>
        user.email.toLowerCase().includes(searchItem.toLowerCase())
      );
      setUserSuggestions(filteredUsers);
    } else {
      setUserSuggestions([]);
    }

    setFormData({ ...formData, userEmail: searchItem });
  };

  const handleEmailSelect = (user: User) => {
    if (user.id)
      setFormData({
        ...formData,
        selectedEmail: user.email,
        userEmail: '',
        userIds: [...formData.userIds, user.id],
      });
    setUserSuggestions([]); 
  };

  const handleDelete = (userId: number) => {
    setFormData({
      ...formData,
      userIds: formData.userIds.filter(id => id !== userId), 
    });
  };

  const validateForm = () => {
    const { subject, date, userIds } = formData;
    if (!subject || !date || !userIds.length) {
      return t("workouts.allRequired");
    }

    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      return t("workouts.notPast");
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
        userIds: formData.userIds,
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
      ) : localSuccessMessage ? (
        <p style={{ color: "green", fontWeight: "bold" }}>{localSuccessMessage}</p>
      ) : null}

      <input
        type="text"
        name="subject"
        value={formData.subject}
        onChange={handleChange}
        placeholder={t("schedule.subject")}
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
      <div>
        <input
          type="text"
          name="userEmail"
          value={formData.userEmail}
          onChange={searchUsersContaining}
          placeholder={t("schedule.email")}
          className="form-control mb-2"
        />

        {userSuggestions && userSuggestions.length > 0 && (
          
          <ul>
            <p className="email-suggestion-info">{t("schedule.userinfo")}</p>
            {userSuggestions.map((user, index) => (
              <li key={index} onClick={() => handleEmailSelect(user)} className="email-suggestion">
                {user.email}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <p>{t("workouts.selectedUsers")}</p>
        <ul>
          {formData.userIds.map((userId, index) => (
            <li key={index}>
              {users?.find(user => user.id === userId)?.email}
              <button className="btn btn-primary" onClick={() => handleDelete(userId)}>{t("schedule.delete")}</button>
            </li>
          ))}
        </ul>
      </div>

      <input
        type="text"
        name="userIds"
        value={formData.userIds.join(", ")} 
        onChange={handleChange}
        placeholder="UserIds"
        className="form-control mb-2"
      />

      <button className="btn btn-secondary me-2" onClick={onCancel}>
        {t("workouts.exit")}
      </button>
      <button className="btn btn-primary" onClick={handleSubmit}>
        {t("workouts.confirm")}
      </button>
    </div>
  );
};

export default WorkoutForm;
