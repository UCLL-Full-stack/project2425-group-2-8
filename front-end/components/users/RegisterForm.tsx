import React, { useState } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import UserService from "@/services/UserService";

const RegisterForm: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [firstname, setFirstname] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatusMessage(null);
    setError(null);

    const user = {
      email,
      password,
      profile: {
        firstName: firstname,
        name,
        dateOfBirth: new Date(dateOfBirth).toISOString(),
      },
    };

    try {
      const response = await UserService.registerUser(user);

      if (response.ok) {
        setStatusMessage(t("register.successMessage"));

        const loginResponse = await UserService.loginUser(user);

        if (loginResponse.ok) {
          const user = await loginResponse.json();

          localStorage.setItem(
            "loggedInUser",
            JSON.stringify({
              token: user.token,
              fullname: user.fullname,
              email: user.email,
              role: user.role,
            })
          );

          setTimeout(() => {
            router.push("/");
          }, 2000);
        }
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
      {statusMessage && <div className="text-green-800">{statusMessage}</div>}
      {error && <div className="text-red-800">{error}</div>}
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
        <div>
          <label htmlFor="name">{t("register.name")}</label>
          <input
            type="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <div>
          <label htmlFor="firstname">{t("register.firstname")}</label>
          <input
            type="firstname"
            id="firstname"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <div>
          <label htmlFor="dateOfBirth">{t("register.dateofbirth")}</label>
          <input
            type="date"
            id="dateOfBirth"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
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
