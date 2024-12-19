import { StatusMessage } from "@/types";
import classNames from "classnames";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useTranslation } from "next-i18next";
import UserService from "@/services/UserService";

const UserLoginForm: React.FC = () => {
  // const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string | null>(null);
  // const [nameError, setNameError] = useState<String | null>(null);
  const [emailError, setEmailError] = useState<String | null>(null);
  const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);
  const router = useRouter();

  const { t } = useTranslation();

  const clearErrors = () => {
    setEmailError(null);
    setPasswordError(null);
    setStatusMessages([]);
  };

  const validate = (): boolean => {
    let result = true;

    if (!email && email.trim() === "") {
      setEmailError(t("login.namevalidation"));
      result = false;
    }

    if (!password && password.trim() === "") {
      setPasswordError(t("login.passwordvalidation"));
      result = false;
    }

    return result;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    clearErrors();

    if (!validate()) {
      return;
    }

    const user = { email: email, password };
    const response = await UserService.loginUser(user);

    if (response.status === 200) {
      setStatusMessages([{ message: t("login.succesmessage"), type: "success" }]);

      const user = await response.json();

      sessionStorage.setItem(
        'loggedInUser', 
        JSON.stringify({
          token: user.token, 
          fullname: user.fullname, 
          email: user.email, 
          role: user.role
        })
      )

      setTimeout(() => {
        router.push("/");
      }, 2000);
    

    };
  };

  return (
    <>
      <h3 className="px-0">{t("login.title")}</h3>
      {statusMessages && (
        <div className="row">
          <ul className="list-none mb-3 mx-auto">
            {statusMessages.map(({ message, type }, index) => (
              <li
                key={index}
                className={classNames({
                  "text-red-800": type === "error",
                  "text-green-800": type === "success",
                })}
              >
                {message}
              </li>
            ))}
          </ul>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <label htmlFor="nameInput" className="block mb-2 text-sm font-medium">
          {t("login.username")}
        </label>
        <div className="block mb-2 text-sm font-medium">
          <input
            id="nameInput"
            type="text"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="form-control mb-2"
          />
          {emailError && <div className="text-red-800">{emailError}</div>}
        </div>
        <div className="mt-2">
          <div>
            <label
              htmlFor="passwordInput"
              className="block mb-2 text-sm font-medium"
            >
              {t("login.password")}
            </label>
          </div>
          <div className="block mb-2 text-sm font-medium">
            <input
              id="passwordInput"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue:500 block w-full p-2.5"
            />
            {passwordError && (
              <div className=" text-red-800">{passwordError}</div>
            )}
          </div>
        </div>

        <button className="btn btn-primary" type="submit">
          {t("login.button")}
        </button>
      </form>
    </>
  );
};

export default UserLoginForm;
