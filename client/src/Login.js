import {useState, useContext} from "react";
import { UserContext } from "./context/user";
import { useNavigate } from "react-router-dom";
import avatar from "./take_a_hike_default_avatar.png"

function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState("")

    const navigate = useNavigate()
   

    const { user, setUser } = useContext(UserContext)

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
                setUsername("")
                setPassword("")
                navigate("/")
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
            password,
            avatar_image: "data:image/png;base64,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"
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