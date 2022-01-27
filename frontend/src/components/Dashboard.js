import React, { useState, useEffect } from 'react'
import jwt_decode from 'jwt-decode';
import Navbaar from './Navbaar';
import { Col, Row } from "react-bootstrap";
import { Card, CardContent, Button, TextField, FormControl, TableContainer, Paper, Table, TableHead, TableCell, TableRow, TableBody, Container } from '@mui/material'
import { fetchdata, deleteinvoice, updateinvoice } from '../config/Myservice'
import { useNavigate } from "react-router";

export default function Dashboard() {
    const navigate = useNavigate();
    const [state, setstate] = useState(0)
    const [status, setstatus] = useState({ invoices: [], paymentReceived: 0, pendingAmount: 0, totalAmount: 0, paidInvoice: 0, unpaidInvoice: 0, totalInvoice: 0 })
    useEffect(async () => {
        if (localStorage.getItem('_token') != undefined) {
            let token = localStorage.getItem('_token');
            let decode = jwt_decode(token);
            let data = []
            await fetchdata({ email: decode.email }).then(res => {
                data = [...res.data]
            })
            let total = 0, upaid = 0, pamount = 0, totalinvoice = 0;

            data.forEach(ele => {
                totalinvoice += 1
                if (ele.status == "UNPAID") {
                    upaid += 1
                    ele.product.forEach(item => {
                        total += item.total
                        pamount += item.total
                    })
                }
                else {
                    ele.product.forEach(item => {
                        total += item.total
                    })
                }
            })
            setstatus({ invoices: data, paymentReceived: total - pamount, pendingAmount: pamount, totalAmount: total, paidInvoice: totalinvoice - upaid, unpaidInvoice: upaid, totalInvoice: totalinvoice })
        }
    }, [state])

    const delinvoice = (ele) => {
        console.log(ele, "In delete invoice")
        deleteinvoice(ele)
        setstate(state + 1)
    }

    const upinvoice = (ele) => {
        updateinvoice(ele)
        setstate(state + 1)
    }
    console.log(status)
    return (
        <div>
            <Navbaar />
            <Container>
                <Row className='m-3'>
                    <Col>
                        <Card sx={{ backgroundColor: "#36e03e" }}>
                            <CardContent className='text-center' >
                                <h1> {status.paymentReceived}</h1>
                                Payment Received
                            </CardContent>
                        </Card>
                    </Col>
                    <Col>
                        <Card sx={{ backgroundColor: "#e73a2e" }}>
                            <CardContent className='text-center'>
                                <h1> {status.pendingAmount}</h1>
                                Pending Amount
                            </CardContent>
                        </Card>
                    </Col>
                    <Col>
                        <Card sx={{ backgroundColor: "#2ee7d2" }}>
                            <CardContent className='text-center'>
                                <h1> {status.totalAmount}</h1>
                                Total Amount
                            </CardContent>
                        </Card>
                    </Col>

                </Row>

                <Row className='m-3'>
                    <Col>
                        <Card sx={{ backgroundColor: "#36e03e" }}>
                            <CardContent className='text-center'>
                                <h1> {status.paidInvoice}</h1>
                                Paid Invoice
                            </CardContent>
                        </Card>
                    </Col>
                    <Col>
                        <Card sx={{ backgroundColor: "#e73a2e" }}>
                            <CardContent className='text-center'>
                                <h1> {status.unpaidInvoice}</h1>
                                Unpaid Invoice
                            </CardContent>
                        </Card>
                    </Col>
                    <Col>
                        <Card sx={{ backgroundColor: "#2ee7d2" }}>
                            <CardContent className='text-center'>
                                <h1> {status.totalInvoice}</h1>
                                Total Invoice
                            </CardContent>
                        </Card>
                    </Col>

                </Row>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 550 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Sr No.</TableCell>
                                <TableCell align="center">Name</TableCell>
                                <TableCell align="center">email</TableCell>
                                <TableCell align="center">due date</TableCell>
                                <TableCell align="center">Status</TableCell>
                                <TableCell align="center">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {status.invoices.map((ele, index) => (
                                <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell align="center">{index + 1}</TableCell>
                                    <TableCell align="center">{ele.rname}</TableCell>
                                    <TableCell align="center">{ele.remail}</TableCell>
                                    <TableCell align="center">{ele.rdate}</TableCell>
                                    {ele.status == "PAID" ?
                                        <TableCell align="center" sx={{ color: "green", fontSize: "20px" }}>{ele.status}</TableCell>
                                        :
                                        <TableCell align="center" sx={{ color: "red", fontSize: "20px" }}>{ele.status}</TableCell>
                                    }

                                    <TableCell align="center">
                                        <button onClick={() => navigate('/preview', { state: ele })} className='btn btn-success'>Preview</button>
                                        <button onClick={() => upinvoice(ele)} className='btn btn-info mx-2'>Update</button>
                                        <button onClick={() => delinvoice(ele)} className='btn btn-danger'>Delete</button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            </Container>

        </div>
    )
}
