import React, {useEffect, useState} from 'react'

import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import Navbar from './Navbar/Navbar';
import {Container, Row, Col, Table} from 'react-bootstrap'

type OrderItem = {
    id: number, 
    pUser: string,
    pID: number,
    pName: string,
    pPrice: number,
    status: string
  }

export default function Orders() {
    let navigate = useNavigate();
    let someToken = sessionStorage.getItem('token');
    let username = sessionStorage.getItem('user');

    let [orders, setOrders] = useState<OrderItem[]>([])

    useEffect((): void =>{
        if(someToken === null){
          navigate("/login")
        }
    
        axios.get("http://localhost:5000/getAdminOrders")
            .then((response)=>{
                if(response != null){
                    setOrders(response.data);
                }
              })
      }, [])

  return (
    <div>
        <Navbar />
        <Container>
            <h3>Recent Orders</h3>
            <Table striped="columns">
            <thead>
              <tr>
                <th>#</th>
                <th>Product Name</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
            {orders.map((item: OrderItem, index: number)=>{
                return(
                  <tr key={index}>
                      <td>{index+1}</td>
                      <td>{item.pName}</td>
                      <td>{item.pPrice}/-</td>
                  </tr>
                )
            })}
            </tbody>
          </Table>

        </Container>
    </div>
  )
}
