import { useContext, useEffect, useState } from "react";
import { UserContext } from "./context/user";
import { useParams } from "react-router-dom";
// import EditHike from "./EditHike";
import HikeForm from "./HikeForm";
import UserEdit from "./UserEdit";

function User(){
    const [pageUser, setPageUser] = useState('')
    const [errors, setErrors] = useState('')
    const [profileLoginStatus, setProfileLoginStatus] = useState(false)
    const [userEditStatus, setUserEditStatus] = useState(false)
    const {user} = useContext(UserContext)
    const [mappedTrails, setMappedTrails] = useState([])

    const [hikes, setHikes] = useState("")
    const [hikeToEdit, setHikeToEdit] = useState("")
    
    const params = useParams();

    // const profileLoginStatus = user ? user.id === parseInt(params.id, 10) ? true : false : false;

    useEffect(()=>{
        if(user){
            if(user.id === parseInt(params.id, 10)){
                setProfileLoginStatus(true)
                setPageUser(user)
                setHikes(user.hikes)
                const arr = []
                user.trails.map(trail => arr.find(arrTrail => arrTrail.id === trail.id) ? null : arr.push(trail))
                setMappedTrails(arr)
            }
        }else{
            fetch(`/api/users/${params.id}`)
                    .then(r=>{
                        if(r.ok){
                            r.json().then(user=>{
                                setPageUser(user)
                                setHikes(user.hikes)
                                const arr = []
                                user.trails.map(trail => arr.find(arrTrail => arrTrail.id === trail.id) ? null : arr.push(trail))
                                setMappedTrails(arr)
                                    
                            })
                        }else{
                            r.json().then(e=>setErrors(e.error))
                        }
                    })
        }
    },[user, params.id])

    function updateHikeState(hikeData){
        const filteredHikes = hikes.filter(hike => hike.id !== hikeData.id)
        setHikes([...filteredHikes, hikeData])
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
                const filteredHikes = hikes.filter(hike => hike.id !== hikeId)
                setHikes(filteredHikes)
                const trailsArr = []
                mappedTrails.map(trail => filteredHikes.find(hike => hike.trail_id === trail.id) ? trailsArr.push(trail) : null)
                setMappedTrails(trailsArr)
            }else{
                r.json().then(data => setErrors(data))
            }
        })
    }

    return(

        <div>
            {userEditStatus ? <UserEdit pageUser={pageUser} about={pageUser.about} setPageUser={setPageUser} setUserEditStatus={setUserEditStatus}/> : 
            <div>
                <h2>{profileLoginStatus ? `Yahoo! Welcome, ${pageUser.username}` : `Wahoo! It's ${pageUser.username}`}</h2>
                <img src={pageUser.avatar_image} className="myAvatar" alt={`${pageUser.username} avatar`}/>
                <div className="myAbout">
                    <h4>About:</h4>
                    <h5>{pageUser.about}</h5>
                </div>
            </div>}
            {profileLoginStatus ? <button onClick={() => setUserEditStatus(!userEditStatus)}>{userEditStatus? "Cancel" : "Edit Profile"}</button> : null}
            {pageUser ?
            <div>
                
                <div className="myHikes">
                    <h4>My Hikes:</h4>
                        {hikes ? 
                            hikes.sort((a,b)=> new Date(b.date) - new Date(a.date)).map(hike => 
                                hikeToEdit === hike.id ?
                                    <HikeForm key={"hike"+hike.id} 
                                        heading="Edit Hike:"
                                        trailId={hike.trail_id} 
                                        rating={hike.rating} 
                                        notes={hike.notes} 
                                        image={hike.image} 
                                        date={hike.date} 
                                        hikeId={hike.id} 
                                        setHikeToEdit={setHikeToEdit} 
                                        updateHikeState={updateHikeState}
                                        hikeEdit={true}/>
                                : 
                                    <div key={"hike"+hike.id} className="hikeCard">
                                        <h5>{pageUser.trails.find(trail => trail.id === hike.trail_id) ? pageUser.trails.find(trail => trail.id === hike.trail_id)["name"] : null}</h5>
                                        <img src={hike.image} className="userHikeImage" alt="hike"/>
                                         <p>{hike.date}</p>
                                         <p>{hike.notes}</p>
                                         {profileLoginStatus ? 
                                            <div>
                                                <button onClick={()=>setHikeToEdit(hike.id)}>Edit</button>
                                                <button onClick={()=>handleDeleteClick(hike.id)}>Delete</button>
                                            </div>
                                            : null}
                                    </div>)
                        : 
                            <h5>Loading...</h5>}
                </div>

                <div className="myTrails">
                    <h4>My Trails:</h4>
                        {mappedTrails.map(trail => 
                        
                            <div key={"trail"+trail.id}>
                                <h5>{trail.name}</h5>
                            </div>
                        
                        )}
                </div>
            </div>
                :
                <h2>Error: {errors} :(</h2>
            }
        </div>
    )
}

export default User