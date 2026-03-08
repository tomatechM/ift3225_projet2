import { useState } from "react";

function UpdateUser() {
    const [userId, setUserId] = useState("");
    const [pseudo, setPseudo] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleUpdate = async (e) => {
        e.preventDefault();

        const updatedUser = {
            pseudo, email, password
        }

        try{
            const response = await fetch(`http://localhost:3000/profils/${userId}`,{
                method: "PUT",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(updatedUser)
            });
            const data = response.json();

            console.log(data);
            alert("Utilisateur modifié !");
        } catch (error) {
            console.error(error);
            alert("Erreur lors de la modification");
        }
    };

    return (
        <>
            <h3>Modifier un utilisateur</h3>
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
                    <label className="form-label">Nouveau Mot de passe</label> 
                    <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} /> 
                </div>

                <button className="btn btn-warning">Modifier utilisateur</button>
            </form>
        </>
    );
};

export default UpdateUser;