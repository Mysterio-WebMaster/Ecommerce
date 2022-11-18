import React, {useEffect, useState} from 'react'
import './style.css'

import {useNavigate} from 'react-router-dom'
import {Container, Row, Col} from 'react-bootstrap'

import axios from 'axios'



export default function Navbar() {

    let navigate = useNavigate();

    let handleLogout = (): void => {
        sessionStorage.clear();
        navigate("/login");
    }

        let someToken = sessionStorage.getItem('token');
        let username = sessionStorage.getItem('user');
        let [count, setCount] = useState();

      

  return (
    <div className='Navigation'>
        <Container>
            <Row>
                <Col md={2}>
                    <div className="logo">
                        <h3>Cryptonex</h3>
                    </div>
                </Col>
                <Col md={6}>
                    {
                        someToken != null && 
                        <div>
                            <button onClick={(e)=>{window.location.href="/Admin"}}>Home</button>
                            <button onClick={(e)=>{window.location.href="/Admin/cart"}}>Cart {count} </button>
                        </div>
                    }

                </Col>
                <Col md={1}>
                    {
                        username != null && <h4>{username}</h4>
                    }
                </Col>
                <Col md={1}>
                    {
                        someToken != null && 
                        <button onClick={handleLogout}>Logout</button>
                    }
                </Col>
            </Row>
        </Container>
    </div>
  )
}
