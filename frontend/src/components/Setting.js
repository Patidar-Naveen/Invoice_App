import React, { useEffect, useState, useRef } from 'react'
import Navbaar from './Navbaar'
import jwt_decode from 'jwt-decode';
import { TextField, FormControl, Container } from '@mui/material'
import { Col, Row } from "react-bootstrap";
import {updateuser} from '../config/Myservice'

export default function Setting() {
    const [flag, setflag] = useState(false)
    const [user, setuser] = useState({})
    const [count, setcount] = useState(0)
    const [state, setstate] = useState({})
    

    useEffect(()=>{
        let token = localStorage.getItem('_token');
        console.log(token)
            let decode = jwt_decode(token);
        console.log(decode)

            setstate(decode)  
            setuser(decode)  
            console.log(state)
    },[count])

    const editdetails=()=>{
        setflag(true)
    }

    const updatedetails=()=>{
        let formData = {
            id:state.id,
            name:state.name,
            email:state.email,
            contact: state.contact,
            firmname:state.firmname
          }
             updateuser(formData).then(res=>{
                 setcount(count+1)
                 console.log(res.data)
                 localStorage.setItem("_token",res.data.token);

             })
            setflag(false)
    }
    return (
        <div>
            <Navbaar/>
            <Container>
           <div className='text-center' >
            <h1 >Your details</h1>
                <label>Name:</label><h4 > {user.name}</h4> <br/>
                <label>Contact:</label><h4 > {user.contact}</h4> <br/>
                <label>Firm Name:</label><h4 > {user.firmname}</h4> <br/>
                <label>Email:</label><h4 > {user.email}</h4>
           </div>

            {flag ?
           <Row>
            
            <Col>
              <FormControl sx={{ my: 1, width: "36ch" }}>
                <TextField
                  onChange={(e)=>setstate({...state, name:e.target.value})}
                  name="name"
                  label="Full Name"
                  value={state.name}
                />
              </FormControl>
            </Col>
            <Col>
              <FormControl sx={{ my: 1, width: "36ch" }}>
                <TextField
                  onChange={(e)=>setstate({...state, contact:e.target.value})}
                  name="contact"
                  label="Contact"
                  value={state.contact}

                />
              </FormControl>
            </Col>
          
            <Col>
              <FormControl sx={{ my: 1, width: "36ch" }}>
                <TextField
                  onChange={(e)=>setstate({...state, firmname:e.target.value})}
                  name="firmname"
                  label="Enter firmname"
                  value={state.firmname}

                />
              </FormControl>
            </Col>
            <Col>
              <FormControl sx={{ my: 1, width: "36ch" }}>
                <TextField
                  onChange={(e)=>setstate({...state, email:e.target.value})}
                  name="email"
                  id="email"
                  label="Enter Email"
                  value={state.email}

                />
              </FormControl>
            </Col>
            <Col>
            <button className='btn btn-primary' onClick={()=>updatedetails()}>Update</button></Col>
          </Row>
          : <div className='text-center'><button className='btn btn-primary' onClick={()=>editdetails()}>Edit</button></div> 
           }
           </Container>
        </div>
    )
}