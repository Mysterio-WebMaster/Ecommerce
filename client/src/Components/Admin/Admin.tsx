import React, {useState, useEffect} from 'react'
import Navbar from './Navbar/Navbar'
import {useNavigate} from 'react-router-dom'

export default function Admin() {
    let navigate = useNavigate();

    let userToken = sessionStorage.getItem('token');
    useEffect((): void =>{
        if(userToken === null){
          navigate("/login")
        }})
  return (
    <div>
        <Navbar />
    </div>
  )
}
