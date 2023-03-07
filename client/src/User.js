import { useContext, useEffect, useState } from "react";
import { UserContext } from "./context/user";
import { useParams } from "react-router-dom";

function User(){
    const [pageUser, setPageUser] = useState('')
    const [errors, setErrors] = useState('')
    const [profileLoginStatus, setProfileLoginStatus] = useState(false)
    const {user} = useContext(UserContext)
    
    const params = useParams();

    // const profileLoginStatus = user ? user.id === parseInt(params.id, 10) ? true : false : false;

    useEffect(()=>{
        if(user){
            if(user.id === parseInt(params.id, 10)){
                setProfileLoginStatus(true)
            }
        }
    
    },[user, params.id])

    useEffect(()=>{
        fetch(`/users/${params.id}`)
        .then(r=>{
            if(r.ok){
                r.json().then(user=>setPageUser(user))
            }else{
                r.json().then(e=>setErrors(e.error))
            }
        })
        
    },[params, params.id])
    return(
        <div>
            {pageUser ?
            <div>
                <h2>{profileLoginStatus ? `Yahoo! Welcome, ${pageUser.username}` : `Wahoo! It's ${pageUser.username}`}</h2>
                <img src={pageUser.avatar_image} className="user_profile_avatar" alt={`${pageUser.username} avatar`}/>
                <h4>About:</h4>
                <h5>{pageUser.about}</h5>
                <h4>My Hikes:</h4>
                    {pageUser.hikes.map(hike => 
                    <div key={"hike"+hike.id}>
                        <h5>{pageUser.trails.filter(trail => hike.trail_id === trail.id)[0].name}:</h5>
                        <p>{hike.notes}</p>
                    </div>)}
                <h4>My Trails:</h4>
                    {pageUser.trails.map(trail => 
                    <div key={"trail"+trail.id}>
                        <h5>{trail.name}</h5>
                    </div>)}
            </div>
                :
                <h2>Error: {errors} :(</h2>
            }
        </div>
    )
}

export default User