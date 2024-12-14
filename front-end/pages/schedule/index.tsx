import Header from "@/components/header";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ScheduleOverviewTable from "@/components/users/ScheduleOverviewTable";


const Schedule: React.FC = () => {

    return (
        <>
        <Header></Header>
        <main className="d-flex flex-column justify-content-center align-items-center">
        <section>
            <ScheduleOverviewTable />
        </section>
      </main>
        </>
    )
};

export const getServerSideProps = async (context: { locale: any }) => {
    const { locale } = context;
  
    return {
      props: {
        ...(await serverSideTranslations(locale ?? "en", ["common"])),
      },
    };
  };
  

export default Schedule