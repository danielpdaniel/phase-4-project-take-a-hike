import { useState, useContext, useEffect } from "react";
import { UserContext } from "./context/user";

function HikeForm(props){

    const { user, myHikes, setMyHikes } = useContext(UserContext)
    const [trails, setTrails] = useState()
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

    function handleHikePostSubmit(e){
        e.preventDefault()
        const postBody = {
            user_id: user.id,
            trail_id: trailId,
            rating: rating,
            notes: notes,
            image: image,
            date: date

        }

        fetch("/api/hikes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postBody)
        })
        .then(r=>{
            if(r.ok){
                r.json().then(data=>setMyHikes([...myHikes, data]))
                setErrors("")
                setTrailId("")
                setRating("")
                setDate("")
                setImage("")
                setNotes("")
            }else {
                r.json().then(data=> setErrors(data.errors[0]))
            }
        })

    }

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
        const selectedTrail = e.target.value === "Select Trail..." ? "" : trails.filter(trail => trail.name === e.target.value)[0].id
        setTrailId(selectedTrail)
    }

    function handleRatingClick(e){
        setRating(e.target.id)
    }


    return (
        <div className="hikeCard">
            <h3>{props.heading}</h3>
            <form className="newHikeForm" onSubmit={(e)=>props.hikeEdit ? handleHikeEdit(e) : handleHikePostSubmit(e)}>
                <label>Trail:</label>
                    <select onChange={(e)=>handleTrailChange(e)} value={trails ? trailId ? trails.filter(trail => trail.id === trailId)[0].name : "" : ""}>
                        <option>Select Trail...</option>
                        {trails ? trails.map(trail => <option key={trail.name}>{trail.name}</option>) : <option>loading...</option>}
                    </select>

                <label>Rating:</label>
                <label htmlFor={1}>{rating >= 1 ? "★" : "☆"}</label>
                <label htmlFor={2}>{rating >= 2 ? "★" : "☆"}</label>
                <label htmlFor={3}>{rating >= 3 ? "★" : "☆"}</label>
                <label htmlFor={4}>{rating >= 4 ? "★" : "☆"}</label>
                <label htmlFor={5}>{rating >= 5 ? "★" : "☆"}</label>
                    <input id={1} className={rating >= 1 ? "clickedRating" : "unClickedRating"} type="radio" checked={rating >= 1 ? true : false} onClick={handleRatingClick} readOnly={true}/>
                    <input id={2} className={rating >= 2 ? "clickedRating" : "unClickedRating"} type="radio" checked={rating >= 2 ? true : false} onClick={handleRatingClick} readOnly={true}/>
                    <input id={3} className={rating >= 3 ? "clickedRating" : "unClickedRating"} type="radio" checked={rating >= 3 ? true : false} onClick={handleRatingClick} readOnly={true}/>
                    <input id={4} className={rating >= 4 ? "clickedRating" : "unClickedRating"} type="radio" checked={rating >= 4 ? true : false} onClick={handleRatingClick} readOnly={true}/>
                    <input id={5} className={rating >= 5 ? "clickedRating" : "unClickedRating"} type="radio" checked={rating >= 5 ? true : false} onClick={handleRatingClick} readOnly={true}/>

                <label>Notes:</label>
                    <textarea onChange={(e)=>setNotes(e.target.value)} value={notes} placeholder="Tell us about your hike :)"/>

                <label>Image:</label>
                    <input type="text" onChange={(e)=>setImage(e.target.value)} value={image} placeholder="Provide an image link from your hike!"/>
                
                <label>Date:</label>
                    <input type="date" onChange={(e)=>setDate(e.target.value)} value={date}/>

                    <input type="submit" value="Submit"/>
                    {props.hikeEdit ? <button onClick={()=>props.setHikeToEdit("")}>Cancel</button> : null}

            </form>
            {errors ? 
            <div>
                <h4>Error!</h4>
                {Object.keys(errors).map(key => 
                <h4 key={key+errors[key]}>
                    {key}: {errors[key].length > 1 ? errors[key].map(error => error === errors[key][errors[key].length - 1] ? error : `${error}, `) : errors[key] }
                </h4>)}
            </div> : null}
        </div>
    )
}

export default HikeForm
