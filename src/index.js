import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Posts from './components/posts'
import Form from './components/landingPage'
import Listing from './components/newPosts';
import Profile from './components/myProfile'
import {BrowserRouter, Route, Link, Routes} from 'react-router-dom'

const url = 'https://strangers-things.herokuapp.com/api/2111-FTB-ET-WEB-FT/posts'


const App = () => {
    
    const [userData, setUserData] = useState([])
    const [data, setData] = useState([])
    const [isLoggedin, setIsLoggedIn] = useState(false)
    const [loginToken, setLoginToken] = useState('')

    return (
        <BrowserRouter>
        <div id='container'>

            <div id='navbar'>
                <h1>|Welcome to Stranger's Things|~~~| </h1>
                <Link to="/profile" id="profileLink">|Profile|</Link>
                <Link to="/posts" id="postsLink">|Posts|</Link>
            </div>

            <Route path="/">
                <Form loginToken={loginToken} setLoginToken={setLoginToken} userData={userData} setUserData={setUserData} isLoggedin={isLoggedin} setIsLoggedIn={setIsLoggedIn}/>
            </Route>

            <Route path="/profile"> 
                { isLoggedin ?
                <div>
                    <Profile id="profilePage" isLoggedin={isLoggedin} userData={userData} setUserData={setUserData} loginToken={loginToken} setLoginToken={setLoginToken}/>
                    <Listing loginToken={loginToken} setLoginToken={setLoginToken} isLoggedin={isLoggedin} setIsLoggedIn={setIsLoggedIn}/>
                </div> : null
                }
            </Route>
            
            <Route path='/posts'>
                <h1>Strangers Things</h1>
                <Posts id="postPage" data={data} setData={setData} loginToken={loginToken} setLoginToken={setLoginToken} isLoggedin={isLoggedin} setIsLoggedIn={setIsLoggedIn}/>
            </Route>

        </div>
        </BrowserRouter>
    )
}


ReactDOM.render(<App/>, document.getElementById("app"))



