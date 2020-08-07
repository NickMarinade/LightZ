import React, {useState, useContext} from "react";
import Axios from "axios";
import ErrorNotice from "../misc/ErrorNotice";
import {Button} from 'react-bootstrap';
import { useHistory, Link } from "react-router-dom";
import UserContext from "../../context/UserContext";







export default function ResetPassword() {
  
  const [email, setEmail] = useState([]);
  const [error, setError] = useState();
  
  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const submit = async (event) => {
    event.preventDefault();

    try {
      const loadUser = {email}
       await Axios.put("http://localhost:8080/api/forgot-password", loadUser)
      .then(res => {
        setUserData({resetLink: res.data.token});
      })
      
      history.push("/message");
      
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
     
     <Button className="log btn btn-primary" type="submit">Submit</Button>
     <Link to="/login" className="btn btn-link">Cancel</Link>
       </form>
       </div>
       
   </div>
  )
}


  

  
 

