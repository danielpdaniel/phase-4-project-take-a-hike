import { useContext, useEffect, useState } from "react";
import { UserContext } from "./context/user";
import { useParams } from "react-router-dom";

function User(){
    const [pageUser, setPageUser] = useState('')
    const [errors, setErrors] = useState('')
    const [profileLoginStatus, setProfileLoginStatus] = useState(false)
    const {user} = useContext(UserContext)
    console.log(user)
    
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
    },[])
    return(
        <div>
            {pageUser ?
                profileLoginStatus ? <h2>Yahoo! Welcome, {pageUser.username}!</h2> : <h2>Wahoo! it's {pageUser.username}</h2>
                :
                <h2>Error: {errors} :(</h2>
            }
            <img src={user.avatar_image} class="user_profile_avatar"/>
            <h4>About: {user.about}</h4>
        </div>
    )
}

export default User