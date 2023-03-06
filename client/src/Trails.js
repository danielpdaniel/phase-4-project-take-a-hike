import { useState } from "react"

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
                {trails ? trails.map(trail=><ul>{trail.name}</ul>): <ul>Loading...</ul>}
            </li>
        </div>
    )
}

export default Trails