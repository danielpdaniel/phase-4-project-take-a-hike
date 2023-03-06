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
    },[user])

    useEffect(()=>{
        fetch(`/users/${params.id}`)
        .then(r=>{
            if(r.ok){
                r.json().then(user=>setPageUser(user))
            }else{
                r.json().then(e=>setErrors(e.error))
            }
        })
    },[params])
    return(
        <div>
            {pageUser ?
            <div>
                <h2>{profileLoginStatus ? `Yahoo! Welcome, ${pageUser.username}` : `Wahoo! It's ${pageUser.username}`}</h2>
                <img src={pageUser.avatar_image} className="user_profile_avatar"/>
                <h4>About:</h4>
                <h5>{pageUser.about}</h5>
                </div>
                :
                <h2>Error: {errors} :(</h2>
            }
        </div>
    )
}

export default User