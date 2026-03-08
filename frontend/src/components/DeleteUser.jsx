import { useState } from "react";

function DeleteUser() {
    const [userId, setUserId] = useState("");

    const handleDelete = async (e) => {
        e.preventDefault();

        try{
            const response = await fetch( `http://localhost:3000/profils/${userId}`, {method: "DELETE"});
            const data = await response.json();
            console.log(data);

            alert("Utilisateur supprimé !");
            setUserId("");

        } catch (error){
            console.error(error); 
            alert("Erreur lors de la suppression de l'utilisateur");
        }
    };

    return (
        <>
            <h3>Supprimer un utilisateur</h3>
            <form onSubmit={handleDelete}>
                <div className="mb-3"> 
                    <label className="form-label">ID utilisateur</label> 
                    <input type="text" className="form-control" value={userId} onChange={(e) => setUserId(e.target.value)} required /> 
                </div>
                <button className="btn btn-danger">Supprimer</button>
            </form>
        </>
    );
};

export default DeleteUser;