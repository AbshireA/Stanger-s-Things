


import React, {useState, useEffect} from "react";
import { getPosts, sendMessage } from "../strangersAPI";

const Post = (props) => {

    const {value, loginToken} = props
    const [message, syncMessage] = useState("")

    async function sendUserMessage(event){
        event.preventDefault()
        await sendMessage(value._id, loginToken, message)
        alert("message sent")
        syncMessage("")
    }

    
    return (
        <div id="posts">
            <h3>{value.title}</h3>
            <span className="title">Location: </span>
            <span className="content">{value.location}<br></br></span>

            <span className="title">Name: </span>
            <span className="content">{value.author.username}<br></br></span>

            <span className="title">Item Description: </span>
            <span className="content">{value.description}<br></br></span>

            <span className="title">Price: </span>
            <span className="content">{value.price}<br></br></span>

            <span className="title">Delivery: </span>
            <span className="content">{value.willDeliver ? "I will deliver" : "I will not deliver"}</span>

            { loginToken && !value.isAuthor ?
            <form onSubmit={(event) => {sendUserMessage(event)}}>
                <br></br><input type="text" className="messageText" value={message} onChange={(event) => syncMessage(event.target.value)}></input>
                <br></br><button type="submit" className="message" value={value._id}>Message Seller</button>
            </form>: null
            }
        </div>
    )
}

const Posts = (props) => {

    const {data, syncData, loginToken, syncLoginToken, isLoggedIn} = props

    useEffect(() => {
        async function fetchPosts() {
            syncData(await getPosts())
        }
        fetchPosts()
    }, [loginToken]);

    function filter() {
        let text = document.getElementById("filter")
        for(let i = 0; i < data.posts.length; i++){
            if(data.posts[i].title.toLowerCase() === (text.value.toLowerCase())){
                return(
                    alert("Scroll down to post number " + (i + 1))
                )
            }
        }
        alert("No Match Found")
    }

    return (
        <div>
            <input type="text" id="filter"></input><br></br>
            <button onClick={filter}>Filter</button>

            { data.posts && data.posts.length > 0 ?
            data.posts.map((value, index) => <Post value={value} index={index} key={index} loginToken={loginToken}/>
            ): null
            } 
        </div>
    )
}

export default Posts
