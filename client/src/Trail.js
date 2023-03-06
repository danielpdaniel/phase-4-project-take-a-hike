import {useState, useEffect} from "react"
import { useParams } from "react-router-dom"

function Trail(){
    const [trail, setTrail] = useState("")
    const params = useParams()
    console.log(params)

    useEffect(()=>{
        fetch(`/trails/${params.id}`)
        .then(r=>{
            if(r.ok){
               r.json().then(data => setTrail(data))
            }
        })
    },[])
    return(
        <div>

        </div>
    )
}

export default Trail