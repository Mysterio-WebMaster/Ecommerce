import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {logout} from "./Redux/user";

export default function Index() {

  const user = useSelector((state: any) => state.user.value)
  let [username, setUsername] = useState('')
  let navigate = useNavigate();
  const dispatchUser = useDispatch(); 

  let handleLogout = () => {
      sessionStorage.clear();
      navigate("/login");
  }

  let userToken = sessionStorage.getItem('token');
  let userName = sessionStorage.getItem('user');
  
  useEffect(()=>{
    if(userToken === null){
      navigate("/login")
    }
    if(userName != null){
      setUsername(userName)
    }
  }, [])
  
  return (
    <div>
        <div>
          <h3>Cryptonex</h3>
          <h4>{username}</h4>
          <button onClick={handleLogout}>Logout</button>
          <hr />
          <br />
          <button onClick={e=> {window.location.href="/register"}}>Registeration</button>
          <button onClick={e=> {window.location.href="/login"}}>Login</button>
        </div>
        
    </div>
  ) 
}
