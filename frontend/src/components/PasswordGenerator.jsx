import { useState } from 'react';

function PasswordGenerator({ onPasswordGenerated }) {
    const [length, setLength] = useState(8);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const generatePassword = async () => {
        try {
            const response = await fetch(`http://localhost:3000/motdepasse/${length}`);
            const data = await response.json();
            if (!response.ok) {
                throw data;
            }
            setPassword(data.password);
            setError('');
            if (onPasswordGenerated) {
                onPasswordGenerated(data.password);
            }
        } catch (error) {
            console.error(error);
            setError('Erreur de génération du mot de passe.');
        }
    };

    return (
        <div className="card mb-4 p-3">
            <h3>Générateur de mot de passe</h3>
            <div className="mb-3">
                <label className="form-label">Longueur du mot de passe</label>
                <input type="number" className="form-control" min="4" max="32" value={length} onChange={(e) => setLength(Number(e.target.value))} />
            </div>
            <button type="button" className="btn btn-secondary" onClick={generatePassword}>Générer</button>
            {password && (
                <div className="mt-3">
                    <strong>Mot de passe généré :</strong>
                    <div className="alert alert-info mt-2">{password}</div>
                </div>
            )}
            {error && <div className="alert alert-danger mt-3">{error}</div>}
        </div>
    );
}

export default PasswordGenerator;
