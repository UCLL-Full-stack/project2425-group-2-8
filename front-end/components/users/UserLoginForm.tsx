import { StatusMessage } from "@/types";
import classNames from "classnames";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useTranslation } from "next-i18next";

const UserLoginForm: React.FC = () => {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState<String | null>(null);
  const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);
  const router = useRouter();

  const { t } = useTranslation();

  const clearErrors = () => {
    setNameError(null);
    setStatusMessages([]);
  };

  const validate = (): boolean => {
    let result = true;

    if (!name && name.trim() === "") {
      setNameError(t("login.namevalidation"));
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

    setStatusMessages([
      {
        message: t("login.succesmessage"),
        type: "success",
      },
    ]);

    sessionStorage.setItem("loggedInUser", name);

    setTimeout(() => {
      router.push("/");
    }, 3000);
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
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="form-control mb-2"
          />
          {nameError && <div className="text-red-800">{nameError}</div>}
        </div>

        <button className="btn btn-primary" type="submit">
          {t("login.button")}
        </button>
      </form>
    </>
  );
};

export default UserLoginForm;
