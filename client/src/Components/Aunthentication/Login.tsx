import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {login} from "../Redux/user";
import Navbar from '../Navbar/Navbar';


export default function Login() {

    const user = useSelector((state: any)=>state.user.value);
    const dispatchUser = useDispatch(); 

    let userToken = sessionStorage.getItem("token")

    let [username, setUsername] = useState('');
    let [password, setPassword] = useState(''); 
    let navigate = useNavigate();

    
    useEffect(()=>{
        if(userToken !== null ){
            navigate("/")
          }
    }, [])

    const handleUsername = (event: React.ChangeEvent<HTMLInputElement>): void=> {
        setUsername(event.target.value);
    }

    const handlePassword = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setPassword(event.target.value);
    }

    const handleSubmit = () =>{
        //console.log(username, password);
        axios.post("http://localhost:5000/login", {username: username, password:password})
        .then(response=>{
            if(response.data === "unknown"){
                window.alert("Invalid Credentials")
            }
            else if(response.data.msg == "adminVerified"){
                console.log(response.data.msg)
                sessionStorage.setItem("token", response.data.token);
                sessionStorage.setItem("user", response.data.user);
                navigate("/Admin");
            }
            else {
                sessionStorage.setItem("token", response.data.token);
                sessionStorage.setItem("user", response.data.user);
                // dispatchUser(login({name: sessionStorage.getItem("user"), token: sessionStorage.getItem("user")}))
                navigate("/");
            }
        })
    }

  return (
    <div>
        <Navbar />
        <h3>Login</h3>

        <div className="FormBox">
            <input value={username} type="text" name="username" placeholder='Username' onChange={handleUsername}/><br />
            <input value={password} type="password" name="password" placeholder='Password' onChange={handlePassword}/><br />

            <button type="submit" onClick={handleSubmit}>Login</button>
            <br />
            <br />
            <button onClick={e=> {window.location.href="/"}}>Home</button><br /><button onClick={e=> {window.location.href="/register"}}>Register</button>
        </div>
    </div>
  )
}
