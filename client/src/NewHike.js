import { useState, useContext, useEffect } from "react";
import { UserContext } from "./context/user";

function NewHike(){

    const { user } = useContext(UserContext)
    const [trails, setTrails] = useState("")
    const [trailId, setTrailId] = useState("")
    const [rating, setRating] = useState("")
    const [notes, setNotes] = useState("")
    const [image, setImage] = useState("")
    const [date, setDate] = useState("")

    useEffect(()=>{
        fetch("/trails")
        .then(r=>r.json())
        .then(data => setTrails(data))
    }, [])

    function handleHikePostSubmit(e){
        e.preventDefault()
        const postBody = {
            user_id: user.id,
            trail_id: trailId,
            rating: rating

        }
        console.log(postBody)

    }

    function handleTrailChange(e){
        const selectedTrail = trails.filter(trail => trail.name === e.target.value)[0]
        setTrailId(selectedTrail.id)
    }

    function handleRatingClick(e){
        setRating(e.target.id)
    }
    console.log(rating)

    return (
        <div>
            <h3>Add New Hike!</h3>
            <form className="newHikeForm" onSubmit={(e)=>handleHikePostSubmit(e)}>
                <label>Trail:</label>
                    <select onChange={(e)=>handleTrailChange(e)}>
                        {trails ? trails.map(trail => <option key={trail.name}>{trail.name}</option>) : <option>loading...</option>}
                    </select>
                    <label>Rating:</label>
                    <input id={1} type="radio" checked={rating >= 1 ? true : false} onClick={(e)=>handleRatingClick(e)}/>
                    <input id={2} type="radio" checked={rating >= 2 ? true : false} onClick={(e)=>handleRatingClick(e)}/>
                    <input id={3} type="radio" checked={rating >= 3 ? true : false} onClick={(e)=>handleRatingClick(e)}/>
                    <input id={4} type="radio" checked={rating >= 4 ? true : false} onClick={(e)=>handleRatingClick(e)}/>
                    <input id={5} type="radio" checked={rating >= 5 ? true : false} onClick={(e)=>handleRatingClick(e)}/>
                    
                    <input type="submit"/>
            </form>
        </div>
    )
}

export default NewHike
