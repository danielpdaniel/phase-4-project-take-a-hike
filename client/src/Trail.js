import {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";

function Trail(){
    const [trail, setTrail] = useState("")
    const [users, setUsers] = useState("")
    const params = useParams()

    useEffect(()=>{
        fetch(`/trails/${params.id}`)
        .then(r=>{
            if(r.ok){
               r.json().then(data => {
                setTrail(data)
                const arr = []
                data.users.map(u => arr.find(arrUser => arrUser.id === u.id) ? null : arr.push(u))
                setUsers(arr)
            })
            }
        })
    },[params.id])
    return(
        <div className="hikeCard">
            {trail? 
                <div>
                    <h2>{trail.name}</h2> 
                    <img alt={trail.name} src={trail.image} className="trailImage"/>
                    <h3>Location:</h3>
                        <h4>{trail.location}</h4>
                    <h3>Description:</h3>
                        <h4>{trail.description}</h4>
                    <h3>Distance:</h3>
                        <h4>{trail.distance}</h4>
                    <h3>Intensity:</h3>
                        <h4>{trail.intensity}</h4>

                        <h2>Users who have visited this trail!</h2>
                        <ul>
                            {users ? 
                            users.map(user => 
                            <li key={`${user.username}Page`}>
                                <NavLink to={`/users/${user.id}`}>{user.username}
                                </NavLink>
                            </li>)
                            :
                            <li>Loading...</li>}
                        </ul>


                </div>
            :   <h2>Loading...</h2>}
        </div>
    )
}

export default Trail