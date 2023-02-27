import React, {useState} from "react";

function Login() {
    

    return (
        <div>
            <h2>Wahoo! Time to login!</h2>
            <form>
                <label>Username:</label>
                    <input type="text" name="username"/>
                <label>Password:</label>
                    <input type="text" name="password"/>
                <input type="submit" name="login_btn"/>
            </form>
        </div>
    )
}


export default Login