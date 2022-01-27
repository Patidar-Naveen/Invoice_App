import React,{useState,useEffect} from 'react'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import jwt_decode from 'jwt-decode';
import {  Button,   TableContainer, Paper, Table, TableHead, TableCell, TableRow, TableBody, Container } from '@mui/material'
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import ReactToPdf from 'react-to-pdf';
import html2canvas from 'html2canvas';
import {jsPDF} from 'jspdf'
import {sendemail} from "../config/Myservice"

const options = {
    orientation: 'potrait',
    unit: 'in',
    format: 'A4'
};

export default function Preview() {
    const [data, setdata] = useState({})
    const { state } = useLocation();
    const [total, settotal] = useState(0)
    const ref = React.createRef();

    useEffect(()=>{
        let token = localStorage.getItem('_token');
            let decode = jwt_decode(token);
            setdata(decode)  
            let sum = 0
            state.product.forEach(ele=>{
                sum+=ele.total
            })
            settotal(sum)
    },[])

    const sendmail = () => {

        const input = document.getElementById("divToPrint");
        console.log(input);

        html2canvas(input, { useCORS: true }).then((canvas) => {
            const pdf = new jsPDF();
            const img = canvas.toDataURL(
                "https://image.shutterstock.com/image-vector/invoice-typographic-stamp-sign-badge-260nw-1027820257.jpg"
            );
            pdf.addImage(img, "JPEG", 15,40,180,160);
            const filedata = pdf.output("blob");
            let formData = new FormData();
            formData.append("file", filedata, "samplefile");
            sendemail(formData,data.email)
                console.log("hey there")
        });
    };
    return (
        <div className="container">
            <nav class="navbar">
                <div class="container">
                    <Link to="/dashboard"> <Button variant="contained">Back</Button></Link><div className=" d-flex justify-content-sm-end">
                        <ReactToPdf 
                            targetRef={ref} 
                            filename={`_invoice.pdf`} 
                            options={options} x={0} y={0} scale={0.6}>
                            {({ toPdf }) => (
                                  <Button onClick={() => { toPdf(); }} variant="contained" color="success"> Download <LocalPrintshopIcon /></Button>
                           
                            )}
                        </ReactToPdf>
                        <button onClick={sendmail} className='btn btn-info'>Send Email</button>
                    </div>
                </div>
            </nav>
            <div ref={ref} id="divToPrint">
            <nav class="navbar  navbar-light bg-light">
                <div class="container-fluid" style={{ height: "168px" }}>
                    <img src="images/logo.png" alt="" height="100px" width="180px" opacity=" 2" class="d-inline-block align-text-top" style={{ marginLeft: "15px", marginTop: "5px" }} />
                    <h3 style={{ marginRight: "20px", marginTop: "5px"  }}>INVOICE</h3>
                </div>
            </nav>
            <div className='row m-0 border'>
                <div className='col text-left ml-4'>
                    <h6>From</h6>
                    <h3>{data.firmname}</h3>
                    <h4>{data.email}</h4>
                    <h5>{data.contact}</h5>
                    <br />
                    <h6>To</h6>
                    <h3>{state.rname}</h3>
                    <h4>{state.remail}</h4>
                    <h5>{state.raddress}</h5>
                </div>
                <div className='col text-right mr-4'>
                    <h6 style={{ textAlign: "right", marginRight: "15px" }}>Status</h6>
                    {state.status=="UNPAID" ?
                    <h5 style={{ textAlign: "right", marginRight: "15px", color: "red", fontSize: "35px" }}>{state.status}</h5>
                        :
                    <h5 style={{ textAlign: "right", marginRight: "15px", color: "green", fontSize: "35px" }}>{state.status}</h5>
                    }
                    <br />
                    <h6 style={{ textAlign: "right", marginRight: "15px" }}>Due Date</h6>
                    <h5 style={{ textAlign: "right", marginRight: "15px" }}>{state.rdate}</h5>
                    <h5 style={{ textAlign: "right", marginRight: "15px" }}>Amount</h5>
                    <h3 style={{ textAlign: "right", marginRight: "15px" }}>$ {total}</h3>
                </div>

            </div>
            <br />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 550 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Sr No.</TableCell>
                            <TableCell align="center">Item</TableCell>
                            <TableCell align="center">Quantity</TableCell>
                            <TableCell align="center">Price</TableCell>
                            <TableCell align="center">Discount</TableCell>
                            <TableCell align="center">Amount</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {state.product.map((ele, index) => (
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
            </div>
        </div>
    )
}