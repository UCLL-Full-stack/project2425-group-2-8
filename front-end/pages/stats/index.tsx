import Header from "@/components/header";
import AddStatsButton from "@/components/stats/addStats";
import UserOverviewTable from "@/components/users/UserOverviewTable";
import UserService from "@/services/UserService";
import { User } from "@/types";
import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Stats: React.FC = () => {
  const [users, setUsers] = useState<Array<User>>();

  const { t } = useTranslation();

  const getUsers = async () => {
    const response = await UserService.getAllUsers();
    const userss = await response.json();
    setUsers(userss);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <Header></Header>
      <main className="d-flex flex-column justify-content-center align-items-center">
        <section>
          <h2>{t("stats.overview")}</h2>
          {users && <UserOverviewTable users={users} />}
        </section>
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

export default Stats;
