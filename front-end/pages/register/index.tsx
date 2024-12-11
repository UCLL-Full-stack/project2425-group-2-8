import React from "react";
import RegisterForm from "@/components/users/RegisterForm";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Header from "@/components/header";

const RegisterPage: React.FC = () => {
    return (
      <>
        <Header></Header>
        <main className="d-flex flex-column justify-content-center align-items-center">
          <RegisterForm></RegisterForm>
        </main>
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

export default RegisterPage;
