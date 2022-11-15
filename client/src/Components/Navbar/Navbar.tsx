import React, {useEffect, useState} from 'react'
import './style.css'

import {useNavigate} from 'react-router-dom'
import {Container, Row, Col} from 'react-bootstrap'

export default function Navbar() {

    let navigate = useNavigate();
    let handleLogout = () => {
        sessionStorage.clear();
        navigate("/login");
    }
        let someToken = sessionStorage.getItem('token');
        let username = sessionStorage.getItem('user');

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

                </Col>
                <Col md={2}>
                    {
                        username != null && <h4>{username}</h4>
                    }
                </Col>
                <Col md={2}>
                    {
                        someToken != null && <button onClick={handleLogout}>Logout</button>
                    }
                </Col>
            </Row>
        </Container>
    </div>
  )
}
