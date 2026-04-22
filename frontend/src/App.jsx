import { useNavigate, Navigate, BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import CreateUser from "./components/CreateUser";
import Login from "./components/Login";
import UsersTable from "./components/UsersTable";
import DeleteUser from "./components/DeleteUser";
import GetUserById from "./components/GetUserById";
import UpdateUser from "./components/UpdateUser";
import PasswordGenerator from "./components/PasswordGenerator";
import Logout from "./components/Logout";

function App() {

	const token = localStorage.getItem("token");
	const admin = localStorage.getItem("admin") === "true";
	const id = localStorage.getItem("id");
	const navigate = useNavigate();

	return (
	<>
	<Routes>
		<Route path="/" element={token ? <Navigate to='/dashboard' /> : <Navigate to='/connexion' />} />
		<Route path="/connexion" element={<Login />} />
		<Route path="/signup" element={<CreateUser />} />
		<Route path="/users" element={admin ? <UsersTable /> : <Navigate to='/dashboard' />} />
		<Route path="/dashboard" element={
			<>
			{admin && <a href="/users">Manage users</a>}
			<a href="/update">{admin ? "Edit profiles" : "Edit profile"}</a>
			</>
		} />
		<Route path="/update" element={<UpdateUser />} />
	</Routes>
	{token && <Logout />}
	</>
	)
}

export default App;
