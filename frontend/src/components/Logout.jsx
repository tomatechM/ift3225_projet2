import { useNavigate, BrowserRouter, Routes, Route } from "react-router-dom";

function Logout() {

	const navigate = useNavigate();

	const handleLogout = () => {

		localStorage.clear();
		navigate('/connexion');
	};

	return (<button onClick={handleLogout}>Logout</button>)

}

export default Logout;
