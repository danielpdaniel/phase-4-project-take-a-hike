import React from "react";
import { useContext } from "react";
import { UserContext } from "./context/user";
import HikeForm from "./HikeForm";

function Home(){

    const { user } = useContext(UserContext)
    return (
        <div className>
            <h2>Welcome to take a hike!!!</h2>
            {user ? <HikeForm heading="Add New Hike!"/> : <h3>Log In/Signup To Start Hiking!</h3>}
        </div>
    )
}

export default Home