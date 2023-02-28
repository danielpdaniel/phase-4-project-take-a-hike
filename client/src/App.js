import logo from './logo.svg';
import './App.css';
import "./Login";
import Login from './Login';
import {Route, Routes} from 'react-router-dom'
import React, {useState} from 'react'


function App() {
  const [user, setUser] = useState("")
 
  
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login onLogin={(user)=>setUser(user)}/>}/>
      </Routes>
    </div>
  );
}

export default App;
