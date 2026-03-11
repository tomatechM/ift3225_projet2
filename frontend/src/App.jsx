import CreateUser from "./components/CreateUser";
import UsersTable from "./components/UsersTable";
import DeleteUser from "./components/DeleteUser";
import GetUserById from "./components/GetUserById";
import UpdateUser from "./components/UpdateUser";
import PasswordGenerator from "./components/PasswordGenerator";


function App() {

  return (
    <>
      <h1>Gestion de profils</h1>
      <PasswordGenerator />
      <CreateUser />
      {/*<UsersTable />
      <GetUserById />
      <UpdateUser />
      <DeleteUser />*/}
    </>
  )
}

export default App;
