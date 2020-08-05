import React, {useState} from "react";
import Axios from "axios";
import ErrorNotice from "../misc/ErrorNotice";
import {Button} from 'react-bootstrap';
import {Link } from "react-router-dom";








export default function ResetPassword() {
  const [email, setEmail] = useState();
  const [error, setError] = useState();
  
 
  const submit = async (event) => {
    event.preventDefault();

    try {
      const loadUser = {email}
      const loadRes = await Axios.put("http://localhost:8080/api/forgot-password", loadUser)
      console.log(loadRes.data)
     } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
     
    }
  }
 
  
  return (
    
   <div className="page">
   
     <div>
     <h2>Forgot your password</h2>
      {error && (<ErrorNotice message={error} clearError={() => setError(undefined)} />)}
      <form className="form" onSubmit={submit}>
        <label htmlFor="login-email">Email</label>
        <input
          id="login-email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
     
     <Button className="log btn btn-primary" type="submit">Submit</Button>;
     <Link to="/login" className="btn btn-link">Cancel</Link>
       </form>
       </div>
       
   </div>
  )
}


  

  
 

