import axios from 'axios';
import { MAIN_URL } from './Url';

export function addPost(data){
    return axios.post(`${MAIN_URL}posts/addpost`,data)
}

export function fetchdata(data){
    return axios.post(`${MAIN_URL}posts/fetchdata`,data)
}

export function addinvoice(data){
    return axios.post(`${MAIN_URL}posts/addinvoice`,data) 
}

export function validation(data){
    return axios.post(`${MAIN_URL}posts/validate`,data) 
}

export function deleteinvoice(data){
    return axios.post(`${MAIN_URL}posts/deleteinvoice`,data) 
}

export function updateinvoice(data){
    return axios.post(`${MAIN_URL}posts/updateinvoice`,data) 
}
export function updateuser(data){
    return axios.post(`${MAIN_URL}posts/updateuser`,data) 
}
export function sendemail(data,uemail){
    return axios.post(`${MAIN_URL}posts/email/${uemail}`,data,{
        headers:{
            'Content-Type':"multipart/form-data"
        }
    }) 
}