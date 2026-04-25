function ApiDocs() {
    const routes = [
        {
            method: 'POST',
            path: '/profils',
            description: 'Créer un nouvel utilisateur (inscription).',
            curl: `curl -X POST http://localhost:3000/profils -H "Content-Type: application/json" -d '{"pseudo":"bob","email":"bob@example.com","password":"secret","isAdmin":false}'`,
            returns: '{ "message": "Utilisateur ... créé !", "userId": "...", "admin": false, "token": "..." }'
        },
        {
            method: 'POST',
            path: '/connexion',
            description: 'Connexion pour obtenir un token JWT.',
            curl: `curl -X POST http://localhost:3000/connexion -H "Content-Type: application/json" -d '{"email":"bob@example.com","password":"secret"}'`,
            returns: '{ "userId": "...", "admin": false, "token": "..." }'
        },
        {
            method: 'GET',
            path: '/profils',
            description: 'Récupère tous les utilisateurs (administrateurs uniquement).',
            curl: `curl -H "Authorization: Bearer <token>" http://localhost:3000/profils`,
            returns: '[ { "_id": "...", "pseudo": "bob", "email": "bob@example.com", "isAdmin": false }, ... ]'
        },
        {
            method: 'GET',
            path: '/profils/:id',
            description: 'Récupère un utilisateur par son ID (admin ou propriétaire).',
            curl: `curl -H "Authorization: Bearer <token>" http://localhost:3000/profils/<id>`,
            returns: '{ "_id": "...", "pseudo": "bob", "email": "bob@example.com", "isAdmin": false }'
        },
        {
            method: 'PUT',
            path: '/profils/:id',
            description: 'Met à jour un profil en modifiant pseudo, email, mot de passe ou admin.',
            curl: `curl -X PUT http://localhost:3000/profils/<id> -H "Authorization: Bearer <token>" -H "Content-Type: application/json" -d '{"pseudo":"bob2","email":"bob2@example.com"}'`,
            returns: '{ "_id": "...", "pseudo": "bob2", "email": "bob2@example.com", "isAdmin": false }'
        },
        {
            method: 'DELETE',
            path: '/profils/:id',
            description: 'Supprime un utilisateur par son ID (administrateurs uniquement).',
            curl: `curl -X DELETE http://localhost:3000/profils/<id> -H "Authorization: Bearer <token>"`,
            returns: '{ "_id": "...", "pseudo": "bob", "email": "bob@example.com", "isAdmin": false }'
        },
        {
            method: 'GET',
            path: '/motdepasse/:len',
            description: 'Génère un mot de passe aléatoire de la longueur demandée.',
            curl: `curl http://localhost:3000/motdepasse/12`,
            returns: '{ "password": "Ab3dE5h7Ij9K" }'
        }
    ];

    return (
        <div className="container mt-4">
            <h1>Documentation de l'API</h1>
            <p>Routes accessibles aux deux profils : création et documentation.</p>
            <div className="list-group">
                {routes.map((route, index) => (
                    <div key={index} className="list-group-item mb-3">
                        <h5>{route.method} {route.path}</h5>
                        <p>{route.description}</p>
                        <p><strong>Exemple curl :</strong></p>
                        <pre>{route.curl}</pre>
                        <p><strong>Retour :</strong> <code>{route.returns}</code></p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ApiDocs;
