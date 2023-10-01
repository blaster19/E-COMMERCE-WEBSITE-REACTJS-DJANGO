import React, { useState,useEffect } from 'react'
import {  useSelector } from 'react-redux'
import { Table} from 'react-bootstrap'

import axios from 'axios'


function ProfileScreen() {
    const [data,setdata]=useState()
    const userLogin=useSelector((state)=>state.userLogin)
    const{userInfo}=userLogin
    
    useEffect(()=>{
        axios.get(`/api/user/orders/${userInfo.id}`).then((res) => {
          if (res.data) {
            setdata(res.data);
            
          } else {
            setdata(null);
          }
        })
      },[userInfo._id])

     
  return (
    <div>
      <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>USER</th>
                                    <th>DATE</th>
                                    <th>Total</th>
                                    <th>PAID</th>
                                    <th>DELIVERED</th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody>
                                {data && data.map(order => (
                                    <tr key={order._id}>
                                        <td>{order._id}</td>
                                        <td>{order.user && order.user.name}</td>
                                        <td>{order.createdAt.substring(0, 10)}</td>
                                        <td>${order.totalPrice}</td>

                                        <td>{order.isPaid ? (
                                            order.paidAt.substring(0, 10)
                                        ) : (
                                                <i className='fas fa-check' style={{ color: 'red' }}></i>
                                            )}
                                        </td>

                                        <td>{order.isDelivered ? (
                                            order.deliveredAt.substring(0, 10)
                                        ) : (
                                                <i className='fas fa-check' style={{ color: 'red' }}></i>
                                            )}
                                        </td>

                                        
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
    </div>
  )
}

export default ProfileScreen



