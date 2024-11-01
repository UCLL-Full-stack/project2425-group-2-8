import Header from "@/components/header";
import AddStatsButton from "@/components/stats/addStats";
import UserOverviewTable from "@/components/users/UserOverviewTable";
import UserService from "@/services/UserService";
import { User } from "@/types";
import { useEffect, useState } from "react";



const Stats: React.FC = () => {

    const [users, setUsers] = useState<Array<User>>();
    
    const getUsers = async () => {
        const response = await UserService.getAllUsers();
        const userss = await response.json();
        setUsers(userss)
    }

    useEffect(() => {
        getUsers()
        },
        []
    )

    return (
        <>
            <Header></Header>
            <main className="d-flex flex-column justify-content-center align-items-center">
                <h2>Hier komen stats ofzo</h2>
                <section>
                    <h2>User overview</h2>
                    {users && (
                        <UserOverviewTable users={users}/> 
                        
                    )}
                </section>
            </main>
        </>
    )

};

export default Stats;