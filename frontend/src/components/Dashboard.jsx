import { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import UsersTable from './UsersTable';
import GetUserById from './GetUserById';
import UpdateUser from './UpdateUser';
import DeleteUser from './DeleteUser';

function Dashboard() {
    const token = localStorage.getItem('token');
    const admin = localStorage.getItem('admin') === 'true';
    const id = localStorage.getItem('id');
    const [showProfile, setShowProfile] = useState(false);

    if (!token) {
        return <Navigate to="/connexion" replace />;
    }

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <p>Connecté en tant que {admin ? 'compte administrateur' : 'compte utilisateur'}.</p>
                </div>
                <div>
                    <Link to="/docs" className="btn btn-outline-secondary me-2">Documentation API</Link>
                    <button className="btn btn-danger" onClick={() => {
                        localStorage.clear();
                        window.location.href = '/connexion';
                    }}>Déconnexion</button>
                </div>
            </div>

            {admin ? (
                <>
                    <section className="mb-5">
                        <h2>Lecture de tous</h2>
                        <UsersTable />
                    </section>
                    <section className="mb-5">
                        <h2>Recherche par ID</h2>
                        <GetUserById defaultId={id} />
                    </section>
                    <section className="mb-5">
                        <h2>Modification de profil</h2>
                        <UpdateUser defaultId={id} />
                    </section>
                    <section className="mb-5">
                        <h2>Suppression d'un utilisateur</h2>
                        <DeleteUser />
                    </section>
                </>
            ) : (
                <>
                    <section className="mb-5">
                        <h2>Mes informations</h2>
                        <button className="btn btn-primary mb-3" onClick={() => setShowProfile(prev => !prev)}>
                            {showProfile ? 'Masquer mon profil' : 'Afficher mon profil'}
                        </button>
                        {showProfile && <GetUserById defaultId={id} />}
                    </section>
                    <section className="mb-5">
                        <h2>Modifier mon profil</h2>
                        <UpdateUser defaultId={id} />
                    </section>
                </>
            )}
        </div>
    );
}

export default Dashboard;
