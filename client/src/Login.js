import React, {useState, useContext} from "react";
import { UserContext } from "./context/user";

function Login({ onLogin }) {
    const [usernameInput, setUsernameInput] = useState("")
    const [passwordInput, setPasswordInput] = useState("")

    const user = useContext(UserContext)

    function handleLoginSubmit(e){
        e.preventDefault()
        console.log(usernameInput, passwordInput)
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "username": usernameInput,
                "password": passwordInput
            })
        })
        .then((r) => r.json())
        .then(user => onLogin(user))
    }

    return (
        <div>
            {!user? <h2>Wahoo! Time to login!</h2>: <h2>Wahoo! You're logged in!</h2>}
            <form onSubmit={handleLoginSubmit}>
                <label>Username:</label>
                    <input type="text" name="username" value={usernameInput} onChange={(e)=>setUsernameInput(e.target.value)} placeholder="type here..."/>
                <label>Password:</label>
                    <input type="text" name="password" value={passwordInput} onChange={(e)=>setPasswordInput(e.target.value)} placeholder="type here..."/>
                <input type="submit" name="login_btn"/>
            </form>
        </div>
    )
}


export default Login