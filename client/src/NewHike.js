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
        console.log(user)

    }
    return (
        <div>
            <h3>Add New Hike!</h3>
            <form className="newHikeForm" onSubmit={(e)=>handleHikePostSubmit(e)}>
                <select>
                    {trails ? trails.map(trail => <option>{trail.name}</option>) : <option>loading...</option>}
                </select>
            </form>
        </div>
    )
}

export default NewHike
