import logo from './logo.svg';
import './App.css';
import "./Login";
import Login from './Login';
import {Route, Routes} from 'react-router-dom'
import React, {useState, useEffect} from 'react'
import { UserProvider } from "./context/user"


function App() {
  const [user, setUser] = useState(null)
  
 useEffect(()=>{
  fetch("/me").then(r=>r.json()).then(user=>setUser(user))
 }, [])
  
  return (
    <div className="App">
      <UserProvider>
      <Routes>
        <Route path="/login" element={<Login onLogin={(user)=>setUser(user)}/>}/>
      </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
