import { useState } from "react";

function PasswordGenerator(){
    const [length, setLength] = useState(8);
    const [password, setPassword] = useState("");

    const generatePassword = async() => {
        try{
            const response = await fetch(`http://localhost:3000/motdepasse/${length}`, {
	    	method: "GET"
	    });
		const data = await response.json();
            	setPassword(data.password);
        } catch(error) {
            console.error(error); 
            alert("Erreur de génération du mot de passe");
        }
    };

    return (
        <>
            <h3>Générateur de mot de passe</h3>
            <div className="mb-3">
                <label className="form-label">Longueur du mot de passe</label>
                <input type="number" className="form-control" value={length} onChange={(e) => setLength(e.target.value)} />
            </div>
            <button className="btn btn-secondary" onClick={generatePassword}>Générer</button>
            {password && (
                <div className="mt-3"> 
                    <strong>Mot de passe généré :</strong> 
                    <div className="alert alert-info mt-2">{password}</div> 
                </div> 
            )}
        </>
    );
}

export default PasswordGenerator;
