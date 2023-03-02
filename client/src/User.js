import { useContext, useEffect, useState } from "react";
import { UserContext } from "./context/user";
import { useParams } from "react-router-dom";

function User(){
    const [pageUser, setPageUser] = useState('')
    const [errors, setErrors] = useState('')
    const [profileLoginStatus, setProfileLoginStatus] = useState(false)
    const {user} = useContext(UserContext)
    
    const params = useParams();

    useEffect(()=>{
        if(user){
            if(user.id === parseInt(params.id, 10)){
                setProfileLoginStatus(true)     
                console.log(profileLoginStatus)       
            }
        }
    },[])

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
        </div>
    )
}

export default User