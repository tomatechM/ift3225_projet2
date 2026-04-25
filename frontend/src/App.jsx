import { Navigate, Routes, Route, Link } from 'react-router-dom';
import CreateUser from './components/CreateUser';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ApiDocs from './components/ApiDocs';

function App() {
    const token = localStorage.getItem('token');

    return (
        <div className="container py-4">
            <nav className="mb-4 d-flex justify-content-between align-items-center">
                <div>
                    {!token && <Link className="btn btn-outline-primary me-2" to="/connexion">Connexion</Link>}
                    {!token && <Link className="btn btn-primary" to="/signup">Inscription</Link>}
                    {token && <Link className="btn btn-outline-secondary" to="/dashboard">Page Principal</Link>}
                </div>
            </nav>

            <Routes>
                <Route path="/" element={token ? <Navigate to="/dashboard" /> : <Navigate to="/connexion" />} />
                <Route path="/connexion" element={<Login />} />
                <Route path="/signup" element={<CreateUser />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/docs" element={<ApiDocs />} />
                <Route path="*" element={<Navigate to={token ? '/dashboard' : '/connexion'} />} />
            </Routes>
        </div>
    );
}

export default App;
