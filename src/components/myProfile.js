import React, {useState, useEffect} from "react";
import { deletePost, getUser } from "../strangersAPI";

const Single = (props) => {

    const {value, loginToken, index} = props

    async function deleteThisPost(event) {
        event.preventDefault()
        await deletePost(value._id, loginToken)
        alert("Post deleted")
    }

    return (
        <div>
        { value.active ? <>
        <div key={index} id="posts">
            <h3>{value.title}</h3>
            <span className="title">Location: </span>
            <span className="content">{value.location}<br></br></span>

            <span className="title">User: </span>
            <span className="content">{value.username}<br></br></span>

            <span className="title">Description: </span>
            <span className="content">{value.description}<br></br></span>

            <span className="title">Price: </span>
            <span className="content">{value.price}<br></br></span>

            <span className="title">Delivery: </span>
            <span className="content">{value.willDeliver ? "I will deliver" : "I will not deliver"}</span><br></br>

            <form onSubmit={(event) => {deleteThisPost(event)}}>
                <br></br><button type="submit" className="deleteButton" value={value._id}>DELETE POST</button>
            </form>
        </div>
        </> : null
        }
        </div>
    )

}

const Profile = (props) => {

    const {userData, setUserData, loginToken} = props
    
    useEffect(() => {
        async function fetchUserData() {
            if(loginToken){
                setUserData(await getUser(loginToken))
            }
        }
        fetchUserData()
    },[loginToken])


    return(
        <div>
        <h1> Profile</h1>
         <h2>My posts:</h2>
            { userData.posts && userData.posts.length > 0 ?
            userData.posts.map((value, index) => <Single value={value} index={index} key={index} loginToken={loginToken}/>) : null
            } 

            <h2>My messages:</h2> 
                {
                userData.messages ?
                userData.messages.map((value, index) => {
                    return (
                        <div key={index} id="myMessages">              
                            <span className="title">Post: </span>
                            <span className="content">{value.post.title}<br></br></span>

                            <span className="title">Message: </span>
                            <span className="content">{value.content}<br></br></span>
                        </div>
                    ) 
                }): <h2>You have 0 new Messages</h2>
                }
        </div>
    )
}

export default Profile
