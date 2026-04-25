import { useEffect, useState } from 'react';

function GetUserById({ defaultId }) {
    const [userId, setUserId] = useState(defaultId || '');
    const [user, setUser] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (defaultId) {
            setUserId(defaultId);
        }
    }, [defaultId]);

    const handleSearch = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3000/profils/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const data = await response.json();
            if (!response.ok) {
                throw data;
            }
            setUser(data);
            setErrorMessage('');
        } catch (error) {
            console.error(error);
            setUser(null);
            setErrorMessage(error.message || error.error || 'Utilisateur introuvable ou accès refusé.');
        }
    };

    return (
        <div className="card p-3 mb-4">
            <h3>Rechercher un Utilisateur</h3>
            <form onSubmit={handleSearch}>
                <div className="mb-3">
                    <label className="form-label">ID utilisateur</label>
                    <input type="text" className="form-control" value={userId} onChange={(e) => setUserId(e.target.value)} required />
                </div>
                <button className="btn btn-primary">Rechercher</button>
            </form>
            {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
            {user && (
                <div className="mt-3">
                    <h5>Informations utilisateur</h5>
                    <p><strong>ID :</strong> {user._id}</p>
                    <p><strong>Pseudo :</strong> {user.pseudo}</p>
                    <p><strong>Courriel :</strong> {user.email}</p>
                    <p><strong>Admin :</strong> {user.isAdmin ? 'Oui' : 'Non'}</p>
                </div>
            )}
        </div>
    );
}

export default GetUserById;