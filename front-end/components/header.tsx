import { link } from 'fs';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Language from './language/Language';
import { useTranslation } from "next-i18next";

type UserType = {
  token: string;
  fullname: string;
  email: string;
  role?: string;
};
const Header: React.FC = () => {
  const { t } = useTranslation();

  const [loggedInUser, setLoggedInUser] = useState<UserType | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setLoggedInUser(parsedUser);
      } catch (error) {
        console.error("Failed to parse loggedInUser from localStorage:", error);
        setLoggedInUser(null);
      }
    }
  }, []);

  const handleClick = () => {
    localStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
  }

  return (
    <header className="p-3 mb-3 border-bottom bg-dark bg-gradient">
      <a className="fs-2 d-flex justify-content-center mb-2 mb-lg-0 text-white-50 text-decoration-none">
        {' '}
        {t("app.title")}
      </a>
      <nav className="nav justify-content-center">
        <Link href="/" className="nav-link px-4 fs-5 text-white">
          {t("header.nav.home")}
        </Link>
        <Link href="/stats" className="nav-link px-4 fs-5 text-white">
          {t("header.nav.stats")}
        </Link>
        <Link href="/schedule" className="nav-link px-4 fs-5 text-white">
          {t("header.nav.schedule")}
        </Link>

        {!loggedInUser && (
          <>
            <Link href="/login" className="nav-link px-4 fs-5 text-white">
              {t("header.nav.login")}
            </Link>
            <Link href="/register" className="nav-link px-4 fs-5 text-white">
              {t("header.nav.register")}
            </Link>
          </>
        )}

        {loggedInUser && (
          <a 
            href="#"
            className="nav-link px-4 fs-5 text-white"
            onClick={handleClick}>
            {t("header.nav.logout")}
          </a>
        )}

        {loggedInUser && (
          <div className='text-white ms-5 mt-2 md:mt-0 pt-1 md:pt-0 grow'>
            {t("welcome")}, {loggedInUser.fullname || loggedInUser.email}!
          </div>
        )}
        <Language />
      </nav>
    </header>
  );
};

export default Header;
