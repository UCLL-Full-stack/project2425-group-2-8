import Header from "@/components/header";
import UserLoginForm from "@/components/users/UserLoginForm";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const LoginPage: React.FC = () => {
  return (
    <>
      <Header></Header>
      <main className="d-flex flex-column justify-content-center align-items-center">
        <UserLoginForm></UserLoginForm>
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

export default LoginPage;
