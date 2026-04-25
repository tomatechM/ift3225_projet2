import { useEffect, useState } from 'react';

function UpdateUser({ defaultId }) {
    const [userId, setUserId] = useState(defaultId || '');
    const [pseudo, setPseudo] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (defaultId) {
            setUserId(defaultId);
        }
    }, [defaultId]);

    const handleUpdate = async (e) => {
        e.preventDefault();

        const updatedUser = {
            pseudo,
            email,
            password
        };

        try {
            const response = await fetch(`http://localhost:3000/profils/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(updatedUser)
            });
            const data = await response.json();

            if (!response.ok) {
                throw data;
            }

            setMessage('Utilisateur modifié !');
            setPseudo('');
            setEmail('');
            setPassword('');
        } catch (error) {
            console.error(error);
            setMessage(error.message || error.error || 'Erreur lors de la modification.');
        }
    };

    return (
        <div className="card p-3 mb-4">
            <h3>Modifier un utilisateur</h3>
            {message && <div className="alert alert-info">{message}</div>}
            <form onSubmit={handleUpdate}>
                <div className="mb-3">
                    <label className="form-label">ID utilisateur</label>
                    <input type="text" className="form-control" value={userId} onChange={(e) => setUserId(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Nouveau pseudo</label>
                    <input type="text" className="form-control" value={pseudo} onChange={(e) => setPseudo(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Nouveau courriel</label>
                    <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Nouveau mot de passe</label>
                    <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-warning">Modifier utilisateur</button>
            </form>
        </div>
    );
}

export default UpdateUser;