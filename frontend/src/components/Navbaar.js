import { Box,AppBar,Toolbar,Typography,Button } from '@mui/material';
import React from 'react'
import { Link } from 'react-router-dom'
export default function Navbaar() {
    const logout = () => {
        localStorage.removeItem('_token');
    }
    return (
        <>
            <Box sx={{ flexGrow: 1 ,marginBottom:"30px" }}>
                <AppBar position="static" sx={{color:"white"}}>
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: "bold",fontSize:"30px" }}>
                            Invoices
                        </Typography>
                        <Box sx={{ justifyContent: "center", flexGrow: 1,fontSize:"20px"  }}>
                            <Link to="/dashboard" style={{ textDecoration: "none", color: "white", fontWeight: "bold" }}>Home</Link>
                            <Link to="/addinvoice" className="mx-3" style={{ textDecoration: "none", color: "white", fontWeight: "bold" }}>Addinvoice</Link>
                            <Link to="/setting" style={{ textDecoration: "none", color: "white", fontWeight: "bold" }}>Setting</Link>
                        </Box>
                        <Link to="/" style={{ textDecoration: "none" }}><Button onClick={() => logout()} variant="contained" color="error">Logout</Button></Link>
                    </Toolbar>
                </AppBar>
            </Box>

        </>
    )
}