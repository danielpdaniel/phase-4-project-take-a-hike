import React, {useEffect, useState} from "react";

const UserContext = React.createContext();

 function UserProvider({ children }){
    const [user, setUser] = useState(null)
    useEffect(()=>{
        fetch("/api/me").then((r)=>{
            if(r.ok){
                r.json().then(u=>{setUser(u); console.log(u)})
            }else {
                // r.json().then(e=>console.log(e))
                setUser(null)
            }
        })
    },[])
    console.log(user ? user.trails : "not user yet")
    
    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    );
 }

 export { UserContext, UserProvider };