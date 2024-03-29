import { useState } from "react";
import HikeForm from "./HikeForm";
import MyProfileEdit from "./MyProfileEdit";

function Profile({pageUser, setPageUser, profileLoginStatus, mappedTrails, hikes, setHikes, updateHikeState, handleDeleteClick}){
    const [userEditStatus, setUserEditStatus] = useState(false)
    const [hikeToEdit, setHikeToEdit] = useState("")

    return(

        <div>
            {userEditStatus ? <MyProfileEdit pageUser={pageUser} about={pageUser.about} setPageUser={setPageUser} setUserEditStatus={setUserEditStatus}/> : 
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
                            hikes.map(hike => 
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
                                        {<h5>{hike.name}</h5>}
                                        <img src={hike.image} className="userHikeImage" alt="hike"/>
                                         <p>{hike.date}</p>
                                         <p>{hike.rating >= 1 ? "★" : "☆"}{hike.rating >= 2 ? "★" : "☆"}{hike.rating >= 3 ? "★" : "☆"}{hike.rating >= 4 ? "★" : "☆"}{hike.rating >= 5 ? "★" : "☆"}</p>
                                         <p>{hike.notes}</p>
                                         {profileLoginStatus ? 
                                            <div>
                                                <button onClick={()=>setHikeToEdit(hike.id)}>Edit</button>
                                                <button onClick={()=>handleDeleteClick(hike.id)}>Delete</button>
                                            </div>
                                            : null}
                                    </div>)
                        : 
                            <h5>This user's ready to take a hike! :)</h5>}
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
                <h2>Loading...</h2>
            }
        </div>
    )
}

export default Profile