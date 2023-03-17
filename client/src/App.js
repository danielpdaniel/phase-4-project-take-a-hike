
import './App.css';
import "./Login";
import Login from './Login';
import {Route, Routes} from 'react-router-dom'
import React from 'react'
import { UserProvider } from "./context/user"
import NavBar from './NavBar';
import Home from './Home';
import User from './User';
import Trails from './Trails';
import Trail from './Trail';
import MyProfile from './MyProfile';


function App() {
  
  return (
    <div className="App">
      <UserProvider>
        <NavBar />
      <Routes>
        <Route path ="/me" element={<MyProfile />}/>
        <Route path="/trails" element={<Trails/>}/>
        <Route path="/trails/:id" element={<Trail/>}/>
        <Route path="/users/:id" element={<User/>}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/" element={<Home/>}/>
      </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
