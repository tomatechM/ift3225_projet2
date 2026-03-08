import { useState } from "react";

function GetUserById() {
    const [userId, setUserId] = useState("");
    const [user, setUser] = useState(null);

    const handleSearch = async (e) => {
        e.preventDefault();
        try{
            const response = await fetch(`http://localhost:3000/profils/${userId}`);
            const data = await response.json();

            setUser(data);
        } catch (error){
            console.error(error);
            alert("Utilisateur introuvable !");
        }
    };

    return (
        <>
            <h3>Rechercher un Utilisateur</h3>
            <form onSubmit={handleSearch}>
                <div className="mb-3"> 
                    <label className="form-label">ID utilisateur</label> 
                    <input type="text" className="form-control" value={userId} onChange={(e) => setUserId(e.target.value)} required /> 
                </div>
                <button className="btn btn-primary">Rechercher</button>
            </form>

            {user && ( 
                <div className="mt-3"> 
                    <h5>Informations utilisateur</h5> 
                    <p><strong>ID :</strong> {user._id}</p> 
                    <p><strong>Pseudo :</strong> {user.pseudo}</p> 
                    <p><strong>Courriel :</strong> {user.email}</p> 
                </div>
            )}
        </>
    );
}

export default GetUserById;