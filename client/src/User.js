import { useContext, useEffect, useState } from "react";
import { UserContext } from "./context/user";
import { useParams } from "react-router-dom";

function User(){
    const [pageUser, setPageUser] = useState('')
    
    const params = useParams();
    useEffect(()=>{
        fetch(`/users/${params.id}`)
        .then(r=>r.json())
        .then(user=>{
            if (user.ok){
            setPageUser(user)
            }else{
                setPageUser("")
                console.log(user)
            }
        })
    },[])
    return(
        <div>
            {pageUser ?
                <h2>Wahoo! Welcome, {pageUser.username}</h2>
                :
                <h2>User not found :(</h2>
            }
        </div>
    )
}

export default User