import React, { useState, useRef } from 'react'
import { Col, Row } from 'react-bootstrap'
import jwt_decode from 'jwt-decode';
import { Button, TextField, FormControl, TableContainer, Paper, Table, TableHead, TableCell, TableRow, TableBody, Container } from '@mui/material'

import Navbaar from './Navbaar';
import { useNavigate } from "react-router";
import { addinvoice } from '../config/Myservice'
export default function AddInvoice() {
  const navigate = useNavigate();
  const [flag, setflag] = useState(false)
  const [productdata, setproductdata] = useState([])
  const [state, setstate] = useState({remail:'',rname:'',raddress:'',rdate:'',title:'',quantity:null,price:null,discount:null})

  const submitproduct = () => {
    const newproduct = {
      title: state.title,
      quantity: parseInt(state.quantity),
      price: parseInt(state.price),
      discount: parseInt(state.discount),
      total: ((state.price - (state.price * state.discount / 100)) * state.quantity)
    }
    setproductdata([...productdata, newproduct])
    setstate({...state,title:'',quantity:null,price:null,discount:null})
    setflag(false)
  }

  const submitdata = () => {
    let token = localStorage.getItem('_token');
    let decode = jwt_decode(token);
    const newdata = {
      email: decode.email,
      remail: state.remail,
      rname: state.rname,
      raddress: state.raddress,
      rdate: state.rdate,
      product: productdata,
      status: "UNPAID"
    }
    addinvoice(newdata).then(res => {
      console.log(res.data, "line 44")
    })
    console.log(newdata)
    navigate('/dashboard')
  }
  return (
    <>
      <Navbaar />
      <Container>
        <h1 className='text-center'>Add Invoice</h1>
        <Row>
          <Col>
            <FormControl sx={{ my: 1, width: "30ch" }}>
              <TextField
                name="rname"
                value={state.rname}
                onChange={(e)=>setstate({...state,rname:e.target.value})}
                type="text"
                label="Receiver Name" />
            </FormControl>
          </Col>

          <Col>
            <FormControl sx={{ my: 1, width: "30ch" }}>
              <TextField
                name="remail"
                value={state.remail}
                onChange={(e)=>setstate({...state,remail:e.target.value})}
                type="text"
                label="Receiver Email" />
            </FormControl>
          </Col>

          <Col>
            <FormControl sx={{ my: 1, width: "30ch" }}>
              <TextField
                name="raddress"
                value={state.raddress}
                onChange={(e)=>setstate({...state,raddress:e.target.value})}
                type="text"
                label="Receiver Address" />
            </FormControl>
          </Col>

          <Col>
            <FormControl sx={{ my: 1, width: "30ch" }}>
              <TextField
                name="rdate"
                value={state.rdate}
                onChange={(e)=>setstate({...state,rdate:e.target.value})}
                type="date"
              />
            </FormControl>
          </Col>

        </Row>
        <TableContainer component={Paper} sx={{ marginTop: '20px' }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Sr No.</TableCell>
                <TableCell align="center">Item</TableCell>
                <TableCell align="center">Quantity</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell align="center">Discount</TableCell>
                <TableCell align="center">Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productdata.map((ele, index) => (
                <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center">{ele.title}</TableCell>
                  <TableCell align="center">{ele.quantity}</TableCell>
                  <TableCell align="center">{ele.price}</TableCell>
                  <TableCell align="center">{ele.discount}</TableCell>
                  <TableCell align="center">{ele.total}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
     

        {flag ? <>

          <Row className='mt-1'>
            <Col>
              <FormControl sx={{ my: 1, width: "30ch" }}>
                <TextField
                  name="title"
                  value={state.title}
                  onChange={(e)=>setstate({...state,title:e.target.value})}
                  type="text"
                  label="Item Name"
                />
              </FormControl>
            </Col>

            <Col>
              <FormControl sx={{ my: 1, width: "30ch" }}>
                <TextField
                  name="quantity"
                  value={state.quantity}
                  onChange={(e)=>setstate({...state,quantity:e.target.value})}
                  type="number"
                  label="Quantity"
                />
              </FormControl>
            </Col>

            <Col>
              <FormControl sx={{ my: 1, width: "30ch" }}>
                <TextField
                  name="price"
                  value={state.price}
                  onChange={(e)=>setstate({...state,price:e.target.value})}
                  type="number"
                  label="Price"
                />
              </FormControl>
            </Col>

            <Col>
              <FormControl sx={{ my: 1, width: "30ch" }}>
                <TextField
                  name="discount"
                  value={state.discount}
                  onChange={(e)=>setstate({...state,discount:e.target.value})}
                  type="number"
                  label="Discount"
                />
              </FormControl>
            </Col>
          </Row>

          <div className='text-center mt-3'>
          <Button variant="contained" onClick={() => submitproduct()}>Submit Product</Button>
          </div>
        </>
          :
          <div className='text-center mt-3'>
          <Button variant="contained" onClick={() => setflag(true)}>Add Product</Button>
          </div>}
        <div className='text-center mt-3'>
        <Button variant="contained" color="success" onClick={() => submitdata()}> Submit</Button>
        </div>
      </Container>
    </>
  )
}
