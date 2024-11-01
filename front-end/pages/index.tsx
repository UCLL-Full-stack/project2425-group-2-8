import Head from 'next/head';
import Image from 'next/image';
import Header from '@/components/header';
import styles from '@/styles/Home.module.css'

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>FitFait</title>
        <meta name="description" content="FitFait" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>
        <span>
          <h1>Welcome Lbozo</h1>
        </span>

        <div className={styles.description}>
          <p>
            uitleg over fitfait
          </p>
        </div>
      </main>
    </>
  );
};

export default Home;
