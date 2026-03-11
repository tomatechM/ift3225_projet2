import { useEffect, useState} from 'react';

function UsersTable(){
    const [users, setUsers] = useState([]);

    useEffect(() => {
	console.log("Fetching users");
        fetchUsers();
    }, []);

    const fetchUsers = async() => {
        try{
            const response = await fetch(`http://localhost:3000/profils`);
            const data = await response.json();
            setUsers(data);
	    console.log(data);
        } catch(error){
            console.error("Erreur récupération utilisateurs :", error);
        }
    };

    return (
        <>
            <h3>Liste des utilisateurs</h3>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Pseudo</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length === 0 ? (
                        <tr>Aucun utilisateur</tr>
                    ) : (
                        users.map((users) => (
                            <tr key={users._id}>
                                <td>{users._id}</td>
                                <td>{users.pseudo}</td>
                                <td>{users.email}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </>
    );
}

export default UsersTable;
