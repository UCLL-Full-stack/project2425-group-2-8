import Header from "@/components/header";
import UserLoginForm from "@/components/users/UserLoginForm";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import LoginCredentials from "@/components/users/loginCredentials";
import UserService from "../../services/UserService";
import { User } from "@/types";
import { useState } from "react";

const LoginPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  const fetchUsers = async () => {
    try {
      const response = await UserService.getAllUsers();
      const data: User[] = await response.json();
      setUsers(data);
    } catch (error) {
      setError((error as Error).message);
    }
  }
  fetchUsers();

  return (
    <>
      <Header></Header>
      <main className="d-flex flex-column justify-content-center align-items-center">
        <UserLoginForm></UserLoginForm>
        <LoginCredentials users={users}/>
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
