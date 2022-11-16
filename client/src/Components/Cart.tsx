import React, {useEffect, useState} from 'react'
import './style.css'

import {useNavigate} from 'react-router-dom'
import {Container, Row, Col, Table} from 'react-bootstrap'

import Navbar from './Navbar/Navbar';
import axios from 'axios';

type CartItem = {
  id: number, 
  pUser: string,
  pID: number,
  pName: string,
  pPrice: number

}

export default function Cart() {

  let navigate = useNavigate();
  let someToken = sessionStorage.getItem('token');
  let username = sessionStorage.getItem('user');

  let [cart, setCart] = useState<CartItem[]>([])
  let finalAmount = 0;

  useEffect((): void =>{
    if(someToken === null){
      navigate("/login")
    }

    axios.post("http://localhost:5000/getCart", {username: username})
        .then((response)=>{
            if(response != null){
                setCart(response.data);
            }
          })
  }, [])


  const handleDelete = (id: number): void =>{
    axios.post("http://localhost:5000/deleteProduct", {username: username, id: id})
    .then((response)=>{
        if(response != null){
            window.alert("Item has been deleted");
            window.location.reload();
        }
      })
  }

  return (
    <div>
      <Navbar />
      <Container>
          <h3>Cart</h3>
          <Table striped="columns">
            <thead>
              <tr>
                <th>#</th>
                <th>Action</th>
                <th>Product Name</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
            {cart.map((item: CartItem, index: number)=>{
                
                finalAmount += item.pPrice;
                return(
                  <tr key={index}>
                      <td>{index+1}</td>
                      <td><button onClick={e=>{handleDelete(item.id)}}>Delete</button></td>
                      <td>{item.pName}</td>
                      <td>{item.pPrice}/-</td>
                  </tr>
                )
            })}
            <tr>
              <td></td>
              <td></td>
              <td><h4>Amount:</h4></td>
              <td><h4>{finalAmount}/-</h4></td>
            </tr>
            </tbody>
          </Table>
      </Container>
    </div>
  )
}
