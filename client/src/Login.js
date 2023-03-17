import {useState, useContext} from "react";
import { UserContext } from "./context/user";
import { useNavigate } from "react-router-dom";

function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState("")

    const navigate = useNavigate()
   

    const { user, setUser } = useContext(UserContext)

    function handleLoginSubmit(e){
        e.preventDefault()
    
        fetch("/api/sessions", {
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
                setUsername("")
                setPassword("")
                navigate("/")
            } else {
                r.json().then(e => setErrors(e.error))
            }
        })
    }

    function handleLogout(){
        fetch("/api/sessions",{
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
            password,
            avatar_image: "https://i.postimg.cc/mknKLgV0/take-a-hike-default-avatar-copy.png"
        }
        fetch("/api/users",{
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
            {!user ? <form onSubmit={handleLoginSubmit} className="loginForm">
                <label>Username: </label>
                    <input type="text" name="username" value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="type here..."/>
                <label>Password: </label>
                    <input type="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="type here..."/>
                {!user? 
                <div>
                <input type="submit" name="login_btn" value="Login"/>
                <input type="button" name="signup_btn" value="Signup" onClick={handleSignup}/>
                </div>
                :
                <div>
                <button onClick={handleLogout}>Logout</button>
                </div>}
            </form> : null}

            {errors ? <div><h4>Error!</h4>{Object.keys(errors).map(key => <h4 key={key+errors[key]}>{key}: {errors[key]}</h4>)}</div> : null}
        </div>
    )
}


export default Login