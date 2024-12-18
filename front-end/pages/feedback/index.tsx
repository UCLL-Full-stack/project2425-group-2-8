import Header from "@/components/header";
import { useTranslation } from "next-i18next";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const FeedbackPage: React.FC = () => {
    const { t } = useTranslation();
  return (
    <>
      <Header />
      <div className="container mt-4">
        <h2>Feedback</h2>
        <form className="feedback-form">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              {t("feedback.name")}
            </label>
            <input
              type="text"
              id="name"
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
    </>
  );
};

export const getServerSideProps = async (context: { locale: any }) => {
  const { locale } = context;

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
    },
  };
};

export default FeedbackPage;
