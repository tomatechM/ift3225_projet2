import { useEffect, useState} from 'react';

import DeleteUser from "./DeleteUser";

function UsersTable(){
    const [users, setUsers] = useState([]);
    const [toDelete, setToDelete] = useState("");
    const [reload, setReload] = useState(false);

    useEffect(() => {
	console.log("Fetching users");
        fetchUsers();
    }, [reload]);

    const fetchUsers = async() => {
        try{
            const response = await fetch(`http://localhost:3000/profils`);
            const data = await response.json();
            setUsers(data);
	    console.log(data);
	    if (!response.ok) {throw data;}
        } catch(error){
	    setUsers([]);
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
	    		<th>Admin</th>
	    		<th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length === 0 ? (
                        <tr><td>Aucun utilisateur</td></tr>
                    ) : (
                        users.map((users) => (
                            <tr key={users._id}>
                                <td>{users._id}</td>
                                <td>{users.pseudo}</td>
                                <td>{users.email}</td>
				<td>{users.isAdmin ? "Oui" : "Non"}</td>
				<td>
				    <button onClick={() => setToDelete(users._id)} className="btn btn-danger">Selectionner</button>
				</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
	    <DeleteUser user_id={toDelete} onDelete={() => setReload(prev => !prev)} />
        </>
    );
}

export default UsersTable;
