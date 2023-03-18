import React, {useEffect, useState} from "react";

const UserContext = React.createContext();

 function UserProvider({ children }){
    const [user, setUser] = useState(null)
    const [myHikes, setMyHikes] = useState(null)
    const [myTrails, setMyTrails] = useState(null)
    useEffect(()=>{
        fetch("/api/me").then((r)=>{
            if(r.ok){
                r.json().then(u=>{setUser(u); setMyHikes(u.hikes)})
            }else {
                // r.json().then(e=>console.log(e))
                setUser(null)
            }
        })
    },[])
    console.log(user ? user : null)
    return (
        <UserContext.Provider value={{user, setUser, myHikes, setMyHikes}}>
            {children}
        </UserContext.Provider>
    );
 }

 export { UserContext, UserProvider };