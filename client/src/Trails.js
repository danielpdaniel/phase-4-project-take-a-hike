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
        fetch("/trails")
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
        fetch("/trails", {
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
                r.json().then(data=>setErrors(data.errors))
            }
        })
    }
  
    return(
        <div>
            {/* <ul>
                {trails ? trails.map(trail=><li key={trail.id}>{trail.name}</li>): <li>Loading...</li>}
            </ul> */}
            <ul>
            {trails ? trails.map(trail=><li key={trail.id}><NavLink to={`/trails/${trail.id}`}>{trail.name}</NavLink></li>): <li>Loading...</li>}
            </ul>

            <form className="new_trail_form" onSubmit={(e)=>handleSubmit(e)}>
                <label>Name: </label>
                    <input type="text" onChange={(e)=>setName(e.target.value)} value={name}/>
                <label>Location: </label>
                    <input type="text" onChange={(e)=>setLocation(e.target.value)} value={location}/>
                <label>Description: </label>
                    <textarea onChange={(e)=>setDescription(e.target.value)} value={description}/>
                <label>Image link: </label>
                    <input type="text" onChange={(e)=>setImage(e.target.value)} value={image}/>
                <label>Distance (miles): </label>
                    <input type="text" onChange={(e)=>setDistance(e.target.value)} value={distance}/>
                <label>Intensity (out of 10): </label>
                    <input type="text" onChange={(e)=>setIntensity(e.target.value)} value={intensity}/>
                    <input type="submit"/>
            </form>
            {errors ? <div><h4>Error!</h4> {errors.map(errorObj => 
                <div>
                    {Object.keys(errorObj).map(key => 
                        <div>
                            <h5>{key}: </h5>
                            {errorObj[key].map(error => <li key={errorObj+error}>{error}</li>)}
                        </div>)}
                </div>
            )}</div>
            : 
            null}
        </div>
    )
}

export default Trails