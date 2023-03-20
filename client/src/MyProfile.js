import { useContext, useEffect, useState } from "react";
import { UserContext } from "./context/user";
import Profile from "./Profile";

function MyProfile(){
    const [pageUser, setPageUser] = useState('')
    const {user, myHikes, setMyHikes} = useContext(UserContext)
    const [mappedTrails, setMappedTrails] = useState([])

    useEffect(()=>{
       if(user){
        setPageUser(user)
        // setHikes(user.hikes)
        const arr = []
        // if(user.trails)
        if (user.trails){
        user.trails.map(trail => arr.find(arrTrail => arrTrail.id === trail.id) ? null : arr.push(trail))
        setMappedTrails(arr)
        }
       }
    }, [user])

    function updateHikeState(hikeData){
        const filteredHikes = myHikes.filter(hike => hike.id !== hikeData.id)
        setMyHikes([...filteredHikes, hikeData])
    }

    function handleDeleteClick(hikeId){
        fetch(`/api/hikes/${hikeId}`,{
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(r=>{
            if(r.ok){
                const filteredHikes = myHikes.filter(hike => hike.id !== hikeId)
                setMyHikes(filteredHikes)
                const trailsArr = []
                mappedTrails.map(trail => filteredHikes.find(hike => hike.trail_id === trail.id) ? trailsArr.push(trail) : null)
                setMappedTrails(trailsArr)
            }
        })
    }

    return(
        user ?
       <Profile 
        pageUser={pageUser}
        setPageUser={setPageUser}
        profileLoginStatus={true}
        mappedTrails={mappedTrails}
        hikes={myHikes}
        setHikes={setMyHikes}
        handleDeleteClick={handleDeleteClick}
        updateHikeState={updateHikeState}
        />
        :
        <h2>Login/Signup to start hiking!</h2>
       
    )
}

export default MyProfile