import {useState, useEffect} from "react"
import { useParams } from "react-router-dom"

function Trail(){
    const [trail, setTrail] = useState("")
    const params = useParams()

    useEffect(()=>{
        fetch(`/trails/${params.id}`)
        .then(r=>{
            if(r.ok){
               r.json().then(data => setTrail(data))
            }
        })
    },[params.id])
    return(
        <div>
            {trail? 
                <div>
                    <h2>{trail.name}</h2> 
                    <img alt={trail.name} src={trail.image} className="trailImage"/>
                    <h3>Location:</h3>
                        <h4>{trail.location}</h4>
                    <h3>Description:</h3>
                        <h4>{trail.description}</h4>
                    <h3>Distance:</h3>
                        <h4>{trail.distance}</h4>
                    <h3>Intensity:</h3>
                        <h4>{trail.intensity}</h4>


                </div>
            :   <h2>Loading...</h2>}
        </div>
    )
}

export default Trail