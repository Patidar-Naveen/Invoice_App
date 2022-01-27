import React,{useEffect, useRef, useState} from 'react'
import { useNavigate } from "react-router";
import { Card, CardContent, Button, TextField, FormControl } from '@mui/material'
import { Link } from 'react-router-dom'
import { validation } from '../config/Myservice';

export default function Login() {
  const [state, setstate] = useState([])
  const navigate = useNavigate(); 

  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const checkdata=(event)=>{
    event.preventDefault()
        validation({email:emailRef.current.value,password :passwordRef.current.value})
        .then(res=>{
            if(res.data.err==0){
               localStorage.setItem("_token",res.data.token);
               navigate("/dashboard")
            }
            if(res.data.err==1){
                  alert("Email or Password does not match")
            }
        })
  }
    return (
      <div  style={{backgroundImage:`url("images/log.jpg")`,height:"100vh" ,    backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',     
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover'}}>
             <h1 style={{"color":'white'}} className="text-center pt-5">Welcome Back</h1>
            <Card sx={{ width: "50ch", mx: "auto", mb: "1rem", mt:"5rem"}}>
        <CardContent>
          <h1 style={{ color: "darkblue", textAlign: "center" }}>
            Login Page
          </h1>

              <FormControl sx={{ my: 1}} fullWidth>
                <TextField
                  name="email"
                  id="email"
                  inputRef={emailRef}
                  label="Email"
                />
              </FormControl>

              <FormControl sx={{ my: 1 }} fullWidth>
                <TextField
                  name="password"
                  id="password"
                  inputRef={passwordRef}
                  type="password"
                  label="Password"
                />
              </FormControl>
            
          <div className="text-center mt-1">   
              <Button
                onClick={checkdata}
                fullWidth
                sx={{ py: "1.5vh" }}
                variant="contained">
                Login
              </Button>
            <br />

            <FormControl className="mt-2">
            <p className="mt-2 text-center">Don't have an account? <Link className="mt-5 pt-4" to="/registration">Sign Up</Link></p>
            </FormControl>
          </div>
        </CardContent>
      </Card>
        </div>
    )
}
