import {useState, useContext} from "react";
import { UserContext } from "./context/user";

function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState("")
   

    const { user, setUser } = useContext(UserContext)

    console.log(user)

    function handleLoginSubmit(e){
        e.preventDefault()
    
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "username": username,
                "password": password
            })
        })
        .then(r=>{
            if(r.ok){
                r.json().then(setUser)
            } else {
                r.json().then(e => setErrors(e.error))
            }
        })
    }

    function handleLogout(){
        fetch("/logout",{
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
        setUser(null)
    }

    function handleSignup(e){
        e.preventDefault()
        const user = {
            username,
            password
        }
        fetch("/users",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        .then(r=>{
            if(r.ok){
                r.json().then(setUser)
            } else {
                r.json().then(e => setErrors(e.errors[0]))
            }
        })
    }

    return (
        <div>
            {!user? <h2>Wahoo! Time to login!</h2>: <h2>Wahoo! You're logged in!</h2>}
            <form onSubmit={handleLoginSubmit}>
                <label>Username:</label>
                    <input type="text" name="username" value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="type here..."/>
                <label>Password:</label>
                    <input type="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="type here..."/>
                <input type="submit" name="login_btn"/>
                <input type="button" name="logout_btn" onClick={handleLogout} value="Logout"/>
                <input type="button" name="signup_btn" value="Signup" onClick={handleSignup}/>
            </form>
            {errors ? <div><h4>Error!</h4>{Object.keys(errors).map(key => <h4>{key}: {errors[key]}</h4>)}</div> : null}
        </div>
    )
}


export default Login