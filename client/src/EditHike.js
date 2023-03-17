import { useState, useContext, useEffect } from "react";
import { UserContext } from "./context/user";

function EditHike(props){

    const { user } = useContext(UserContext)
    const [trails, setTrails] = useState("")
    const [trailId, setTrailId] = useState(props.trailId)
    const [rating, setRating] = useState(props.rating)
    const [notes, setNotes] = useState(props.notes)
    const [image, setImage] = useState(props.image)
    const [date, setDate] = useState(props.date)

    const [errors, setErrors] = useState("")

    useEffect(()=>{
        fetch("/api/trails")
        .then(r=>r.json())
        .then(data => setTrails(data))
    }, [])

    function handleHikeEdit(e){
        e.preventDefault()
        const postBody = {
            user_id: user.id,
            trail_id: trailId,
            rating: rating,
            notes: notes,
            image: image,
            date: date

        }

        fetch(`/api/hikes/${props.hikeId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postBody)
        })
        .then(r=>{
            if(r.ok){
                r.json().then(data=>{
                    // console.log(data)
                    props.updateHikeState(data)
                })
                props.setHikeToEdit("")
            }else {
                r.json().then(data=> setErrors(data.errors[0]))
            }
        })

    }

    function handleTrailChange(e){
        const selectedTrail = trails.filter(trail => trail.name === e.target.value)[0]
        setTrailId(selectedTrail.id)
    }

    function handleRatingClick(e){
        setRating(e.target.id)
    }


    return (
        <div className="hikeCard">
            <h3>Add New Hike!</h3>
            <form  onSubmit={(e)=>handleHikeEdit(e)}>
                <label>Trail:</label>
                    <select onChange={(e)=>handleTrailChange(e)} value={trails ? trails.filter(trail => trail.id === trailId)[0].name : ""}>
                        <option>Select Trail...</option>
                        {trails ? trails.map(trail => <option key={trail.name}>{trail.name}</option>) : <option>loading...</option>}
                    </select>

                <label>Rating:</label>
                    <input id={1} className={rating >= 1 ? "clickedRating" : "unClickedRating"} type="radio" checked={rating >= 1 ? true : false} onClick={handleRatingClick} onChange={(e)=>console.log(e.target.value)}/>
                    <input id={2} className={rating >= 2 ? "clickedRating" : "unClickedRating"} type="radio" checked={rating >= 2 ? true : false} onClick={handleRatingClick} onChange={(e)=>console.log(e.target.value)}/>
                    <input id={3} className={rating >= 3 ? "clickedRating" : "unClickedRating"} type="radio" checked={rating >= 3 ? true : false} onClick={handleRatingClick} onChange={(e)=>console.log(e.target.value)}/>
                    <input id={4} className={rating >= 4 ? "clickedRating" : "unClickedRating"} type="radio" checked={rating >= 4 ? true : false} onClick={handleRatingClick} onChange={(e)=>console.log(e.target.value)}/>
                    <input id={5} className={rating >= 5 ? "clickedRating" : "unClickedRating"} type="radio" checked={rating >= 5 ? true : false} onClick={handleRatingClick} onChange={(e)=>console.log(e.target.value)}/>

                <label>Notes:</label>
                    <textarea onChange={(e)=>setNotes(e.target.value)} value={notes}/>

                <label>Image:</label>
                    <input type="text" onChange={(e)=>setImage(e.target.value)} value={image}/>
                
                <label>Date:</label>
                    <input type="date" onChange={(e)=>setDate(e.target.value)} value={date}/>
                <div>
                    <button onClick={()=>props.setHikeToEdit("")}>Cancel</button>
                    <input type="submit"/>
                    </div>

            </form>
            {errors ? <div><h4>Error!</h4>{Object.keys(errors).map(key => <h4 key={key+errors[key]}>{key}: {errors[key]}</h4>)}</div> : null}
        </div>
    )
}

export default EditHike