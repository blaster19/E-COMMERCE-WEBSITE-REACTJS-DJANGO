import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import "./product.css"

const Product = ({product}) => {
  return (

    <div className='product-image'>    <Card className='my-3 p-3 rounded '>
        <Link to={`/product/${product._id}`}>
            <img src={product.image} className='mx-auto d-block ' style={{height:"150px",width:"200px"}}  />
        </Link>

        <Card.Body>

            <Link to={`/product/${product._id}`}  style={{textDecoration:'none'}}>
            
                <Card.Title as="div">
                    <strong>{product.name}</strong>
                </Card.Title>

            </Link>
            <Card.Title as="div">
                    <strong>{product.description}</strong>
                </Card.Title>

            <Card.Text as='h3'>
                ₹{product.price}
            </Card.Text>

        </Card.Body>
    </Card>
    </div>
)
}

export default Product


