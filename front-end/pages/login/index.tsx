import Header from "@/components/header";
import UserLoginForm from "@/components/users/UserLoginForm"
import Head from "next/head";

const LoginPage: React.FC = () => {
    return (
        <>
            <Header></Header>
            <main className="d-flex flex-column justify-content-center align-items-center">
                
                <UserLoginForm></UserLoginForm>
            </main>
        </>
    )
};

export default LoginPage;