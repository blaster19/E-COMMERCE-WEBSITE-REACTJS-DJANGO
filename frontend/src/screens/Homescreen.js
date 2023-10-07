import React, { useEffect, useState } from 'react';
import { Row, Col, Alert } from 'react-bootstrap';
import Product from '../components/Product';
import Carousel from './Carousell';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Loader from '../Loader';

const Homescreen = () => {
  const dispatch = useDispatch();
  const productlist = useSelector((state) => state.productList);
  const { error, loading, products } = productlist;

  const [searchValue, setSearchValue] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    dispatch(listProducts());
  }, []);

  useEffect(() => {
    if (products) {
      setFilteredProducts([...products]);
    }
  }, [products]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchValue(value);

    if (value === '') {
      setFilteredProducts([...products]);
    } else {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Alert variant='danger'>{error}</Alert>
      ) : (
        <div>
          <Carousel />

          <h1>Latest Products</h1>

          <input
            type='text'
            placeholder='Search products...'
            value={searchValue}
            onChange={handleSearch}
          /> <i className='fa fa-search'style={{border:'2px solid black',padding:"5px"}}></i>

          <Row>
            {filteredProducts.map((product) => (
              <Col className='pt-5' key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </div>
      )}
    </>
  );
};

export default Homescreen;
