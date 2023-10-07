import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Table } from 'react-bootstrap'
import axios from 'axios'
import './Profile.css'

function ProfileScreen() {
  const [data, setData] = useState([]);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    axios.get(`/api/user/orders/${userInfo.id}`).then((res) => {
      if (res.data) {
        setData(res.data);
      } else {
        setData([]);
      }
    });
  }, [userInfo.id]);

  return (
    <div>
      <Table striped bordered hover responsive className='table-sm'>
        <thead>
          <tr>
            <th>ID</th>
            <th>DATE</th>
            <th>Total (Inc of Tax)</th>
            <th>PAID</th>
            <th>DELIVERED</th>
            <th>Items</th>
            
          </tr>
        </thead>
        <tbody>
          {data.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.createdAt.substring(0, 10)}</td>
              <td>₹{order.totalPrice}</td>
              <td>
                {order.isPaid ? (
                  order.paidAt.substring(0, 10)
                ) : (
                  <i className='fas fa-check' style={{ color: 'red' }}></i>
                )}
              </td>
              <td>
                {order.isDelivered ? (
                  order.deliveredAt.substring(0, 10)
                ) : (
                  <i className='fas fa-check' style={{ color: 'red' }}></i>
                )}
              </td>
              <td>
                <Table className="second-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Qty</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.orderItems.map((item) => (
                      <tr key={item._id}>
                        <td>{item.name}</td>
                        <td>{item.qty}</td>
                        <td>₹{item.price * item.qty}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ProfileScreen;


