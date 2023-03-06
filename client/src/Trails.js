import { useState, useEffect } from "react"

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
            name: {name},
            location: {location},
            description: {description},
            image: {image},
            distance: {distance},
            intensity: {intensity}
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
                r.json().then(data => console.log(data))
            }else{
                r.json().then(data=>setErrors(data.errors))
            }
        })
        console.log(errors)
    }
    console.log(errors)

    return(
        <div>
            <li>
                {trails ? trails.map(trail=><ul key={trail.id}>{trail.name}</ul>): <ul>Loading...</ul>}
            </li>
            <form className="new_trail_form" onSubmit={(e)=>handleSubmit(e)}>
                <label>Name: </label>
                    <input type="text" onChange={(e)=>setName(e.target.value)}/>
                <label>Location: </label>
                    <input type="text" onChange={(e)=>setLocation(e.target.value)}/>
                <label>Description: </label>
                    <textarea onChange={(e)=>setDescription(e.target.value)}/>
                <label>Image link: </label>
                    <input type="text" onChange={(e)=>setImage(e.target.value)}/>
                <label>Distance (miles): </label>
                    <input type="text" onChange={(e)=>setDistance(e.target.value)}/>
                <label>Intensity (out of 10): </label>
                    <input type="text" onChange={(e)=>setIntensity(e.target.value)}/>
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