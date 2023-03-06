import { useState, useEffect } from "react"

function Trails(){
    const [trails, setTrails] = useState("")
    useEffect(()=>{
        fetch("/trails")
        .then(r=>r.json())
        .then(data => setTrails(data))
    }, [])
    return(
        <div>
            <li>
                {trails ? trails.map(trail=><ul key={trail.id}>{trail.name}</ul>): <ul>Loading...</ul>}
            </li>
            <form className="new_trail_form">
                <label>Name: </label>
                    <input type="text"/>
                <label>Location: </label>
                    <input type="text"/>
                <label>Description: </label>
                    <textarea />
                <label>Image link: </label>
                    <input type="text"/>
                <label>Distance (miles): </label>
                    <input type="text"/>
                <label>Intensity (out of 10): </label>
                    <input type="text"/>
            </form>
        </div>
    )
}

export default Trails