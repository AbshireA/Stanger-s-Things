


//create post btn not working properly
//issue resolved


import React, {useState, useEffect} from "react";

const Listing = (props) => {
    
    const [title, setTitle] = useState("")
    const [location, setLocation] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("free")
    const [delivery, setDelivery] = useState(false)

    const {loginToken, setLoginToken, isLoggedIn, setIsLoggedIn} = props

    async function makeListing(event) {
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
                <input type='text' name='title' value={title} onChange={(event) => setTitle(event.target.value)}/>
                <label htmlFor='location'>Location:</label>
                <input type='text' name='location' value={location} onChange={(event) => setLocation(event.target.value)}/>
                <label htmlFor='description'>Item Description:</label>
                <input type='text' name='description' value={description} onChange={(event) => setDescription(event.target.value)}/>
                <label htmlFor='price'>Pricing:</label>
                <input type='text' name='price' value={price} onChange={(event) => setPrice(event.target.value)}/>
                <label htmlFor="delivery">Check box if willing to deliver:</label>
                <input name="delivery" checked={delivery} type='checkbox' onChange={(event) => setDelivery(event.target.checked)} />
                <button type='submit' onClick={makeListing}>List my item</button>
            </form>
          </div>
        </div>
   
    )
}

export default Listing
