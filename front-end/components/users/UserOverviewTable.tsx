import { User } from "@/types";
import AddStatsButton from "../stats/addStats";


type Props = {
    users: Array<User>;
};

const UserOverviewTable: React.FC<Props> = ({ users }: Props) => {
    const handleAddStats = (email: string) => {
        // dees moet er ff gwn staan zoda de knop er kan zijn, later moet hier functionaliteit voor de knop
    };

    return (
        <>
            {users && (
                <table className="table table-hover">
                    
                    <tbody>
                        {users.map((users, index) => (
                            <tr key={index}>
                                <td>{users.email}</td>
                                <td>
                                    <AddStatsButton onClick={() => handleAddStats(users.email)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
};

export default UserOverviewTable