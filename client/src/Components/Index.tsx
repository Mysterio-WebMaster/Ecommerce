import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import Navbar from './Navbar/Navbar';
import axios from 'axios'
import './style.css'

import {Container, Row, Col} from 'react-bootstrap'

type Products={
  title: string,
  category: string,
  description: string,
  image: string,
  id: number,
  price: number,
  rating: number
}

export default function Index() {
  let navigate = useNavigate();

  let userToken = sessionStorage.getItem('token');

  let [products, setProducts] = useState<Products[]>([])
  // let [products, setProducts] = useState([])
  
  useEffect(()=>{
    if(userToken === null){
      navigate("/login")
    }


    axios.get("https://fakestoreapi.com/products")
    .then((response)=>{
        if(response != null)
        setProducts(response.data);
      })

  }, [])
  
  return (
    <div>
      <Navbar />
      <br />
        <Container>
          <Row>
            {products.map(((item)=>{
              return(
                <Col key={item.id} g-col-4 md={4} className='g-col-6'>
                  <div className="productBox">
                    <hr />
                     <h5>Product Name: </h5><p>{item.title}</p> 
                     <h5>Product Price: </h5><p>{item.price}/-</p> 
                     <h5>Category: </h5><p>{item.category}</p> 
                  </div>
                </Col>
              )
            }))}
          </Row>
          
        </Container>
        
    </div>
  ) 
}
