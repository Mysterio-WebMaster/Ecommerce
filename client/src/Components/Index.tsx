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
  let username = sessionStorage.getItem('user');

  let [products, setProducts] = useState<Products[]>([])
  // let [products, setProducts] = useState([])
  let [count, setCount] = useState()

  const addToCart = (id: number, name: string, price: number): void =>{

    let productObj = {
      user:  username,
      pId: id,
      pName: name,
      pPrice: price
    }

    axios.post("http://localhost:5000/addtocart", productObj)
    .then((response)=>{
        if(response != null){
            if(response.data === "Inserted"){
                window.alert("Item Added to Cart");
                //window.location.reload();
            }
        }
      })
  }
  
  useEffect((): void =>{
    if(userToken === null){
      navigate("/login")
    }

    axios.get("https://fakestoreapi.com/products")
    .then((response)=>{
        if(response != null)
        setProducts(response.data);
      });

  }, [])

  useEffect(()=>{
    axios.post("http://localhost:5000/getCount", {username: username})
    .then((response)=>{
        if(response != null){
            setCount(response.data[0].proCount);
        }
      })

}) 
  
  return (
    <div>
      <Navbar />
      <br />
        <Container>
          <Row>
            {products.map(((item: Products)=>{
              return(
                <Col key={item.id} md={4} className='g-col-6'>
                  <div className="productBox">
                    <hr />
                     <h5>Product Name: </h5><p>{item.title}</p> 
                     <h5>Product Price: </h5><p>{item.price}/-</p> 
                     <h5>Category: </h5><p>{item.category}</p> 
                     <hr />
                     <button
                        onClick={e=>{addToCart(item.id, item.title, item.price)}}
                     >Buy Now</button>
                  </div>
                </Col>
              )
            }))}
          </Row>
          
        </Container>
        
    </div>
  ) 
}
