import { useState, useEffect } from "react";
import { useNavigate, BrowserRouter, Routes, Route } from "react-router-dom";
import CreateUser from "./CreateUser";

function Login(){

    const [pseudo, setPseudo] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const navigate = useNavigate();

    const goToSignup = () => {
	navigate('/signup');
    }

    const handleLogin = async(e) => {
        e.preventDefault();

        const user = {
            pseudo, email, password
        }

        try{
            const response = await fetch(`http://localhost:3000/connexion`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            });

            const data = await response.json();

            if (!response.ok) {throw data;}
	    localStorage.setItem("token", data.token);
	    localStorage.setItem("id", data.userId);
	    localStorage.setItem("admin", data.admin);

            setPseudo("");
            setEmail("");
            setPassword("");
	    navigate('/dashboard');
        } catch (error){
            console.error(error);
            alert("Erreur lors de la connexion:\n" + error.error.message);
        }
    };

    return (
        <>
            <form onSubmit={handleLogin}>
                <div className="mb-3">
                    <label className="form-label">Pseudo</label> 
                    <input type="text" className="form-control" value={pseudo} onChange={(e) => setPseudo(e.target.value)} required />
                </div>
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
	    <button className="btn btn-primary" onClick={goToSignup}>Signup</button>
        
	    //<Routes><Route path="/signup" element={<CreateUser />} /></Routes>
	</>
    );
}

export default Login;
