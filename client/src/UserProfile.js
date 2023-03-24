import { useContext, useEffect, useState } from "react";
import { UserContext } from "./context/user";
import { useParams, useNavigate } from "react-router-dom";
import Profile from "./Profile";

function UserProfile(){
    const [pageUser, setPageUser] = useState('')
    const [errors, setErrors] = useState('')
    const {user} = useContext(UserContext)
    const [mappedTrails, setMappedTrails] = useState([])

    const navigate = useNavigate()

    const [hikes, setHikes] = useState("")
    
    const params = useParams();

    useEffect(()=>{
        const userId = user ? user.id : null

            if(parseInt(params.id, 10) !== userId){
                fetch(`/api/users/${params.id}`)
                    .then(r=>{
                        if(r.ok){
                            r.json().then(u=>{
                                setPageUser(u)
                                setHikes(u.hikes)
                                const arr = []
                                u.trails.map(trail => arr.find(arrTrail => arrTrail.id === trail.id) ? null : arr.push(trail))
                                setMappedTrails(arr)
                                    
                            })
                        }else{
                            r.json().then(e => setErrors(e.error))
                        }
                    })}else{
                        navigate("/my_profile")
                    }
    },[user, params.id, navigate])

    return(

        errors ? 
            <h4>{errors}</h4>
        :
        <Profile 
        pageUser={pageUser}
        setPageUser={setPageUser}
        profileLoginStatus={false}
        mappedTrails={mappedTrails}
        setMappedTrails={setMappedTrails}
        hikes={hikes}
        setHikes={setHikes}
        />
    )
}

export default UserProfile