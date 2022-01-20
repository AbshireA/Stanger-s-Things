


//create post btn not working properly
//issue resolved


import React, {useState, useEffect} from "react";

const Listing = (props) => {
    
    const [title, syncTitle] = useState("")
    const [location, syncLocation] = useState("")
    const [description, syncDescription] = useState("")
    const [price, syncPrice] = useState("free")
    const [delivery, syncDelivery] = useState(false)

    const {loginToken, syncLoginToken, isLoggedIn, syncIsLoggedIn} = props

    async function createListing(event) {
      event.preventDefault()
      const response = fetch('https://strangers-things.herokuapp.com/api/2111-FTB-ET-WEB-FT/posts', {
          method: "POST",
          headers:  {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${loginToken}`
                    },
          body: JSON.stringify({
              post: {
              title: title,
              description: description,
              price: price,
              willDeliver: delivery
                }
              })
            }).then(response => response.json())
            .then(result => {
              console.log(result);
            })
            .catch(console.error);
            alert("listing created!")
    }

    return(
        <div>
            <h2>Create Post: </h2>
          <div id="newPosts">
            <form id='listForm'>
                <label htmlFor='title'>Title:</label>
                <input type='text' name='title' value={title} onChange={(event) => syncTitle(event.target.value)}/>
                <label htmlFor='location'>Location:</label>
                <input type='text' name='location' value={location} onChange={(event) => syncLocation(event.target.value)}/>
                <label htmlFor='description'>Item Description:</label>
                <input type='text' name='description' value={description} onChange={(event) => syncDescription(event.target.value)}/>
                <label htmlFor='price'>Pricing:</label>
                <input type='text' name='price' value={price} onChange={(event) => syncPrice(event.target.value)}/>
                <label htmlFor="delivery">Check box if willing to deliver:</label>
                <input name="delivery" checked={delivery} type='checkbox' onChange={(event) => syncDelivery(event.target.checked)} />
                <button type='submit' onClick={createListing}>List my item</button>
            </form>
          </div>
        </div>
   
    )
}

export default Listing
