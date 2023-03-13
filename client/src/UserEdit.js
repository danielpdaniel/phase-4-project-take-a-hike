import { useState } from "react"

function UserEdit({profileLoginStatus, pageUser}){
    const [about, setAbout] = useState(pageUser.about)
    const [avatar, setAvatar] = useState(pageUser.avatar_image)
    console.log(pageUser)
    function handleAboutChange(e){
        setAbout(e.target.value)
    }

    function handleAvatarChange(e){
        setAvatar(e.target.value)
    }
    console.log(about)

    function handleSubmit(e){
        e.preventDefault()

        const patchBody = {
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
    }

    return(
        <form onSubmit={(e)=>handleSubmit(e)}>
            <h2>{profileLoginStatus ? `Yahoo! Welcome, ${pageUser.username}` : `Wahoo! It's ${pageUser.username}`}</h2>
                <img src={pageUser.avatar_image} className="myAvatar" alt={`${pageUser.username} avatar`}/>
                <label for="imageEdit">Update Avatar: </label>
                <input name="imageEdit" type="text" value={avatar} onChange={e => handleAvatarChange(e)}/>
                <div className="myAbout">
                    <h4>About:</h4>
                    <textarea value={about} onChange={(e)=>handleAboutChange(e)}/>
                </div>
        </form>
    )
}

export default UserEdit