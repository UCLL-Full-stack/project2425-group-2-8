import React, { useEffect, useState } from "react";
import Header from "@/components/header";
import FeedbackForm from "@/components/feedback/feedbackform";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Feedback } from "@/types";
import FeedbackService from "@/services/FeedbackService";

const FeedbackPage: React.FC = () => {
  const { t } = useTranslation();
  const [feedbackList, setFeedbackList] = useState<Array<Feedback>>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      
      if (user.token) {
        setIsLoggedIn(true);
        setIsAdmin(user.role === "admin");
      } else {
        setIsLoggedIn(false);
        setIsAdmin(false);
      }
    } else {
      setIsLoggedIn(false);
      setIsAdmin(false);
    }
  }, []);

  const getFeedback = async () => {
    if (!isLoggedIn) {
      setErrorMessage(t("feedback.loginRequired"));
      return;
    }

    try {
      const response = await FeedbackService.getFeedback();

      if (response.ok) {
        const feedback = await response.json();
        setFeedbackList(Array.isArray(feedback) ? feedback : []);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData?.message || t("feedback.unauthorized"));
      }
    } catch (error) {
      console.error("Error fetching feedback:", error);
      setErrorMessage(t("feedback.error"));
    }
  };


  const handleFormSubmit = async (data: { name: string; email: string; message: string }) => {
    try {
      const response = await FeedbackService.addFeedback(data);
      if (response.ok) {
        setSuccessMessage(t("feedback.success")); 
        await getFeedback();
      } 
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  useEffect(() => {
    if (isLoggedIn) {
      getFeedback();
    }
  }, [isLoggedIn]);
  return (
    <>
      <Header />
      <div className="container mt-4">
        {isLoggedIn ? (
          <>
            <h2>{t("feedback.title")}</h2>
            <FeedbackForm onSubmit={handleFormSubmit} successMessage={successMessage} />
            <div className="feedback-list mt-4">
              <h3>{t("feedback.listTitle")}</h3>
              {feedbackList.length > 0 ? (
                <ul>
                  {feedbackList.map((feedback) => (
                    <li key={feedback.id}>
                      <strong>{feedback.name}</strong>: {feedback.message}
                    </li>
                  ))}
                </ul>
              ) : isAdmin ? ( 
                <p>{t("feedback.noFeedback")}</p>
              ) : ( 
                <div className="error-box">
                  {t("feedback.unauthorized")}
                </div>
              )}
            </div>
          </>
        ) : (
          <p>{t("feedback.loginRequired")}</p>
        )}
      </div>
    </>
  );
};

export const getServerSideProps = async (context: { locale: string }) => {
  const { locale } = context;

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
    },
  };
};

export default FeedbackPage;
