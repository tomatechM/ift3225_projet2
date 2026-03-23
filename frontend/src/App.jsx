import { useNavigate, Navigate, BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import CreateUser from "./components/CreateUser";
import Login from "./components/Login";
import UsersTable from "./components/UsersTable";
import DeleteUser from "./components/DeleteUser";
import GetUserById from "./components/GetUserById";
import UpdateUser from "./components/UpdateUser";
import PasswordGenerator from "./components/PasswordGenerator";


function App() {

	const token = localStorage.getItem("token");
	const admin = localStorage.getItem("admin") === "true";
	const id = localStorage.getItem("id");
	localStorage.clear();
	const navigate = useNavigate();

	return (
	<>
	<Routes>
		<Route path="/" element={token ? <Navigate to='/dashboard' /> : <Navigate to='/connexion' />} />
		<Route path="/connexion" element={<Login />} />
		<Route path="/signup" element={<CreateUser />} />
		<Route path="/users" element={admin ? <UsersTable /> : <Navigate to='/connexion' />} />
		<Route path="/dashboard" element={admin ? <Navigate to='/users' /> : <h1>Systeme de messagerie</h1>} />
	</Routes>
	<button onClick={() => navigate('/signup')}>Signup</button>
	</>
	)
}

export default App;
