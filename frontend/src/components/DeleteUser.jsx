import { useEffect, useState } from 'react';

function DeleteUser({ user_id, onDelete }) {
    const [userId, setUserId] = useState(user_id || '');
    const [previewUser, setPreviewUser] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        setUserId(user_id || '');
    }, [user_id]);

    useEffect(() => {
        if (!userId) {
            setPreviewUser(null);
            return;
        }

        const fetchUser = async () => {
            try {
                const response = await fetch(`http://localhost:3000/profils/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const data = await response.json();
                if (!response.ok) {
                    throw data;
                }
                setPreviewUser(data);
                setErrorMessage('');
            } catch (error) {
                setPreviewUser(null);
                setErrorMessage(error.message || error.error || 'Impossible de charger l’utilisateur.');
            }
        };

        fetchUser();
    }, [userId]);

    const handleDelete = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:3000/profils/${userId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            const data = await response.json();
            if (!response.ok) {
                throw data;
            }
            alert('Utilisateur supprimé !');
            setUserId('');
            setPreviewUser(null);
            setErrorMessage('');
            if (onDelete) onDelete();
        } catch (error) {
            console.error(error);
            setErrorMessage(error.message || error.error || 'Erreur lors de la suppression de l’utilisateur.');
        }
    };

    return (
        <div className="card p-3 mb-4">
            <h3>Supprimer un utilisateur</h3>
            <form onSubmit={handleDelete}>
                <div className="mb-3">
                    <label className="form-label">ID utilisateur</label>
                    <input type="text" className="form-control" value={userId} onChange={(e) => setUserId(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-danger">Supprimer</button>
            </form>
            {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
            {previewUser && (
                <div className="mt-3">
                    <h5>Informations avant suppression</h5>
                    <p><strong>ID :</strong> {previewUser._id}</p>
                    <p><strong>Pseudo :</strong> {previewUser.pseudo}</p>
                    <p><strong>Courriel :</strong> {previewUser.email}</p>
                    <p><strong>Admin :</strong> {previewUser.isAdmin ? 'Oui' : 'Non'}</p>
                </div>
            )}
        </div>
    );
}

export default DeleteUser;
