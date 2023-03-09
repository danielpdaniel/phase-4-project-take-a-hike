import { useContext} from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "./context/user";
import logo from "./take_a_hike_logo.png"

function NavBar(){
    const { user, setUser } = useContext(UserContext)

    function handleLogout(){
        fetch("/logout",{
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
        setUser(null)
    }

    return(
        <nav className="navbar">
            <NavLink to="/" className="neverActive"><img src={logo} id="logo" alt="take a hike smiling sun with shades"/></NavLink>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/trails">Trails</NavLink>
            {user ? <NavLink to={`/users/${user.id}`}>My Page</NavLink>: null}
            {user ? <button onClick={()=>handleLogout()}>Logout</button>: <NavLink to="/login">Login</NavLink>}
        </nav>
    )
}

export default NavBar