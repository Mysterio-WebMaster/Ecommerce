import React, {useState} from 'react'
import axios from 'axios'

export default function Register() {

    let [username, setUsername] = useState('');
    let [password, setPassword] = useState('');


    const handleUsername = (event: React.ChangeEvent<HTMLInputElement>): void=> {
        setUsername(event.target.value);
        
    }

    const handlePassword = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setPassword(event.target.value);
    }

    const handleSubmit = (): void => {
        axios.post("http://localhost:5000/register", {username: username, password:password})
        .then(response=>{
            if(response.data === "empty"){
                window.alert("Empty Fields");
            }
            else if(response.data === "exist"){
                window.alert("User Already Exist");
            }
            else{
                window.alert("Registered Successfully");
                window.location.href="/login"
            
            }
        })
    }

  return (
    <div>
        <h3>Register</h3>

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
