import { useState } from "react"

function UserEdit({profileLoginStatus, pageUser, setPageUser, setUserEditStatus}){
    const [about, setAbout] = useState(pageUser.about)
    const [avatar, setAvatar] = useState(pageUser.avatar_image)
    const [username, setUsername] = useState(pageUser.username)
    const [errors, setErrors] = useState("")

    function handleAboutChange(e){
        setAbout(e.target.value)
    }

    function handleAvatarChange(e){
        setAvatar(e.target.value)
    }

    function handleUserNameChange(e){
        setUsername(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault()

        const patchBody = {
            username: username,
            about: about,
            avatar_image: avatar
        }

        fetch(`/users/${pageUser.id}`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(patchBody)
        })
        .then(r=>{
            if (r.ok){
            r.json().then(data => {
                setPageUser(data);
                setUserEditStatus(false)
            })
            }else {
                r.json().then(e => setErrors(e.errors))
            }
        // .then(data=>{
        //     setPageUser(data);
        //     setUserEditStatus(false)
        // })
            })
    }

    return(
        <form onSubmit={(e)=>handleSubmit(e)}>
            <h2>`Yahoo! Welcome, <input type="text" value={username} onChange={handleUserNameChange}/></h2>
                <img src={pageUser.avatar_image} className="myAvatar" alt={`${pageUser.username} avatar`}/>
                <label>Update Avatar: </label>
                <input name="imageEdit" type="text" value={avatar} onChange={e => handleAvatarChange(e)}/>
                <div className="myAbout">
                    <h4>About:</h4>
                    <textarea value={about} onChange={(e)=>handleAboutChange(e)}/>
                </div>
                <input type="submit" value="Submit Changes"/>
                {errors ? errors.map(error => Object.keys(error).map(errorKey => <h3 key={`${errorKey}${error[errorKey]}`}>{errorKey}: {error[errorKey]}</h3>)) : null}
        </form>
    )
}

export default UserEdit