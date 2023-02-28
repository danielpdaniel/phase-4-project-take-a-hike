import react, { useContext} from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "./context/user";

function NavBar(){
    const { user } = useContext(UserContext)
    return(
        <div>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/login">{user ? "AH" : "Login"}</NavLink>
        </div>
    )
}

export default NavBar