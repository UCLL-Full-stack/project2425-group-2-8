import Head from 'next/head';
import Image from 'next/image';
import Header from '@/components/header';
import styles from '@/styles/Home.module.css';
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import UserOverviewTable from '@/components/users/UserOverviewTable';

const Home: React.FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{t("app.title")}</title>
        <meta name="description" content="FitFait" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>
        <span>
          <h1>{t("welcome")}</h1>
        </span>

        <div className={styles.description}>
          <p>
            {t("explanation")}
          </p>
        </div>
      </main>
    </>
  );
};

export const getServerSideProps = async (context: { locale: any; }) => {
  const { locale } = context;

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
    },
  };
};

export default Home;
