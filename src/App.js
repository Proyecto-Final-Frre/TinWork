import logo from "./logo.svg";
import "./App.css";

import { authentication, getUsers, logOut } from "./config/firebase";

const users = async () => {
  const users = await getUsers();
  console.log(users);
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

      <div>
        <button onClick={() => authentication()}>Iniciar</button>
        <button onClick={() => users()}>Obtener Usuarios</button>
        <button onClick={() => logOut()}>Cerrar Sesion</button>
      </div>
    </div>
  );
}

export default App;
