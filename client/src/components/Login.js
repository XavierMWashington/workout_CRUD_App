import React from 'react'
import "../css/Login.css"


function Login() {
  return (
    <div>
        <div className='login-container'>

            <h1 id='login-form-header'>Login</h1>
            <form className='front-form'>
                <label for = "username">Username:</label>
                <input name='username' id='username' ></input>
                <label for = "password">Password: </label>
                <input name='password' id = "password"></input>
            </form>

            <h1 id = "register-form-header">Register</h1>
            <form className='front-form'> 
                <label for = "new-username">Enter new username</label>
                <input name='new-username' id='new-username' ></input>
                <label for = "new-password">New password: </label>
                <input name='new-password' id = "new-password"></input>             
            </form>
        </div>
    </div>
  )
}

export default Login