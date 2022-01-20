


import React, {useState} from "react"
import { getUser } from "../strangersAPI";

const Form = (props) => {

    const [username, syncUsername] = useState('')
    const [password, syncPassword] = useState('')
    const [usernameRegister, syncUsernameRegister] = useState('')
    const [passwordRegister, syncPasswordRegister] = useState('')

    const {loginToken, syncLoginToken, isLoggedin, syncIsLoggedIn, userData, syncUserData} = props
    
    async function register(event) {
        event.preventDefault()
        let response = await fetch(
            'https://strangers-things.herokuapp.com/api/2111-FTB-ET-WEB-FT/users/register',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                user: {
                  username: usernameRegister,
                  password: passwordRegister,
                },
              }),
            }
          )
        let info = await response.json()
        syncUsernameRegister("")
        syncPasswordRegister("")
    }
  
    async function login(event) {
      event.preventDefault()
      try{
      let response = await fetch(
        'https://strangers-things.herokuapp.com/api/2111-FTB-ET-WEB-FT/users/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user: {
              username: username,
              password: password,
            },
          }),
        }
      )

      let user = await response.json()
        syncIsLoggedIn(true)
        syncLoginToken(user.data.token)
      let newUser = getUser(user.data.token)
        syncUserData(newUser)
      }catch(err){
        syncIsLoggedIn(false)
        console.log(err)
      }
        syncUsername("")
        syncPassword("")
    }
  


    function logout(){
        syncIsLoggedIn(false)
        syncLoginToken('')  
        syncUsername("")
        syncPassword("")
    }

    return (
    
      <div id='formDiv'>
          {
          !isLoggedin ? <>
        <div id='loginDiv'>
        <h2>Login </h2>
        <form onSubmit={login}>
          <label htmlFor='username'>Username:</label>
          <input type='text' name='username' value={username} onChange={(event) => syncUsername(event.target.value)}/>
          <label htmlFor='password'>Password:</label>
          <input type='password' name='password' value={password} onChange={(event) => syncPassword(event.target.value)}/>
          <button type='submit'>Login</button>
        </form>
        </div>
           
        <div id='registerDiv'>
        <h2>Register: </h2>
            <form onSubmit={register}>
                <label htmlFor='usernameRegister'>Create Username:</label>
                <input type='text' name='usernameRegister' value={usernameRegister} onChange={(event) => syncUsernameRegister(event.target.value)}/>
                <label htmlFor='passwordRegister'>Create Password:</label>
                <input type='password' name='passwordRegister' value={passwordRegister} onChange={(event) => syncPasswordRegister(event.target.value)}/>
                <button type='submit'>Register</button>
            </form>
        </div>
        </> : null
        } 

        { loginToken ?
        <div id='logout'>
            <button type='submit' onClick={logout}>Logout</button>
        </div> : null
        } 
        </div>
    )
  }

  export default Form;
