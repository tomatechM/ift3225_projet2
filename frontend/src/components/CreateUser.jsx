import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PasswordGenerator from './PasswordGenerator';

function CreateUser() {
    const [pseudo, setPseudo] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = {
            pseudo,
            email,
            password,
            isAdmin
        };

        try {
            const response = await fetch('http://localhost:3000/profils', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });

            const data = await response.json();
            if (!response.ok) {
                throw data;
            }

            localStorage.setItem('token', data.token);
            localStorage.setItem('id', data.userId);
            localStorage.setItem('admin', data.admin);

            setPseudo('');
            setEmail('');
            setPassword('');
            setErrorMessage('');
            navigate('/dashboard');
        } catch (error) {
            console.error(error);
            setErrorMessage(error.error || error.message || 'Erreur lors de la création de l’utilisateur.');
        }
    };

    return (
        <div className="container mt-4">
            <h1>Créer un compte</h1>
            <PasswordGenerator onPasswordGenerated={setPassword} />
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Pseudo</label>
                    <input type="text" className="form-control" value={pseudo} onChange={(e) => setPseudo(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Courriel</label>
                    <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Mot de passe</label>
                    <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className="form-check mb-3">
                    <input type="checkbox" className="form-check-input" checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} />
                    <label className="form-check-label">Admin</label>
                </div>
                <button className="btn btn-primary">Créer utilisateur</button>
            </form>
        </div>
    );
}

export default CreateUser;
