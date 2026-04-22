import { useState, useEffect } from "react";

function DeleteUser({ user_id, onDelete }) {
    const [userId, setUserId] = useState(user_id);

    useEffect(() => {setUserId(user_id);}, [user_id]);

    const handleDelete = async (e) => {
        e.preventDefault();
	const token = localStorage.getItem("token");
        try{
            const response = await fetch(
		    `http://localhost:3000/profils/${userId}`, {
		    	method: "DELETE",
		    	headers: {
			    Authorization: `Bearer ${token}`
		    	}
		    }
	    );
            const data = await response.json();
		
	    if (!response.ok) {throw data;}
            alert("Utilisateur supprimé !");
            setUserId("");
	    onDelete();

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
