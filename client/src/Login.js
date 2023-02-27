import React, {useState} from "react";

function Login() {
    const [usernameInput, setUsernameInput] = useState("")
    const [passwordInput, setPasswordInput] = useState("")

    function handleLoginSubmit(e){
        e.preventDefault()
        console.log(usernameInput, passwordInput)
    }

    return (
        <div>
            <h2>Wahoo! Time to login!</h2>
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