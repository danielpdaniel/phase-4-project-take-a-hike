import { useState, useEffect } from "react"

import { NavLink } from "react-router-dom";

function Trails(){
    const [trails, setTrails] = useState("")
    const [errors, setErrors] = useState("")
    const [name, setName] = useState("")
    const [location, setLocation] = useState("")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState("")
    const [distance, setDistance] = useState("")
    const [intensity, setIntensity] = useState("")

    useEffect(()=>{
        fetch("/api/trails")
        .then(r=>r.json())
        .then(data => setTrails(data))
    }, [])

    function handleSubmit(e){
        e.preventDefault()

        const postBody = {
            name: name,
            location: location,
            description: description,
            image: image,
            distance: distance,
            intensity: intensity
        }
        fetch("/api/trails", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postBody)
        })
        .then(r => {
            if(r.ok){
                r.json().then(data => {
                    setTrails([...trails, data])
                    setName("")
                    setLocation("")
                    setDescription("")
                    setImage("")
                    setDistance("")
                    setIntensity("")
                })
            }else{
                r.json().then(e => setErrors(e.errors))
            }
        })
    }
  
    return(
        <div>
            <h2>All Trails:</h2>
            <ul>
            {trails ? trails.map(trail=><li key={trail.id}><NavLink to={`/trails/${trail.id}`}>{trail.name}</NavLink></li>): <li>Loading...</li>}
            </ul>
        <div>
            <h2>Add New Trail:</h2>
            <form className="newTrailForm" onSubmit={(e)=>handleSubmit(e)}>
                <label htmlFor="name">Name: </label>
                    <input name="name" type="text" onChange={(e)=>setName(e.target.value)} value={name}/>
                <label htmlFor="location">Location: </label>
                    <input name="location" type="text" onChange={(e)=>setLocation(e.target.value)} value={location}/>
                <label htmlFor="description">Description: </label>
                    <textarea name="description" onChange={(e)=>setDescription(e.target.value)} value={description}/>
                <label htmlFor="imageLink">Image link: </label>
                    <input name="imageLink" type="text" onChange={(e)=>setImage(e.target.value)} value={image}/>
                <label htmlFor="distance">Distance (miles): </label>
                    <input name="distance" type="text" onChange={(e)=>setDistance(e.target.value)} value={distance}/>
                <label htmlFor="intensity">Intensity (out of 10): </label>
                    <input name="intensity" type="text" onChange={(e)=>setIntensity(e.target.value)} value={intensity}/>
                    <input type="submit"/>
            </form>
        </div>
            {errors ? 
            <div>
                <h3>Error!</h3>
                    <ul>{errors.map(error => 
                        <li key={error}>{error}</li>)}
                    </ul>
            </div>
                : 
                null}
        </div>
    )
}

export default Trails