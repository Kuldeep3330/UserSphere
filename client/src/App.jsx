import { useState } from 'react';
import './App.css'
import Register from './components/Register'
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Upload from './components/Upload';
import Users from './components/Users';

function App() {
const [loggedIn, setLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  return (
    <div style={{ padding: 20 }}>
      <h1>MERN Mini Project</h1>

      {!loggedIn ? (
        <>
          <Register />
          <Login onLogin={() => setLoggedIn(true)} />
        </>
      ) : (
        <>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              setLoggedIn(false);
            }}
          >
            Logout
          </button>
          <Dashboard/>
          <Upload/>
          <Users/>
          </>)}
    </div>
  )
}

export default App
