import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        const credentials = { email, password };

        try {
            const response = await fetch('http://localhost:3000/connexion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });

            const data = await response.json();
            if (!response.ok) {
                throw data;
            }

            localStorage.setItem('token', data.token);
            localStorage.setItem('id', data.userId);
            localStorage.setItem('admin', data.admin);
            setErrorMessage('');
            setEmail('');
            setPassword('');
            navigate('/dashboard');
        } catch (error) {
            console.error(error);
            setErrorMessage(error.message || error.error || 'Erreur lors de la connexion.');
        }
    };

    return (
        <div className="container mt-4">
            <h1>Connexion</h1>
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            <form onSubmit={handleLogin}>
                <div className="mb-3">
                    <label className="form-label">Courriel</label>
                    <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Mot de passe</label>
                    <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button className="btn btn-primary">Connexion</button>
            </form>
            <div className="mt-3">
                <p>Pas encore de compte ? <Link to="/signup">Inscrivez-vous ici</Link>.</p>
            </div>
        </div>
    );
}

export default Login;
