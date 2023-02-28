import logo from './logo.svg';
import './App.css';
import "./Login";
import Login from './Login';
import {Route, Routes} from 'react-router-dom'
import React, {useState, useEffect} from 'react'
import { UserProvider } from "./context/user"
import NavBar from './NavBar';
import Home from './Home';


function App() {
//   const [user, setUser] = useState(null)
  
//  useEffect(()=>{
//   fetch("/me").then(r=>r.json()).then(user=>setUser(user))
//  }, [])
  
  return (
    <div className="App">
      <UserProvider>
        <NavBar />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login />}/>
      </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
