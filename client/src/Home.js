import React from "react";
import { useContext } from "react";
import { UserContext } from "./context/user";
import NewHike from "./NewHike";

function Home(){

    const { user } = useContext(UserContext)
    return (
        <div>
            <h2>Welcome to take a hike!!!</h2>
            {user ? <NewHike /> : <h3>Log In/Signup To Start Hiking!</h3>}
        </div>
    )
}

export default Home