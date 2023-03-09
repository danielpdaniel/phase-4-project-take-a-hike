import { useContext, useEffect, useState } from "react";
import { UserContext } from "./context/user";
import { useParams } from "react-router-dom";
import EditHike from "./EditHike";

function User(){
    const [pageUser, setPageUser] = useState('')
    const [errors, setErrors] = useState('')
    const [profileLoginStatus, setProfileLoginStatus] = useState(false)
    const {user} = useContext(UserContext)

    const [hikes, setHikes] = useState("")
    const [hikeToEdit, setHikeToEdit] = useState("")
    
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
                r.json().then(user=>{
                    setPageUser(user)
                    setHikes(user.hikes)
                })
            }else{
                r.json().then(e=>setErrors(e.error))
            }
        })
    },[params, params.id])

    function updateHikeState(hikeData){
        const filteredHikes = hikes.filter(hike => hike.id !== hikeData.id)
        setHikes([...filteredHikes, hikeData])
    }

    return(
        <div>
            {pageUser ?
            <div>
                <h2>{profileLoginStatus ? `Yahoo! Welcome, ${pageUser.username}` : `Wahoo! It's ${pageUser.username}`}</h2>
                <img src={pageUser.avatar_image} className="myAvatar" alt={`${pageUser.username} avatar`}/>
                <div className="myAbout">
                    <h4>About:</h4>
                    <h5>{pageUser.about}</h5>
                </div>
                <div className="myHikes">
                    <h4>My Hikes:</h4>
                        {hikes ? hikes.map(hike => hikeToEdit === hike.id ?
                                <EditHike key={"hike"+hike.id} 
                                    trailId={hike.trail_id} 
                                    rating={hike.rating} 
                                    notes={hike.notes} 
                                    image={hike.image} 
                                    date={hike.date} 
                                    hikeId={hike.id} 
                                    setHikeToEdit={setHikeToEdit} 
                                    updateHikeState={updateHikeState}/>
                                : 
                                <div key={"hike"+hike.id}>
                                    <h5>{pageUser.trails.filter(trail => hike.trail_id === trail.id)[0].name}:</h5>
                                    {profileLoginStatus ? <div><button onClick={()=>setHikeToEdit(hike.id)}>Edit</button><button>Delete</button></div>: null}
                                    <p>{hike.notes}</p>
                                </div>)
                            : <h5>Loading...</h5>}
                </div>
                <div className="myTrails">
                    <h4>My Trails:</h4>
                        {pageUser.trails.map(trail => 
                        <div key={"trail"+trail.id}>
                            <h5>{trail.name}</h5>
                        </div>)}
                </div>
            </div>
                :
                <h2>Error: {errors} :(</h2>
            }
        </div>
    )
}

export default User