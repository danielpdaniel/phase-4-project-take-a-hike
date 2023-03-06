import react, { useContext} from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "./context/user";
import logo from "./take_a_hike_logo.png"

function NavBar(){
    const { user } = useContext(UserContext)
    return(
        <nav className="navbar">
            <NavLink to="/"><img src={logo} id="logo"/></NavLink>
            <NavLink to="/">Home</NavLink>
            {user ? <NavLink to={`/users/${user.id}`}>My Page</NavLink>: null}
            <NavLink to="/login">{user ? "AH" : "Login"}</NavLink>
        </nav>
    )
}

export default NavBar