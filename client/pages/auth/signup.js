import axios from "axios";
import { useState } from "react";
import useRequest from "../../hooks/use-request";
import  Router  from "next/router";

const signUp=()=>{

const [email,setEmail]=useState('')
const [password,setPassword]=useState('')
const {doRequest,errors}=useRequest({
    url:'/api/users/signup',
    method:'post',
    body:{
        email,password
    },

    onSuccess:()=>Router.push('/')
});


async function submitHandler (e) {

    e.preventDefault();
   await doRequest();

 


}


return (
    <form onSubmit={submitHandler}>
       <h1>Sign up</h1> 
       <div className="form-group">
        <label>Email Address</label>
        <input className="form-control" value={email} onChange={(e)=>setEmail(e.target.value)}></input>
       </div>
       <div className="form-group">
        <label>Password</label>
        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="form-control"></input>
       </div>
{errors}
       <button className="btn btn-primary">Sign Up</button>
    </form>
)

}


export default signUp;