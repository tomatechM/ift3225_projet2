import { useState } from 'react';

function UsersTable() {
    const [users, setUsers] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:3000/profils', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            const data = await response.json();
            if (!response.ok) {
                throw data;
            }
            setUsers(data);
            setLoaded(true);
            setErrorMessage('');
        } catch (error) {
            setUsers([]);
            setLoaded(true);
            setErrorMessage(error.message || error.error || 'Erreur récupération utilisateurs.');
            console.error('Erreur récupération utilisateurs :', error);
        }
    };

    return (
        <div className="card p-3 mb-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3>Liste des utilisateurs</h3>
                <button className="btn btn-primary" onClick={fetchUsers}>Afficher tous les utilisateurs</button>
            </div>
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            {loaded && users.length === 0 && !errorMessage && <div className="alert alert-warning">Aucun utilisateur trouvé.</div>}
            {users.length > 0 && (
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Pseudo</th>
                            <th>Email</th>
                            <th>Admin</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.pseudo}</td>
                                <td>{user.email}</td>
                                <td>{user.isAdmin ? 'Oui' : 'Non'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default UsersTable;
