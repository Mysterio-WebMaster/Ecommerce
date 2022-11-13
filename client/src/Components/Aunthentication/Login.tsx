import React, {useState} from 'react'
import axios from 'axios'

export default function Login() {

    let [username, setUsername] = useState('');
    let [password, setPassword] = useState('');


    const handleUsername = (event: React.ChangeEvent<HTMLInputElement>): void=> {
        setUsername(event.target.value);
    }

    const handlePassword = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setPassword(event.target.value);
    }

    const handleSubmit = () =>{
        console.log(username, password);
        axios.post("http://localhost:5000/login", {username: username, password:password})
        .then(response=>{
            
        })
    }


  return (
    <div>
        <h3>Login</h3>

        <div className="FormBox">
            <input value={username} type="text" name="username" placeholder='Username' onChange={handleUsername}/><br />
            <input value={password} type="password" name="password" placeholder='Password' onChange={handlePassword}/><br />

            <button type="submit" onClick={handleSubmit}>Register</button>
            <br />
            <br />
            <button onClick={e=> {window.location.href="/"}}>Home</button><br /><button onClick={e=> {window.location.href="/login"}}>Login</button>
        </div>
    </div>
  )
}
