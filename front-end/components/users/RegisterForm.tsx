import React, { useState } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import UserService from "@/services/UserService";

const RegisterForm: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatusMessage(null);
    setError(null);

    const user = { email, password };

    try {
      const response = await UserService.registerUser(user);

      if (response.ok) {
        setStatusMessage(t("register.successMessage"));
        setTimeout(() => {
          router.push("/login");
        }, 2000); 
      } else {
        const errorData = await response.json();
        setError(errorData.message || t("register.errorMessage"));
      }
    } catch (err) {
      setError(t("register.errorMessage"));
    }
  };

  return (
    <div>
      <h3>{t("register.title")}</h3>
      {statusMessage && (
        <div className="text-green-800">{statusMessage}</div> 
      )}
      {error && (
        <div className="text-red-800">{error}</div> 
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">{t("register.email")}</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <div>
          <label htmlFor="password">{t("register.password")}</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          {t("register.button")}
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
