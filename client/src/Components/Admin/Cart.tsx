import React,{useEffect, useState} from 'react'
import Navbar from './Navbar/Navbar'
import axios from 'axios'

import {Container, Row, Col, Table} from 'react-bootstrap'

type CartItem = {
  id: number, 
  pUser: string,
  pID: number,
  pName: string,
  pPrice: number

}

export default function Cart() {

  let [cart, setCart] = useState<CartItem[]>([]);
  let finalAmount = 0;

  useEffect(()=>{
    axios.get("http://localhost:5000/getAdminCart")
    .then((response)=>{
        if(response != null){
            setCart(response.data)
        }
      })

})  
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
                <th>User</th>
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
                      <td><button>Delete</button></td>
                      <td>{item.pUser}</td>
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
